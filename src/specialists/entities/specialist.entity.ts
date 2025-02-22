import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Specialist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: string

  @Column()
  job: string

  @Column()
  skills: []
  
  @Column()
  address: string
}
