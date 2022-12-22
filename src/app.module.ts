import { Module } from '@nestjs/common';
import { CampsitesModule } from './campsites/campsites.module';
import { TypeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), CampsitesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
