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

import * as fs from 'fs';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { EmployeeFullView } from '../entities/employee.view';
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
  // private async saveEmployees(
  //   rows: any[],
  //   company_id: string,
  //   user_id: string,
  // ) {
  //   const employees: UploadEmployeeDto[] = rows.map((item) => ({
  //     isActive: true,
  //     identification: item[0],
  //     firstName: item[1],
  //     secondName: item[2] || '',
  //     surname: item[3],
  //     secondSurName: item[4] || '',
  //     birthDate: item[5],
  //     address: item[6],
  //     phone: item[7],
  //     cellPhone: item[8],
  //     email: item[9],
  //     company_id,
  //     createUser: user_id,
  //   }));

  //   await this.repo.save(employees);
  //   return {
  //     message: 'Employees uploaded successfully',
  //     count: employees.length,
  //   };
  // }

  private detectDelimiter(filePath: string): string {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(',')) return ',';
    if (content.includes(';')) return ';';
    if (content.includes('\t')) return '\t';
    if (content.includes('|')) return '|';
    return ','; // Default
  }
}

// async processFile(
//   filePath: string,
//   fileType: string,
//   company_id: string,
//   user_id: string,
// ): Promise<any> {
//   if (
//     fileType ===
//     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//   ) {
//     return this.processExcel(filePath, company_id, user_id);
//   } else if (['text/csv', 'text/plain'].includes(fileType)) {
//     return this.processCSVorTXT(filePath, company_id, user_id);
//   } else {
//     throw new BadRequestException('Unsupported file format');
//   }
// }

// private async processExcel(
//   filePath: string,
//   company_id: string,
//   user_id: string,
// ): Promise<any> {
//   const workbook = XLSX.readFile(filePath);
//   const sheet = workbook.Sheets[workbook.SheetNames[0]];
//   const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//   return this.saveEmployees(rows, company_id, user_id);
// }

// private async processCSVorTXT(
//   filePath: string,
//   company_id: string,
//   user_id: string,
// ): Promise<any> {
//   return new Promise((resolve, reject) => {
//     const employees: any[] = [];
//     const stream = fs.createReadStream(filePath);
//     const parser = fastCsv
//       .parse({ headers: false, delimiter: this.detectDelimiter(filePath) })
//       .on('error', (error) => reject(error))
//       .on('data', (row) => employees.push(row))
//       .on('end', async () => {
//         try {
//           const result = await this.saveEmployees(
//             employees,
//             company_id,
//             user_id,
//           );
//           resolve(result);
//         } catch (error) {
//           reject(error);
//         }
//       });

//     stream.pipe(parser);
//   });
// }
