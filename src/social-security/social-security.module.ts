import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialSecurityEntity } from './entities/social-security-entity.entity';
import { SocialSecurityEntityType } from './entities/social-security-entity-type.entity';
import { SocialSecurityEntityService } from './social-security-entity/social-security-entity.service';
import { SocialSecurityService } from './social-security.service';
import { SocialSecurityEntityTypeService } from './social-security-entity-type/social-security-entity-type.service';
import { SocialSecurityEntityController } from './social-security-entity/social-security-entity.controller';
import { SocialSecurityEntityTypeController } from './social-security-entity-type/social-security-entity-type.controller';
import { SocialSecurityEntityRepository } from './social-security-entity/social-security-entity.repository';
import { SolidarityRepository } from 'src/shared/solidarity/solidarity.repository';
import { Solidarity } from 'src/shared/entities/solidarity.entity';
import { EmployeesModule } from 'src/employees/employees.module';
import { NoveltiesModule } from './../novelties/novelties.module';
import { MovementModule } from 'src/movement/movement.module';
import { ConceptsModule } from 'src/concepts/concepts.module';
import { CodesConfigModule } from 'src/config/codes-config.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SocialSecurityEntity,
      SocialSecurityEntityType,
      Solidarity,
    ]),
    EmployeesModule,
    CodesConfigModule,
    MovementModule,
    ConceptsModule,
    NoveltiesModule,
    SharedModule,
  ],
  providers: [
    SocialSecurityEntityService,
    SocialSecurityEntityTypeService,
    SocialSecurityEntityRepository,
    SolidarityRepository,
    SocialSecurityService,
  ],
  exports: [SocialSecurityService],
  controllers: [
    SocialSecurityEntityController,
    SocialSecurityEntityTypeController,
  ],
})
export class SocialSecurityModule {}
