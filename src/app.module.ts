import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  appConfig,
  getEventConfig,
  getMailConfig,
  getPostgresConfig,
} from './configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { EventModule } from './modules/events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getMailConfig,
    }),
    EventEmitterModule.forRoot(getEventConfig),
    UserModule,
    AuthModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
