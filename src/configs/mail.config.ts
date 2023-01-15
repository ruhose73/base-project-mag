import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';

export const getMailConfig = async (
  configService: ConfigService,
): Promise<any> => {
  return {
    transport: {
      host: configService.get('config.mail.transport.host'),
      port: configService.get('config.mail.transport.port'),
      secure: configService.get('config.mail.transport.secure'),
      auth: {
        user: configService.get('config.mail.transport.auth.user'),
        pass: configService.get('config.mail.transport.auth.pass'),
      },
    },
    defaults: {
      from: configService.get('config.mail.defaults.from'),
    },
    template: {
      dir: __dirname + '/templates',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  };
};
