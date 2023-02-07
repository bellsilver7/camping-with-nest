import { Module } from '@nestjs/common';
import { CampsitesController } from './campsites.controller';
import { CampsitesService } from './campsites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campsite } from '../entities/campsite.entity';
import { AuthModule } from '../auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Campsite]), AuthModule, HttpModule],
  controllers: [CampsitesController],
  providers: [CampsitesService],
})
export class CampsitesModule {}
