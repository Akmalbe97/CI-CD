import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>
  ) {}

  async create(createJobDto: CreateJobDto) {
    const newJob = this.jobRepository.create(createJobDto);
    return await this.jobRepository.save(newJob);
  }

  async findAll() {
    return await this.jobRepository.find();
  }

  async findOne(id: number) {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with id ${id} not found`);
    }
    return job;
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    await this.jobRepository.update(id, updateJobDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.jobRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Job with id ${id} not found`);
    }
    return { message: `Job #${id} deleted successfully` };
  }
}
