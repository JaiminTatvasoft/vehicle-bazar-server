import { PartialType } from '@nestjs/mapped-types';
import { CreateComparisiontableDto } from './create-comparisiontable.dto';

export class UpdateComparisiontableDto extends PartialType(CreateComparisiontableDto) {
  
}
