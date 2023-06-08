import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Note } from 'src/modules/note/model/note.model';
import { User } from 'src/modules/user/model/user.model';

export const getPostgresConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: configService.get('config.postgres.postgresHost'),
    port: configService.get('config.postgres.postgresPort'),
    username: configService.get('config.postgres.postgresUser'),
    password: configService.get('config.postgres.postgresPassword'),
    database: configService.get('config.postgres.postgresDatabase'),
    entities: [User, Note],
    synchronize: true,
    logging: "all",
    logNotifications:true,
    logger:"advanced-console"
  };
};
