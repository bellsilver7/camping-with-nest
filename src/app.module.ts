import { Module } from '@nestjs/common';
import { CampsitesModule } from './campsites/campsites.module';

@Module({
  imports: [CampsitesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
