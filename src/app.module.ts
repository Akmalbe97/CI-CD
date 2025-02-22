import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { databaseConfig } from './config/database.config';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { SpecialistsModule } from './specialists/specialists.module';
import { JobsModule } from './jobs/jobs.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({envFilePath: ".env", isGlobal: true}),
    CompaniesModule,
    UserModule,
    SpecialistsModule,
    JobsModule,
    OrdersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
