import { Module } from '@nestjs/common';
import { CompanyService } from './company/company.service';
import { CompanyController } from './company/company.controller';
import { CompanyPaymentController } from './company-payment/companyPayment.controller';
import { CompanyPaymentService } from './company-payment/companyPayment.service';
import { CompanyPayrollService } from './company-payroll/companyPayroll.service';
import { CompanyPayrollController } from './company-payroll/companyPayroll.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanyPayment } from './entities/companyPayment.entity';
import { CompanyPayroll } from './entities/companyPayroll.entity';
import { PositionService } from './position/position.service';
import { PositionController } from './position/position.controller';
import { Position } from './entities/position.entity';
import { SubsidiaryService } from './subsidiary/subsidiary.service';
import { SubsidiaryController } from './subsidiary/subsidiary.controller';
import { Subsidiary } from './entities/subsidiary.entity';
import { CompanyRepository } from './company/company.repository';
import { CompanyPaymentRepository } from './company-payment/comanyPayment.respository';
import { CompanyPayrollRepository } from './company-payroll/company-payroll.repository';
import { PositionRepository } from './position/position.repository';
import { SubsidiaryRepository } from './subsidiary/subsidiary.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      CompanyPayment,
      CompanyPayroll,
      Position,
      Subsidiary,
    ]),
  ],
  providers: [
    CompanyService,
    CompanyPaymentService,
    CompanyPayrollService,
    PositionService,
    SubsidiaryService,
    CompanyRepository,
    CompanyPaymentRepository,
    CompanyPayrollRepository,
    PositionRepository,
    SubsidiaryRepository,
  ],
  exports: [CompanyRepository, CompanyPayrollRepository],
  controllers: [
    CompanyController,
    CompanyPaymentController,
    CompanyPayrollController,
    PositionController,
    SubsidiaryController,
  ],
})
export class CompaniesModule {}
