import { Injectable, NotFoundException } from '@nestjs/common';
import { CampsiteStatus } from '../enums/campsite-status.enum';
import { CreateCampsiteDto } from './dto/create-campsite.dto';
import { UpdateCampsiteDto } from './dto/update-campsite.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Campsite } from '../entities/campsite.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class CampsitesService {
  constructor(
    @InjectRepository(Campsite)
    private campsitesRepository: Repository<Campsite>,
  ) {}

  async create(
    createCampsiteDto: CreateCampsiteDto,
    user: User,
  ): Promise<Campsite> {
    const { title, description } = createCampsiteDto;

    const campsite = this.campsitesRepository.create({
      title,
      description,
      status: CampsiteStatus.PUBLIC,
      user,
    });
    await this.campsitesRepository.save(campsite);

    return campsite;
  }

  async findAll(): Promise<Campsite[]> {
    return await this.campsitesRepository.find();
  }

  async findAllByUser(user: User): Promise<Campsite[]> {
    const query = this.campsitesRepository.createQueryBuilder('campsite');
    const result = await query
      .where('campsite.userId = :userId', { userId: user.id })
      .getMany();
    return result;
  }

  async find(id: number): Promise<Campsite> {
    const found = await this.campsitesRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Can't find campsite with id ${id}`);
    }

    return found;
  }

  async update(
    id: number,
    updateCampsiteDto: UpdateCampsiteDto,
  ): Promise<Campsite> {
    const campsite = await this.find(id);
    const { title, description } = updateCampsiteDto;

    campsite.title = title;
    campsite.description = description;

    await this.campsitesRepository.save(campsite);

    return campsite;
  }

  async updateStatus(id: number, status: CampsiteStatus): Promise<Campsite> {
    const campsite = await this.find(id);

    campsite.status = status;

    await this.campsitesRepository.save(campsite);

    return campsite;
  }

  async delete(id: number): Promise<void> {
    const result = await this.campsitesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find campsite with id ${id}`);
    }
  }

  async deleteByUser(id: number, user: User): Promise<void> {
    const query = this.campsitesRepository.createQueryBuilder('campsite');
    const result = await query
      .delete()
      .where('campsite.id = :id AND campsite.userId = :userId', {
        id: id,
        userId: user.id,
      })
      .execute();
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find campsite with id ${id}`);
    }
  }
}
