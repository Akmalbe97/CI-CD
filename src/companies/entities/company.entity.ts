import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity()
export class Company {
  @ObjectIdColumn()
  id: number

  @Column()
  companyName: string

  @Column()
  companyType: string

  @Column()
  location: string;

  @Column()
  description: string
}
