import { Injectable } from '@nestjs/common';
import { Campsite, CampsiteStatus } from './campsite.model';
import { v1 as uuid } from 'uuid';
import { CreateCampsiteDto } from './dto/create-campsite.dto';
import { UpdateCampsiteDto } from './dto/update-campsite.dto';

@Injectable()
export class CampsitesService {
  private campsites: Campsite[] = [];

  findAll(): Campsite[] {
    return this.campsites;
  }

  find(id: string) {
    return this.campsites.find((campsite) => campsite.id === id);
  }

  create(createCampsiteDto: CreateCampsiteDto) {
    const { title, description } = createCampsiteDto;
    const campsite: Campsite = {
      id: uuid(),
      title,
      description,
      status: CampsiteStatus.PUBLIC,
    };

    this.campsites.push(campsite);

    return campsite;
  }

  update(id: string, updateCampsiteDto: UpdateCampsiteDto) {
    const campsite = this.find(id);
    const { title, description } = updateCampsiteDto;

    campsite.title = title;
    campsite.description = description;

    return campsite;
  }

  updateStatus(id: string, status: CampsiteStatus): Campsite {
    const campsite = this.find(id);

    campsite.status = status;

    return campsite;
  }

  remove(id: string) {
    this.campsites = this.campsites.filter((campsite) => campsite.id !== id);
  }
}
