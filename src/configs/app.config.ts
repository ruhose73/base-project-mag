import { registerAs } from '@nestjs/config';

interface IAppConfig {
  nodeEnv: string;
  server: {
    port: number;
    api: string;
  };
  postgres: {
    postgresHost: string;
    postgresPort: number;
    postgresUser: string;
    postgresPassword: string;
    postgresDatabase: string;
  };
  jwt: {
    jwtSecret: string;
    jwtExpiresIn: string;
  };
}

//добавить валидатор
export default registerAs(
  'config',
  (): IAppConfig => ({
    nodeEnv: process.env.NODE_ENV || 'development',
    server: {
      port: parseInt(process.env.SERVER_PORT, 10) || 8080,
      api: process.env.API_URL,
    },
    postgres: {
      postgresHost: process.env.POSTGRES_HOST,
      postgresPort: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      postgresUser: process.env.POSTGRES_USER,
      postgresPassword: process.env.POSTGRES_PASSWORD,
      postgresDatabase: process.env.POSTGRES_DATABASE,
    },
    jwt: {
      jwtSecret: process.env.JWT_SECRET,
      jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    },
  }),
);
