import { Module } from '@nestjs/common';
import { EmployeeService } from './employee/employee.service';
import { EmployeeContractService } from './employee-contract/employee-contract.service';
import { EmployeeJobService } from './employee-job/employee-job.service';
import { EmployeeSalaryService } from './employee-salary/employee-salary.service';
import { EmployeeSocialSecurityService } from './employee-social-security/employee-social-security.service';
import { EmployeeTypeService } from './employee-type/employee-type.service';
import { EmployeeWorkingService } from './employee-working/employee-working.service';
import { EmployeeController } from './employee/employee.controller';
import { AreaService } from './area/area.service';
import { AreaController } from './area/area.controller';
import { Employee } from './entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeContractController } from './employee-contract/employee-contract.controller';
import { EmployeeJobController } from './employee-job/employee-job.controller';
import { EmployeeSalaryController } from './employee-salary/employee-salary.controller';
import { EmployeeSocialSecurityController } from './employee-social-security/employee-social-security.controller';
import { EmployeeTypeController } from './employee-type/employee-type.controller';
import { EmployeeWorkingController } from './employee-working/employee-working.controller';
import { EmployeeContract } from './entities/employee-contract.entity';
import { EmployeeJob } from './entities/employee-job.entity';
import { EmployeeSalary } from './entities/employee-salary.entity';
import { EmployeeSocialSecurity } from './entities/employee-social-security.entity';
import { EmployeeType } from './entities/employee-type.entity';
import { EmployeeWorking } from './entities/employee-working.entity';
import { Area } from './entities/area.entity';
import { GenderService } from './gender/gender.service';
import { GenderController } from './gender/gender.controller';
import { Gender } from './entities/gender.entity';
import { IdentificationTypeService } from './identification-type/identification-type.service';
import { IdentificationTypeController } from './identification-type/identification-type.controller';
import { IdentificationType } from './entities/identificationType.entity';
import { ContractType } from './entities/contractType.entity';
import { EmployeePaymentService } from './employee-payment/employee-payment.service';
import { EmployeePaymentController } from './employee-payment/employee-payment.controller';
import { EmployeePayment } from './entities/employee-payment.entity';
import { ContractTypeService } from './contract-type/contract-type.service';
import { ContractTypeController } from './contract-type/contract-type.controller';
import { AreaRepository } from './area/area.repository';
import { ContractTypeRepository } from './contract-type/contract-type.repository';
import { EmployeeRepository } from './employee/employee.repository';
import { EmployeeContractRepository } from './employee-contract/employee-contract.repository';
import { EmployeeJobRepository } from './employee-job/employee-job.repository';
import { EmployeePaymentRepository } from './employee-payment/employee-payment.repository';
import { EmployeeSalaryRepository } from './employee-salary/employee-salary.repository';
import { EmployeeSocialSecurityRepository } from './employee-social-security/employee-social-security.repository';
import { EmployeeTypeRepository } from './employee-type/employee-type.repository';
import { EmployeeWorkingRepository } from './employee-working/employee-working.repository';
import { GenderRepository } from './gender/gender.repository';
import { IdetificationTypeRepository } from './identification-type/identification-type.repository';
import { EmployeeFullView } from './entities/employee.view';
import { ContractClassification } from './entities/contractClassification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      EmployeeFullView,
      Area,
      Gender,
      IdentificationType,
      ContractType,
      EmployeeContract,
      EmployeeJob,
      EmployeeSalary,
      EmployeePayment,
      EmployeeSocialSecurity,
      EmployeeType,
      EmployeeWorking,
      ContractClassification,
    ]),
  ],
  providers: [
    EmployeeService,
    EmployeeContractService,
    EmployeeJobService,
    EmployeeSalaryService,
    EmployeeSocialSecurityService,
    EmployeeTypeService,
    EmployeeWorkingService,
    AreaService,
    GenderService,
    IdentificationTypeService,
    EmployeePaymentService,
    ContractTypeService,
    AreaRepository,
    ContractTypeRepository,
    EmployeeRepository,
    EmployeeContractRepository,
    EmployeeJobRepository,
    EmployeePaymentRepository,
    EmployeeSalaryRepository,
    EmployeeSocialSecurityRepository,
    EmployeeTypeRepository,
    EmployeeWorkingRepository,
    GenderRepository,
    IdetificationTypeRepository,
  ],
  exports: [EmployeeService, EmployeeSalaryService, EmployeePaymentService],
  controllers: [
    EmployeeController,
    AreaController,
    EmployeeContractController,
    EmployeeJobController,
    EmployeeSalaryController,
    EmployeeSocialSecurityController,
    EmployeeTypeController,
    EmployeeWorkingController,
    GenderController,
    IdentificationTypeController,
    EmployeePaymentController,
    ContractTypeController,
  ],
})
export class EmployeesModule {}
