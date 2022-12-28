import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { CampsiteStatus } from '../../enums/campsite-status.enum';

export class CampsiteStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [CampsiteStatus.PUBLIC, CampsiteStatus.PRIVATE];

  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't int the status options`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
