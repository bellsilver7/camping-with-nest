import { Module } from '@nestjs/common';
import { CampsitesController } from './campsites.controller';
import { CampsitesService } from './campsites.service';

@Module({
  controllers: [CampsitesController],
  providers: [CampsitesService],
})
export class CampsitesModule {}
