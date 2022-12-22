import { Module } from '@nestjs/common';
import { CampsitesController } from './campsites.controller';
import { CampsitesService } from './campsites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campsite } from './entities/campsite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campsite])],
  controllers: [CampsitesController],
  providers: [CampsitesService],
})
export class CampsitesModule {}
