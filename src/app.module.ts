import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { CampsitesModule } from './campsites/campsites.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), CampsitesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
