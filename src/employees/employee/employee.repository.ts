import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  FilterEmployeeDto,
} from './../dtos/employee.dto';
import { BaseRepository } from 'src/database/base.repository';
import { Employee } from '../entities/employee.entity';
import { EmployeeSalary } from '../entities/employee-salary.entity';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { EmployeeFullView } from '../entities/employee.view';
import { EmployeeContract } from '../entities/employee-contract.entity';

@Injectable()
export class EmployeeRepository extends BaseRepository<
  Employee,
  CreateEmployeeDto,
  UpdateEmployeeDto,
  FilterEmployeeDto
> {
  constructor(
    @InjectRepository(Employee)
    repo: Repository<Employee>,
    @InjectRepository(EmployeeFullView)
    private readonly repoview: Repository<EmployeeFullView>,
    @InjectRepository(EmployeeContract)
    private readonly contract_repo: Repository<EmployeeContract>,
  ) {
    super(repo);
  }

  async search_employees(
    queryFilters: FilterEmployeeDto,
  ): Promise<PaginatedResult<Employee>> {
    const { page, limit, search, ...filters } = queryFilters;
    const { data, total } = await this.filterEntities(
      filters,
      page,
      limit,
      ['company', 'city'],
      null,
      null,
      ['firstName', 'secondName', 'identification', 'surname', 'secondSurName'],
      search,
    );
    return { data, total };
  }

  async find_employees(options: {
    id?: string;
    company_id?: string;
    includeRelations?: {
      company?: boolean;
      city?: boolean;
      state?: boolean;
      country?: boolean;
      job?: boolean;
      payment?: boolean;
      socialSecurity?: boolean;
      working?: boolean;
      salaries?: boolean;
      salaryType?: boolean;
      contracts?: boolean;
      contractRegime?: boolean;
      contributorType?: boolean;
      WorkPlaceRisks?: boolean;
      employeeType?: boolean;
      identificationType?: boolean;
      gender?: boolean;
    };
  }) {
    const { id, company_id, includeRelations = {} } = options;

    const query = this.repo.createQueryBuilder('employee');

    // WHERE conditions
    if (id) {
      query.andWhere('employee.id = :id', { id });
    }

    if (company_id) {
      query.andWhere('employee.company_id = :company_id', { company_id });
    }

    query.andWhere('employee.isActive = :isActive', { isActive: true });

    // SELECT base employee fields
    const selectFields = [
      'employee.id',
      'employee.identification',
      'employee.company_id',
      'employee.firstName',
      'employee.surname',
      'employee.secondName',
      'employee.secondSurName',
      'employee.birthDate',
      'employee.address',
      'employee.phone',
      'employee.cellPhone',
      'employee.email',
      'employee.img',
    ];

    // Optional joins and fields

    if (includeRelations.identificationType) {
      query.leftJoinAndSelect(
        'employee.identificationType',
        'IdentificationType',
      );
      selectFields.push(
        'IdentificationType.id',
        'IdentificationType.code',
        'IdentificationType.description',
      );
    }

    if (includeRelations.company) {
      query.leftJoinAndSelect('employee.company', 'Company');
      selectFields.push('Company.id', 'Company.name', 'Company.city_id');
    }

    if (includeRelations.gender) {
      query.leftJoinAndSelect('employee.gender', 'Gender');
      selectFields.push(
        'Gender.id',
        'Gender.code',
        'Gender.description',
        'Gender.isActive',
      );
    }

    if (includeRelations.city) {
      query.leftJoinAndSelect('employee.city', 'City');
      selectFields.push('City.id', 'City.code', 'City.name');
    }

    if (includeRelations.state) {
      query.leftJoinAndSelect('employee.state', 'State');
      selectFields.push('State.id', 'State.code', 'State.name');
    }

    if (includeRelations.country) {
      query.leftJoinAndSelect('employee.country', 'Country');
      selectFields.push('Country.id', 'Country.code', 'Country.name');
    }

    // Optional joins and fields
    if (includeRelations.job) {
      query.leftJoinAndSelect('employee.job', 'Job');
      selectFields.push(
        'Job.costCenter_id',
        'Job.area_id',
        'Job.subsidiary_id',
        'Job.position_id',
        'Job.isActive',
      );
    }

    if (includeRelations.job) {
      query.leftJoinAndSelect('Job.costCenter', 'CostCenter');
      selectFields.push(
        'CostCenter.id',
        'CostCenter.code',
        'CostCenter.description',
        'CostCenter.isActive',
      );
    }

    if (includeRelations.job) {
      query.leftJoinAndSelect('Job.area', 'Area');
      selectFields.push('Area.id', 'Area.description', 'Area.isActive');
    }

    if (includeRelations.job) {
      query.leftJoinAndSelect('Job.position', 'Position');
      selectFields.push(
        'Position.id',
        'Position.description',
        'Position.isActive',
      );
    }

    if (includeRelations.job) {
      query.leftJoinAndSelect('Job.subsidiary', 'Subsidiary');
      selectFields.push(
        'Subsidiary.id',
        'Subsidiary.description',
        'Subsidiary.isActive',
      );
    }

    if (includeRelations.payment) {
      query.leftJoinAndSelect('employee.payment', 'Payment');
      selectFields.push(
        'Payment.accountNumber',
        'Payment.bank_id',
        'Payment.accountType_id',
        'Payment.isActive',
      );
    }

    if (includeRelations.payment) {
      query.leftJoinAndSelect('Payment.bank', 'Bank');
      selectFields.push(
        'Bank.id',
        'Bank.code',
        'Bank.name',
        'Bank.identification',
        'Bank.isActive',
      );
    }

    if (includeRelations.payment) {
      query.leftJoinAndSelect('Payment.accountType', 'AccountType');
      selectFields.push(
        'AccountType.id',
        'AccountType.code',
        'AccountType.description',
        'AccountType.isActive',
      );
    }

    if (includeRelations.socialSecurity) {
      query.leftJoinAndSelect('employee.socialSecurity', 'SocialSecurity');
      selectFields.push(
        'SocialSecurity.contributorType_id',
        'SocialSecurity.contributorSubType_id',
        'SocialSecurity.entityHealth_id',
        'SocialSecurity.entityPension_id',
        'SocialSecurity.entitySeverance_id',
        'SocialSecurity.isActive',
      );
    }

    if (includeRelations.socialSecurity) {
      query.leftJoinAndSelect(
        'SocialSecurity.contributorType',
        'ContributorType',
      );
      selectFields.push(
        'ContributorType.id',
        'ContributorType.code',
        'ContributorType.description',
      );
    }

    if (includeRelations.socialSecurity) {
      query.leftJoinAndSelect(
        'SocialSecurity.contributorSubType',
        'ContributorSubType',
      );
      selectFields.push(
        'ContributorSubType.id',
        'ContributorSubType.code',
        'ContributorSubType.description',
      );
    }

    if (includeRelations.socialSecurity) {
      query.leftJoinAndSelect(
        'SocialSecurity.healthEntity',
        'SocialSecurityEntityHealth',
      );
      selectFields.push(
        'SocialSecurityEntityHealth.id',
        'SocialSecurityEntityHealth.code',
        'SocialSecurityEntityHealth.name',
      );
    }

    if (includeRelations.socialSecurity) {
      query.leftJoinAndSelect(
        'SocialSecurity.pensionEntity',
        'SocialSecurityEntityPension',
      );
      selectFields.push(
        'SocialSecurityEntityPension.id',
        'SocialSecurityEntityPension.code',
        'SocialSecurityEntityPension.name',
      );
    }

    if (includeRelations.socialSecurity) {
      query.leftJoinAndSelect(
        'SocialSecurity.severanceEntity',
        'SocialSecurityEntitySeverance',
      );
      selectFields.push(
        'SocialSecurityEntitySeverance.id',
        'SocialSecurityEntitySeverance.code',
        'SocialSecurityEntitySeverance.name',
      );
    }

    if (includeRelations.working) {
      query.leftJoinAndSelect('employee.working', 'Working');
      selectFields.push(
        'Working.contractRegime_id',
        'Working.employeeType_id',
        'Working.companyEconomicActivityRisk_id',
        'Working.workingHour_id',
        'Working.transportAssistance',
        'Working.variableSalary',
        'Working.isActive',
      );
    }

    if (includeRelations.working) {
      query.leftJoinAndSelect('Working.contractRegime', 'ContractRegime');
      selectFields.push(
        'ContractRegime.id',
        'ContractRegime.code',
        'ContractRegime.description',
        'ContractRegime.isActive',
      );
    }

    if (includeRelations.working) {
      query.leftJoinAndSelect(
        'Working.companyEconomicActivityRisk',
        'CompanyEconomicActivityRisk',
      );
      selectFields.push(
        'CompanyEconomicActivityRisk.id',
        'CompanyEconomicActivityRisk.company_id',
        'CompanyEconomicActivityRisk.economicactivity_id',
        'CompanyEconomicActivityRisk.workplacerisk_id',
      );
    }

    if (includeRelations.working) {
      query.leftJoinAndSelect(
        'CompanyEconomicActivityRisk.workPlaceRisks',
        'WorkPlaceRisks',
      );
      selectFields.push(
        'WorkPlaceRisks.id',
        'WorkPlaceRisks.code',
        'WorkPlaceRisks.description',
        'WorkPlaceRisks.percentage',
        'WorkPlaceRisks.isActive',
      );
    }

    if (includeRelations.working) {
      query.leftJoinAndSelect(
        'CompanyEconomicActivityRisk.economicActivity',
        'EconomicActivity',
      );
      selectFields.push(
        'EconomicActivity.id',
        'EconomicActivity.code',
        'EconomicActivity.description',
      );
    }

    if (includeRelations.working) {
      query.leftJoinAndSelect('Working.employeeType', 'EmployeeType');
      selectFields.push(
        'EmployeeType.id',
        'EmployeeType.code',
        'EmployeeType.description',
        'EmployeeType.isActive',
      );
    }

    if (includeRelations.salaries) {
      query.leftJoinAndSelect('employee.salaries', 'salaries');
      selectFields.push(
        'salaries.employee_id',
        'salaries.salaryType_id',
        'salaries.salary',
        'salaries.initialSalaryDate',
        'salaries.endSalaryDate',
        'salaries.isActive',
      );
    }

    if (includeRelations.salaries) {
      query.leftJoinAndSelect('salaries.salaryType', 'SalaryType');
      selectFields.push(
        'SalaryType.id',
        'SalaryType.code',
        'SalaryType.description',
        'SalaryType.isActive',
      );
    }

    if (includeRelations.contracts) {
      query.leftJoinAndSelect('employee.contracts', 'contracts');
      selectFields.push(
        'contracts.employee_id',
        'contracts.contractType_id',
        'contracts.initialContractDate',
        'contracts.endContractDate',
        'contracts.isActive',
      );
    }

    if (includeRelations.contracts) {
      query.leftJoinAndSelect('contracts.contractType', 'contractType');
      selectFields.push(
        'contractType.id',
        'contractType.code',
        'contractType.description',
        'contractType.isActive',
      );
    }

    query.select(selectFields);

    const data = await query.getMany();
    return data;
  }

  async get_employees_movement(
    companyId: string,
    periodId: string,
  ): Promise<any[]> {
    const rawPayrolls = await this.repo
      .createQueryBuilder('employee')
      .leftJoin(
        (qb) =>
          qb
            .select([
              'salary.employee_id AS emp_id',
              'salary.salary AS emp_salary',
            ])
            .from(EmployeeSalary, 'salary')
            .where('salary.isActive = true'),
        'salary',
        'salary.emp_id = employee.id',
      )
      .leftJoin(
        'employee.movements',
        'movement',
        'movement.period_id = :periodId AND movement.value > 0',
        { periodId },
      )
      .leftJoin(
        'movement.concept',
        'concept',
        'concept.company_id = :companyId',
        { companyId },
      )
      .where('employee.company_id = :companyId', { companyId })
      .select([
        'employee.id AS id',
        'employee.identification AS identification',
        'employee.firstName AS first_name',
        'employee.secondName AS second_name',
        'employee.surname AS first_last_name',
        'employee.secondSurName AS second_last_name',
        'employee.img as img',
        'salary.emp_salary AS salary',
        'movement.quantity AS quantity',
        'movement.value AS value',
        'concept.code AS concept_code',
        'concept.description AS concept_description',
        'concept.conceptGroup AS concept_group',
      ])
      .orderBy('employee.id', 'ASC')
      .getRawMany();

    return rawPayrolls;
  }

  async getEmployee(employeeId: string): Promise<EmployeeFullView> {
    return this.repoview
      .createQueryBuilder('employee')
      .where('employee.employee_id = :employeeId', { employeeId })
      .orderBy('employee.endSalaryDate', 'DESC')
      .limit(1)
      .getOne();
    //return this.repoview.findOneBy({ employee_id: employeeId });
  }

  async getEmployeesCompany(company_id: string): Promise<EmployeeFullView[]> {
    const employees = await this.repoview.find({
      where: { company_id: company_id },
    });

    return employees;
  }

  async getEmployeeIdsByCompany(companyId: string): Promise<string[]> {
    const result = await this.repoview
      .createQueryBuilder('employee')
      .select('employee.employee_id')
      .where('employee.company_id = :companyId', { companyId })
      .getMany();

    return result.map((e) => e.employee_id);
  }

  async getContractsEmployee(employeeId: string): Promise<EmployeeContract[]> {
    const contracts = await this.contract_repo.find({
      where: { employee_id: employeeId },
    });

    return contracts;
  }

  async findContractsInPeriod(
    employeeId: string,
    periodStart: Date,
    periodEnd: Date,
  ): Promise<EmployeeContract[]> {
    return this.contract_repo
      .createQueryBuilder('c')
      .where('c.employee_id = :employeeId', { employeeId })
      .andWhere('c.initialContractDate <= :periodEnd', { periodEnd })
      .andWhere(
        '(c.endContractDate IS NULL OR c.endContractDate >= :periodStart)',
        { periodStart },
      )
      .orderBy('c.initialContractDate', 'ASC')
      .getMany();
  }

  async getInitialContract(employeeId: string): Promise<EmployeeContract> {
    return this.contract_repo
      .createQueryBuilder('c')
      .where('c.employee_id = :employeeId', { employeeId })
      .orderBy('c.initialContractDate', 'ASC')
      .getOne();
  }
}
