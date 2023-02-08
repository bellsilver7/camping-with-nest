import { IsString } from 'class-validator';

export class SearchCampsiteDto {
  @IsString()
  title?: string;
}
