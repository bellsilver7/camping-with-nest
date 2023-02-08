import { Injectable, NotFoundException } from '@nestjs/common';
import { CampsiteStatus } from '../enums/campsite-status.enum';
import { CreateCampsiteDto } from './dto/create-campsite.dto';
import { UpdateCampsiteDto } from './dto/update-campsite.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Campsite } from '../entities/campsite.entity';
import { User } from '../entities/user.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import * as xml2json from 'xml2json';
import { GoCampingBasedList } from './go-camping.interface';
import { SearchCampsiteDto } from './dto/search-campsite.dto';

@Injectable()
export class CampsitesService {
  constructor(
    @InjectRepository(Campsite)
    private readonly campsitesRepository: Repository<Campsite>,
    private readonly httpService: HttpService,
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

  async search(request: SearchCampsiteDto): Promise<Campsite[]> {
    const found = await this.campsitesRepository.findBy({
      title: Like(`%${request.title}%`),
    });

    if (!found) {
      throw new NotFoundException(`Can't find campsite with id ${request}`);
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

  async sync() {
    const existCampsites = await this.campsitesRepository.find({
      select: ['goCampingContentId'],
    });

    const goCampingContentIds = [];
    existCampsites.map((campsite) => {
      if (campsite.goCampingContentId === null) return;
      if (goCampingContentIds.includes(campsite.goCampingContentId)) return;
      goCampingContentIds.push(campsite.goCampingContentId);
    });

    const params = {
      MobileOS: 'ETC',
      MobileApp: '캠핑 with Nest',
      serviceKey: process.env.GOCAMPING_SERVICE_KEY,
      numOfRows: 10000,
    };

    const goCampingUrl = process.env.GOCAMPING_SERVICE_URL;

    const { data } = await firstValueFrom(
      this.httpService.get(`${goCampingUrl}/basedList`, { params }).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );

    const result = xml2json.toJson<GoCampingBasedList>(data, {
      object: true,
    });
    const campsites = result.response.body.items;

    try {
      campsites.map(async (item) => {
        const goCampingContentId = +item.contentId;
        let campsite = this.campsitesRepository.create();
        if (goCampingContentIds.includes(goCampingContentId)) {
          campsite = await this.campsitesRepository.findOneBy({
            goCampingContentId,
          });
        }

        campsite.goCampingContentId = goCampingContentId;
        campsite.title = item.facltNm;
        campsite.description = item.lineIntro.length ? item.lineIntro : null;
        campsite.status = CampsiteStatus.PUBLIC;

        this.campsitesRepository.save(campsite);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
