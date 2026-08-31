import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetToken } from '../auth/entities/ResetToken.entity';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { AuditLog } from './entities/audit-log.entity';
import { RolesService } from './services/roles.service';
import { AuditLogService } from './services/audit-log.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule,
    MailModule,
    TypeOrmModule.forFeature([ResetToken, Role, Permission, AuditLog]),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    MailService,
    RolesService,
    AuditLogService,
  ],
  controllers: [AuthController],
  exports: [AuthService, RolesService, AuditLogService, TypeOrmModule],
})
export class AuthModule {}
