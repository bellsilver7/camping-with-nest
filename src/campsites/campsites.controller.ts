import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CampsitesService } from './campsites.service';
import { CampsiteStatus } from '../enums/campsite-status.enum';
import { CreateCampsiteDto } from './dto/create-campsite.dto';
import { UpdateCampsiteDto } from './dto/update-campsite.dto';
import { CampsiteStatusValidationPipe } from './pipes/campsite-status-validation.pipe';
import { Campsite } from '../entities/campsite.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../entities/user.entity';

@Controller('campsites')
@UseGuards(AuthGuard())
export class CampsitesController {
  constructor(private campsitesService: CampsitesService) {}

  @Post()
  create(
    @Body() createCampsiteDto: CreateCampsiteDto,
    @GetUser() user: User,
  ): Promise<Campsite> {
    return this.campsitesService.create(createCampsiteDto, user);
  }

  @Get()
  findAll(@Body('me') me: boolean, @GetUser() user: User): Promise<Campsite[]> {
    if (me) {
      return this.campsitesService.findAllByUser(user);
    }
    return this.campsitesService.findAll();
  }

  @Get('/me')
  findAllByUser(): Promise<Campsite[]> {
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

  @Delete('/:id')
  deleteByUser(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.campsitesService.deleteByUser(id, user);
  }
}
