import { IsNotEmpty } from 'class-validator';

export class CreateCampsiteDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
