import { Module } from '@nestjs/common';
import { CompanyPayrollService } from './company-payroll/company-payroll.service';
import { CompanyPayrollRepository } from './company-payroll/company-payroll.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyPayroll } from 'src/companies/entities/company-payroll.entity';
import { CompanyService } from './company.service';
import { CompanyPaymentService } from './company-payment/company-payment.service';
import { CompanyRepository } from './company.repository';
import { CompanyPaymentRepository } from './company-payment/comanyPayment.respository';
import { CompanyPayment } from 'src/companies/entities/companyPayment.entity';
import { Company } from 'src/companies/entities/company.entity';
import { PaymentFrequency } from 'src/shared/entities/paymentFrequency.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyPayroll,
      Company,
      CompanyPayment,
      PaymentFrequency,
    ]),
  ],
  providers: [
    CompanyPayrollService,
    CompanyPayrollRepository,
    CompanyService,
    CompanyPaymentService,
    CompanyRepository,
    CompanyPaymentRepository,
  ],
  exports: [
    CompanyPayrollService,
    CompanyPaymentService,
    CompanyPaymentRepository,
    CompanyPayrollRepository,
  ],
})
export class CompanyModule {}
