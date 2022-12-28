import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CampsiteStatus } from '../enums/campsite-status.enum';
import { User } from './user.entity';

@Entity()
export class Campsite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: CampsiteStatus;

  @ManyToOne((type) => User, (user) => user.campsites, { eager: false })
  user: User;
}
