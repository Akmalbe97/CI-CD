import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateSpecialistDto } from './dto/create-specialist.dto';
import { UpdateSpecialistDto } from './dto/update-specialist.dto';
import { Specialist } from './entities/specialist.entity';

@Injectable()
export class SpecialistsService {
  constructor(
    @InjectRepository(Specialist)
    private specialistRepository: Repository<Specialist>
  ) {}

  async create(createSpecialistDto: CreateSpecialistDto) {
    const newSpecialist = this.specialistRepository.create(createSpecialistDto);
    return await this.specialistRepository.save(newSpecialist);
  }

  async findAll() {
    return await this.specialistRepository.find();
  }

  async findOne(id: number) {
    const specialist = await this.specialistRepository.findOne({ where: { id } });
    if (!specialist) {
      throw new NotFoundException(`Specialist with id ${id} not found`);
    }
    return specialist;
  }

  async update(id: number, updateSpecialistDto: UpdateSpecialistDto) {
    await this.specialistRepository.update(id, updateSpecialistDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.specialistRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Specialist with id ${id} not found`);
    }
    return { message: `Specialist #${id} deleted successfully` };
  }

  async search(query: string) {
    return await this.specialistRepository.find({
      where: [
        { name: ILike(`%${query}%`) },
        { job: ILike(`%${query}%`) }
      ]
    });
  }
  
}
