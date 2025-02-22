import { Module } from '@nestjs/common';
import { SpecialistsService } from './specialists.service';
import { SpecialistsController } from './specialists.controller';
import { Specialist } from './entities/specialist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Specialist])],
  controllers: [SpecialistsController],
  providers: [SpecialistsService],
})
export class SpecialistsModule {}
