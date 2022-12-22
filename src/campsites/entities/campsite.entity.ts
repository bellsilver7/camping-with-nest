import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CampsiteStatus } from '../enums/campsite-status.enum';

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
}
