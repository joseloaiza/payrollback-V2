import { forwardRef, Module } from '@nestjs/common';
import { Movement } from 'src/movement/entities/movement.entity';
import { AbsenteeHistory } from '../novelties/entities/absenteeHistory.entity';
import { MovementService } from 'src/movement/movement.service';
import { AbsenteeHistoryService } from 'src/novelties/absenteeism/absentee-history.service';
import { Concept } from 'src/payroll/entities/concept.entity';
import { ConceptService } from 'src/payroll/concept/concept.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solidarity } from 'src/shared/entities/solidarity.entity';
import { SolidarityService } from 'src/shared/solidarity/solidarity.service';
import { SocialSecurityEntity } from './entities/social-security-entity.entity';
import { SocialSecurityEntityService } from './social-security-entity/social-security-entity.service';
import { SocialSecurityEntityController } from './social-security-entity/social-security-entity.controller';
import { SocialSecurityEntityTypeService } from './social-security-entity-type/social-security-entity-type.service';
import { SocialSecurityEntityTypeController } from './social-security-entity-type/social-security-entity-type.controller';
import { SocialSecurityEntityType } from './entities/social-security-entity-type.entity';
import { EmployeesModule } from 'src/employees/employees.module';
import { NoveltiesModule } from './../novelties/novelties.module';
import { PayrollModule } from 'src/payroll/payroll.module';
import { SocialSecurityEntityRepository } from './social-security-entity/social-security-entity.repository';
import { SolidarityRepository } from 'src/shared/solidarity/solidarity.repository';
import { SharedConfigModule } from 'src/shared-config/shared-config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Movement,
      AbsenteeHistory,
      Concept,
      Solidarity,
      SocialSecurityEntity,
      SocialSecurityEntityType,
    ]),
    EmployeesModule,
    SharedConfigModule,
    forwardRef(() => NoveltiesModule),
    forwardRef(() => PayrollModule),
  ],
  providers: [
    ConceptService,
    MovementService,
    AbsenteeHistoryService,
    SolidarityService,
    SocialSecurityEntityService,
    SocialSecurityEntityTypeService,
    SocialSecurityEntityRepository,
    SolidarityRepository,
  ],
  exports: [],
  controllers: [
    SocialSecurityEntityController,
    SocialSecurityEntityTypeController,
  ],
})
export class SocialSecurityModule {}
