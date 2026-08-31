import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
//import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          // For relay SMTP server set the host to smtp-relay.gmail.com
          // and for Gmail STMO server set it to smtp.gmail.com
          host: configService.getOrThrow('MAIL_HOST'),
          // For SSL and TLS connection
          secure: true,
          port: Number(configService.getOrThrow('MAIL_PORT')),
          auth: {
            // Account gmail address
            user: configService.getOrThrow('MAIL_USER'),
            pass: configService.getOrThrow('MAIL_PASS'),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
})
export class MailModule {}
