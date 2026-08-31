import {
  IsString,
  IsUUID,
  IsOptional,
  IsBoolean,
  IsDate,
  IsEmail,
} from 'class-validator';

import { BaseDto } from './../../utils/dto/Base.dto';
import { PaginationDto } from './../..//utils/dto/Pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsUUID()
  company_id: string;

  @ApiProperty()
  @IsUUID()
  identificationType_id: string;

  @ApiProperty()
  @IsString()
  identification: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  secondName: string;

  @ApiProperty()
  @IsString()
  surname: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  secondSurName: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  gender_id: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  city_id: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  state_id: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  country_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cellPhone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  img: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  createdUser?: string;
}

export class UpdateEmployeeDto {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  company_id: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  identificationType_id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  identification: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  secondName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  surname: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  secondSurName: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  gender_id: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  city_id: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  state_id: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  country_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cellPhone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  img: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  updateUser?: string;
}

export class ResponseEmployeeDto extends BaseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  company_id: string;

  // @ApiProperty()
  // @IsUUID()
  // identificationType_id: string;

  @ApiProperty()
  @IsString()
  identification: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  secondName: string;

  @ApiProperty()
  @IsString()
  surname: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  secondSurName: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  gender_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  city_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  state_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  country_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cellPhone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  img: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  company: { id: string; name: string };
  @ApiProperty()
  identificationType: { id: string; code: string; description: string };
  @ApiProperty()
  gender?: { id: string; name: string; description: string; isActive: boolean };
  @ApiProperty()
  city?: { id: string; name: string };
  @ApiProperty()
  state?: { id: string; name: string };
  @ApiProperty()
  country?: { id: string; name: string };
  @ApiProperty()
  job?: {
    id: string;
    costCenter_id: string;
    area_id: string;
    subsidiary_id: string;
    position_id: string;
    isActive: boolean;
    costCenter: {
      id: string;
      code: string;
      description: string;
      isActive: boolean;
    };
    area: {
      id: string;
      description: string;
      isActive: boolean;
    };
    position: {
      id: string;
      description: string;
      isActive: boolean;
    };
    subsidiary: {
      id: string;
      description: string;
      isActive: boolean;
    };
  };

  @ApiProperty()
  payment?: {
    accountNumber: string;
    bank_id: string;
    accountType_id: string;
    isActive: boolean;
    bank: {
      id: string;
      code: string;
      name: string;
      isActive: boolean;
    };
    accounType: {
      id: string;
      code: string;
      description: string;
      isActive: boolean;
    };
  };

  @ApiProperty()
  socialSecurity?: {
    contributorType_id: string;
    contributorSubType_id: string;
    entityHealth_id: string;
    entityPension_id: string;
    entitySeverance_id: string;
    isActive: boolean;
    contributorType: {
      id: string;
      code: string;
      description: string;
    };
    contributorSubType: {
      id: string;
      code: string;
      description: string;
    };
    healthEntity: {
      id: string;
      code: string;
      name: string;
    };
    pensionEntity: {
      id: string;
      code: string;
      name: string;
    };
    severanceEntity: {
      id: string;
      code: string;
      name: string;
    };
  };

  @ApiProperty()
  working?: {
    employeeType_id: string;
    contractRegime_id: string;
    companyEconomicActivityRisk_id: string;
    workingHour_id: string;
    transportAssistance: boolean;
    variableSalary: boolean;
    isActive: boolean;
    contractRegime: {
      id: string;
      code: string;
      description: string;
      isActive: boolean;
    };
    employeeType: {
      id: string;
      code: string;
      description: string;
      isActive: boolean;
    };
    companyEconomicActivityRisk?: {
      id: string;
      company_id: string;
      economicactivity_id: string;
      workplacerisk_id: string;
      workPlaceRisks?: {
        id: string;
        code: string;
        description: string;
        percentage: number;
        isActive: boolean;
      };
      economicActivity?: {
        id: string;
        code: string;
        description: string;
      };
    };
  };
  @ApiProperty()
  salaryType?: {
    id: string;
    code: string;
    description: string;
    isActive: boolean;
  };
  @ApiProperty()
  contractRegime?: {
    id: string;
    code: string;
    description: string;
    isActive: boolean;
  };
  @ApiProperty()
  contributorType?: {
    id: string;
    code: string;
    description: string;
  };
  @ApiProperty()
  workPlaceRisk?: {
    id: string;
    code: string;
    description: string;
    percentage: number;
    isActive: boolean;
    companyEconomicActivityRisk: {
      id: string;
      company_id: string;
      economicactivity_id: string;
      economicActivity: {
        id: string;
        code: string;
        description: string;
      };
    };
  };
  @ApiProperty()
  employeeType?: {
    id: string;
    code: string;
    description: string;
    isActive: boolean;
  };

  @ApiProperty()
  contracts?: {
    employee_id: string;
    contractType_id: string;
    initialContractDate: Date;
    endContractDate: Date;
    isActive: boolean;
    contractType: {
      id: string;
      code: string;
      description: string;
      isActive: boolean;
    };
  }[];

  @ApiProperty()
  salaries?: {
    employee_id: string;
    salaryType_id: string;
    salary: number;
    initialSalaryDate: Date;
    endSalaryDate: Date;
    isActive: boolean;
    salaryType: {
      id: string;
      code: string;
      description: string;
      isActive: boolean;
    };
  }[];
}

export class FilterEmployeeDto extends PaginationDto {
  @IsOptional()
  @IsUUID()
  company_id?: string;

  @IsOptional()
  @IsString()
  identification?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  secondName?: string;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsString()
  secondSurName?: string;

  @IsOptional()
  @IsDate()
  birthDate?: Date;

  @IsOptional()
  @IsUUID()
  city_id?: string;

  @IsOptional()
  @IsUUID()
  state_id?: string;

  @IsOptional()
  @IsUUID()
  country_id?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  search?: string;
}

export class UploadEmployeeDto {
  @IsString() identification: string;
  @IsString() firstName: string;
  @IsOptional() @IsString() secondName?: string;
  @IsString() surname: string;
  @IsOptional() @IsString() secondSurName?: string;
  @IsString() birthDate: string;
  @IsString() address: string;
  @IsString() phone: string;
  @IsString() cellPhone: string;
  @IsEmail() email: string;
  @IsString() company_id: string;
  @IsString() createUser: string;
  @IsBoolean() isActive: boolean;
}
