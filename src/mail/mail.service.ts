import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendPasswordResetEmail(to: string, token: string): Promise<boolean> {
    const resetLink = `http://yourapp.com/reset-password?token=${token}`;
    const mailOptions = {
      from: 'Animo rh app',
      to: to,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`,
    };
    try {
      await this.mailerService.sendMail(mailOptions);
      return true;
    } catch (error) {
      return false;
    }
  }
  async sendMail() {
    try {
      await this.mailerService.sendMail({
        to: 'opensource@is.best',
        from: '"Welcome to the fold" <linux@over.windows>', // sender address
        subject: 'Quotes', // Subject line
        text: '', // plaintext body
        html: `<p>How many programmers does it take to change a light bulb? 
                   None, that’s a hardware problem.</p>`,
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }
}
