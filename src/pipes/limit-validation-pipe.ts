import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  ParseIntPipe,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class LimitValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const limit = await new ParseIntPipe().transform(value?.limit, metadata);
    if (limit > 2) {
      throw new BadRequestException('Limit cannot exceed 2');
    }
    return { ...value, limit };
  }
}
