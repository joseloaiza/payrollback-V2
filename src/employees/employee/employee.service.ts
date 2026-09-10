import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  FilterEmployeeDto,
  ResponseEmployeeDto,
  //UploadEmployeeDto,
} from './../dtos/employee.dto';
import { mapEmployeeToDto } from '../utils/transform';
import { EmployeeRepository } from './employee.repository';

import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { EmployeeFullView } from '../entities/employee.view';
import { EmployeeContract } from '../entities/employee-contract.entity';
//import * as XLSX from 'xlsx';
//import * as fastCsv from 'fast-csv';

@Injectable()
export class EmployeeService {
  constructor(private readonly repo: EmployeeRepository) {}

  async create(dto: CreateEmployeeDto): Promise<ResponseEmployeeDto> {
    const newEntity = await this.repo.create(dto);
    return plainToInstance(ResponseEmployeeDto, newEntity);
  }

  async update(
    id: string,
    dto: UpdateEmployeeDto,
  ): Promise<ResponseEmployeeDto> {
    const updatedEntity = await this.repo.update(id, dto);
    return plainToInstance(ResponseEmployeeDto, updatedEntity);
  }

  async delete(id: string): Promise<string> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Employee not found');
    }
    return 'Employee delete successfully';
  }

  async search_employees(
    queryFilters: FilterEmployeeDto,
  ): Promise<PaginatedResult<ResponseEmployeeDto>> {
    const { page, limit, ...filters } = queryFilters;
    const { data, total } = await this.repo.filterEntities(
      filters,
      page,
      limit,
    );
    const employeesDto = data.map((employee) => mapEmployeeToDto(employee));
    return { data: employeesDto, total };
  }

  async getFullDataByCompany(
    company_id: string,
  ): Promise<ResponseEmployeeDto[]> {
    const employees = await this.repo.find_employees({
      company_id,
      includeRelations: {
        company: true,
        city: true,
        state: true,
        country: true,
        job: true,
        payment: true,
        socialSecurity: true,
        working: true,
        salaries: true,
        salaryType: true,
        contracts: true,
        contractRegime: true,
        contributorType: true,
        WorkPlaceRisks: true,
        employeeType: true,
      },
    });
    const employeesDto = employees.map((employee) =>
      mapEmployeeToDto(employee),
    );
    return employeesDto;
  }

  async getBasicDataByCompany(
    company_id: string,
  ): Promise<ResponseEmployeeDto[]> {
    const employees = await this.repo.find_employees({
      company_id,
      includeRelations: {
        company: true,
        city: true,
        state: true,
        country: true,
        salaries: true,
      },
    });

    const employeesDto = employees.map((employee) =>
      mapEmployeeToDto(employee),
    );
    return employeesDto;
  }

  async getFullData(id: string): Promise<ResponseEmployeeDto> {
    const employee = await this.repo.find_employees({
      id,
      includeRelations: {
        company: true,
        city: true,
        state: true,
        country: true,
        job: true,
        payment: true,
        socialSecurity: true,
        working: true,
        salaries: true,
        salaryType: true,
        contracts: true,
        contributorType: true,
        identificationType: true,
        gender: true,
      },
    });
    if (employee.length > 0) return mapEmployeeToDto(employee[0]);
  }

  ///que pasa
  async getBasicData(id: string): Promise<ResponseEmployeeDto> {
    const employee = await this.repo.find_employees({
      id,
      includeRelations: {
        company: true,
        city: true,
        state: true,
        country: true,
      },
    });
    if (employee.length > 0) return mapEmployeeToDto(employee[0]);
  }

  async get_employees_movement(
    companyId: string,
    periodId: string,
  ): Promise<any[]> {
    return await this.repo.get_employees_movement(companyId, periodId);
  }

  async getEmployee(employeeId: string): Promise<EmployeeFullView> {
    return await this.repo.getEmployee(employeeId);
  }

  async getEmployeesCompany(company_id: string): Promise<EmployeeFullView[]> {
    const employees = await this.repo.getEmployeesCompany(company_id);
    return employees;
  }

  async getEmployeeIdsByCompany(companyId: string): Promise<string[]> {
    const employeeIds = await this.repo.getEmployeeIdsByCompany(companyId);
    return employeeIds;
  }

  async getContractsEmployee(employeeId: string): Promise<EmployeeContract[]> {
    const contracts = await this.repo.getContractsEmployee(employeeId);

    return contracts;
  }

  async getContractsInPeriod(
    employeeId: string,
    periodStart: Date,
    periodEnd: Date,
  ): Promise<EmployeeContract[]> {
    const contracts = await this.repo.findContractsInPeriod(
      employeeId,
      periodStart,
      periodEnd,
    );

    return contracts;
  }

  async getInitialContract(employeeId: string): Promise<EmployeeContract> {
    const contract = await this.repo.getInitialContract(employeeId);
    return contract;
  }
}
