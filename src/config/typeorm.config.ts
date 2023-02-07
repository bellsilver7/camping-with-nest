import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: +configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_USERNAME'),
    database: configService.get('DB_DATABASE'),
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  inject: [ConfigService],
};
