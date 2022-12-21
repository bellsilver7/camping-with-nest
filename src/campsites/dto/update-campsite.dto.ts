import { PartialType } from '@nestjs/mapped-types';
import { CreateCampsiteDto } from './create-campsite.dto';

export class UpdateCampsiteDto extends PartialType(CreateCampsiteDto) {}
