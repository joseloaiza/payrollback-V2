import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { nanoid } from 'nanoid';
import { UsersService } from 'src/users/users.service';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { Response } from 'express';
import { TokenPayload } from './token-payload.interface';
import { CreateUserDto } from '../users/dtos/createUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResetToken } from './entities/ResetToken.entity';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    @InjectRepository(ResetToken)
    private resetTokenRepository: Repository<ResetToken>,
  ) {}
  async verifyUser(userName: string, password: string) {
    try {
      const user = await this.userService.getUser(userName);
      const authenticated = await compare(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
  }

  async login(user: User, response: Response, redirect = false) {
    const expiresAccessToken = new Date();
    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_MS',
          ),
        ),
    );

    const expiresRefreshToken = new Date();
    expiresRefreshToken.setMilliseconds(
      expiresRefreshToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION_MS',
          ),
        ),
    );
    const tokenPayload: TokenPayload = {
      userId: user.id.toString(),
    };
    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.getOrThrow(
        'JWT_ACCESS_TOKEN_EXPIRATION_MS',
      )}ms`,
    });
    const refreshToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.getOrThrow(
        'JWT_REFRESH_TOKEN_EXPIRATION_MS',
      )}ms`,
    });

    await this.userService.update(user.id, {
      refreshToken: await hash(refreshToken, 10),
    });

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure:
        this.configService.get('NODE_ENV') === 'production' ||
        this.configService.get('FORCE_SECURE') === 'true',
      sameSite:
        this.configService.get('NODE_ENV') === 'production' ? 'none' : 'lax',

      expires: expiresAccessToken,
    });
    response.cookie('Refresh', refreshToken, {
      httpOnly: true,
      secure:
        this.configService.get('NODE_ENV') === 'production' ||
        this.configService.get('FORCE_SECURE') === 'true',
      sameSite:
        this.configService.get('NODE_ENV') === 'production' ? 'none' : 'lax',

      expires: expiresRefreshToken,
    });

    if (redirect) {
      response.redirect(this.configService.getOrThrow('AUTH_UI_REDIRECT'));
    }

    const userAuth = await this.userService.findOne(user.id);
    //return { id: userAuth.id, userName: userAuth.userName, response };
    response.status(201).send({ id: userAuth.id, userName: userAuth.userName });
  }

  async register(user: CreateUserDto): Promise<User> {
    const { password, ...userData } = user;

    const userNameInUse = await this.userService.getUser(user.userName);
    if (userNameInUse) {
      throw new BadRequestException('User already in use');
    }
    const hashedPassword = await hash(password, 10);
    return await this.userService.create({
      password: hashedPassword,
      ...userData,
    });
  }

  async veryifyUserRefreshToken(refreshToken: string, userId: string) {
    try {
      const user = await this.userService.findOne(userId);
      const authenticated = await compare(refreshToken, user.refreshToken);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new UnauthorizedException('Refresh token is not valid.');
    }
  }

  async changePassword(userId, oldPassword: string, newPassword: string) {
    //Find the user
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found...');
    }

    //Compare the old password with the password in DB
    const passwordMatch = await compare(oldPassword, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    //Change user's password
    const newHashedPassword = await hash(newPassword, 10);

    //save the user
    await this.userService.update(userId, { password: newHashedPassword });
  }

  async forgotPassword(userName: string) {
    //Check that user exists
    const user = await this.userService.getUser(userName);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    //If user exists, generate password reset link
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);
    // generator is a function that returns a random string
    // of length 10, with alphabets from the characters in `alphabet` constant

    const resetToken = nanoid(64);
    await this.resetTokenRepository.save({
      token: resetToken,
      userId: user.id,
      expiryDate,
    });

    //Send the link to the user by email
    return await this.mailService.sendPasswordResetEmail(userName, resetToken);
    //return { message: 'If this user exists, they will receive an email' };
  }

  async resetPassword(newPassword: string, resetToken: string) {
    //Find a valid reset token document
    const token = await this.resetTokenRepository.findOne({
      where: [
        {
          token: resetToken,
        },
        {
          expiryDate: MoreThan(new Date()),
        },
      ],
    });

    if (!token) {
      throw new UnauthorizedException('Invalid link');
    }

    //Change user password (MAKE SURE TO HASH!!)
    const user = await this.userService.findOne(token.userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newPasswordEncrypted: string = await hash(newPassword, 10);
    await this.userService.update(token.userId, {
      password: newPasswordEncrypted,
    });
  }
}
