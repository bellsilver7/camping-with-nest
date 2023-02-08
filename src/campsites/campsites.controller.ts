import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
import { SearchCampsiteDto } from './dto/search-campsite.dto';

@Controller('campsites')
@UseGuards(AuthGuard())
export class CampsitesController {
  private logger = new Logger('CampsiteController');
  constructor(private readonly campsitesService: CampsitesService) {}

  @Post()
  create(
    @Body() createCampsiteDto: CreateCampsiteDto,
    @GetUser() user: User,
  ): Promise<Campsite> {
    this.logger.verbose(
      `Campsite ${
        user.username
      } creating a new campsite. Payload: ${JSON.stringify(createCampsiteDto)}`,
    );
    return this.campsitesService.create(createCampsiteDto, user);
  }

  @Get()
  findAll(@Body('me') me: boolean, @GetUser() user: User): Promise<Campsite[]> {
    this.logger.verbose(
      `Campsite ${user.username} trying to get all campsites`,
    );
    if (me) {
      return this.campsitesService.findAllByUser(user);
    }
    return this.campsitesService.findAll();
  }

  @Get('/search')
  search(@Body() request: SearchCampsiteDto): Promise<Campsite[]> {
    this.logger.verbose(`Campsite trying to search campsites`);
    return this.campsitesService.search(request);
  }

  @Get('/me')
  findAllByUser(): Promise<Campsite[]> {
    return this.campsitesService.findAll();
  }

  @Get('/sync')
  sync() {
    return this.campsitesService.sync();
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
