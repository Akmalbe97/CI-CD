import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecialistDto } from './create-specialist.dto';

export class UpdateSpecialistDto extends PartialType(CreateSpecialistDto) {
  name?: string;
  age?: string;
  job?: string;
  skills?: [];
  address?: string;
}
