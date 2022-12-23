import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CampsitesService } from './campsites.service';
import { CampsiteStatus } from './enums/campsite-status.enum';
import { CreateCampsiteDto } from './dto/create-campsite.dto';
import { UpdateCampsiteDto } from './dto/update-campsite.dto';
import { CampsiteStatusValidationPipe } from './pipes/campsite-status-validation.pipe';
import { Campsite } from './entities/campsite.entity';

@Controller('campsites')
export class CampsitesController {
  constructor(private campsitesService: CampsitesService) {}

  @Post()
  create(@Body() createCampsiteDto: CreateCampsiteDto): Promise<Campsite> {
    return this.campsitesService.create(createCampsiteDto);
  }

  @Get()
  findAll(): Promise<Campsite[]> {
    return this.campsitesService.findAll();
  }

  @Get('/:id')
  find(@Param('id') id: number): Promise<Campsite> {
    return this.campsitesService.find(id);
  }

  @Patch('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCampsiteDto: UpdateCampsiteDto,
  ): Promise<Campsite> {
    return this.campsitesService.update(id, updateCampsiteDto);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', CampsiteStatusValidationPipe) status: CampsiteStatus,
  ): Promise<Campsite> {
    return this.campsitesService.updateStatus(id, status);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.campsitesService.delete(id);
  }
}
