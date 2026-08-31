import { IsString, Matches, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  @Length(8, 20)
  @Matches(/^(?=.*[0-9])/, {
    message: 'Password must contain at least one number',
  })
  newPassword: string;
}
