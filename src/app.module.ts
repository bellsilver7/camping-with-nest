import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CampsitesModule } from './campsites/campsites.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(TypeOrmConfig),
    CampsitesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
