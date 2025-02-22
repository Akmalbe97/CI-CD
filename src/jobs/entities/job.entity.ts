import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profession: string;

  @Column()
  work_style: string;

  @Column()
  salary: number

  @Column()
    employment_type: string;

  @Column()
  description: string;

  @Column()
  tasks: string;

  @Column()
  schedule: string
}
