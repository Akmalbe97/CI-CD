import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";


export const databaseConfig: TypeOrmModuleOptions = {
  type: "mongodb",
  url: "mongodb+srv://Akmal:Akmal7132727@cluster0.rss09.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  entities: [User],
  synchronize: true,
} 