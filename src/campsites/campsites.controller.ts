import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CampsitesService } from './campsites.service';
import { Campsite, CampsiteStatus } from './campsite.model';
import { CreateCampsiteDto } from './dto/create-campsite.dto';
import { UpdateCampsiteDto } from './dto/update-campsite.dto';

@Controller('campsites')
export class CampsitesController {
  constructor(private campsitesService: CampsitesService) {}

  @Get()
  findAll(): Campsite[] {
    return this.campsitesService.findAll();
  }

  @Get('/:id')
  find(@Param('id') id: string): Campsite {
    return this.campsitesService.find(id);
  }

  @Post()
  create(@Body() createCampsiteDto: CreateCampsiteDto): Campsite {
    return this.campsitesService.create(createCampsiteDto);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateCampsiteDto: UpdateCampsiteDto,
  ): Campsite {
    return this.campsitesService.update(id, updateCampsiteDto);
  }

  @Patch('/:id/:status')
  updateStatus(
    @Param('id') id: string,
    @Param('status') status: CampsiteStatus,
  ): Campsite {
    return this.campsitesService.updateStatus(id, status);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): void {
    this.campsitesService.remove(id);
  }
}
