import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';

export class UpdateJobDto extends PartialType(CreateJobDto) {
  profession?: string;
  work_style?: string;
  salary?: number;
  employment_type?: string;
  description?: string;
  tasks?: string;
  schedule?: string;
}
