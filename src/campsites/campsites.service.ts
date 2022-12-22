import { Injectable, NotFoundException } from '@nestjs/common';
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

  find(id: string): Campsite {
    const found = this.campsites.find((campsite) => campsite.id === id);

    if (!found) {
      throw new NotFoundException(`Can't find campsite with id ${id}`);
    }

    return found;
  }

  create(createCampsiteDto: CreateCampsiteDto): Campsite {
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

  update(id: string, updateCampsiteDto: UpdateCampsiteDto): Campsite {
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

  remove(id: string): void {
    const found = this.find(id);
    this.campsites = this.campsites.filter(
      (campsite) => campsite.id !== found.id,
    );
  }
}
