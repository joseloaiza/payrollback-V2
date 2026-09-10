import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersCompany } from './entities/usersCompany.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Concept } from 'src/concepts/concept.entity';
import { CompanyPayment } from 'src/companies/entities/companyPayment.entity';
import { CompanyPayroll } from 'src/companies/entities/companyPayroll.entity';
import { ConceptService } from 'src/concepts/concepts.service';
import { ConceptRepository } from 'src/concepts/concept.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UsersCompany,
      Company,
      Concept,
      CompanyPayment,
      CompanyPayroll,
    ]),
  ],
  providers: [UsersService, ConceptService, ConceptRepository],
  controllers: [UsersController],
  exports: [UsersService, ConceptService],
})
export class UsersModule {}
