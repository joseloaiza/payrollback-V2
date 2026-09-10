import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Employee } from '../employees/entities/employee.entity';
import { EmployeeSalary } from 'src/employees/entities/employee-salary.entity';

@Injectable()
export class PayrollRepository {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  // async getPayrollSummaryByEmployee(companyId: string, periodId: string) {
  //   return await this.employeeRepository
  //     .createQueryBuilder('employee')
  //     .leftJoin(
  //       (qb) =>
  //         qb
  //           .select([
  //             'snap.employee_id AS emp_id',
  //             'snap_input.value_numeric AS emp_salary', // ← from input table ✓
  //           ])
  //           .from('payroll_employee_snapshot', 'snap')
  //           .innerJoin(
  //             'payroll_employee_snapshot_input',
  //             'snap_input',
  //             `snap_input.snapshot_id = snap.id
  //            AND snap_input.input_code = 'SALARY.SALARY'`,
  //           )
  //           .where('snap.company_id = :companyId', { companyId })
  //           .andWhere('snap.period_id = :periodId', { periodId }),
  //       'salary',
  //       'salary.emp_id = employee.id',
  //     )
  //     .leftJoin(
  //       'employee.movements',
  //       'movement',
  //       'movement.period_id = :periodId AND movement.value > 0',
  //       { periodId },
  //     )
  //     .leftJoin(
  //       'movement.concept',
  //       'concept',
  //       `concept.conceptGroup IN (:...groups)
  //      OR concept.code IN (:...baseCodes)  -- ← incluye los codigos base
  //      AND concept.company_id = :companyId`,
  //       {
  //         groups: [
  //           'NOSALARIAL',
  //           'SALARIAL',
  //           'DEDUCCION',
  //           'PRESTACIONESSOCIALES',
  //         ],
  //         baseCodes: ['/130', '/131', '/132'], // ← codigos de bases
  //         companyId,
  //       },
  //     )
  //     .where('employee.company_id = :companyId', { companyId })
  //     .select([
  //       'employee.id AS id',
  //       'employee.identification AS identification',
  //       'employee.firstName AS first_name',
  //       'employee.secondName AS second_name',
  //       'employee.surname AS first_last_name',
  //       'employee.secondSurName AS second_last_name',
  //       'employee.img as img',
  //       'salary.emp_salary AS salary',
  //       'movement.quantity AS quantity',
  //       'movement.value AS value',
  //       'concept.code AS concept_code',
  //       'concept.description AS concept_description',
  //       'concept.conceptGroup AS concept_group',
  //     ])
  //     .orderBy('employee.id', 'ASC')
  //     .getRawMany();
  // }

  async getPayrollSummaryByEmployee(
    companyId: string,
    periodId: string,
    employeeId?: string,
  ) {
    const query = this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoin(
        (qb) =>
          qb
            .select([
              'snap.employee_id AS emp_id',
              'snap_input.value_numeric AS emp_salary',
            ])
            .from('payroll_employee_snapshot', 'snap')
            .innerJoin(
              'payroll_employee_snapshot_input',
              'snap_input',
              `snap_input.snapshot_id = snap.id
         AND snap_input.input_code = 'SALARY.SALARY'`,
            )
            .where('snap.company_id = :companyId', { companyId })
            .andWhere('snap.period_id = :periodId', { periodId }),
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
        `concept.conceptGroup IN (:...groups) 
   OR concept.code IN (:...baseCodes)
   AND concept.company_id = :companyId`,
        {
          groups: [
            'NOSALARIAL',
            'SALARIAL',
            'DEDUCCION',
            'PRESTACIONESSOCIALES',
          ],
          baseCodes: ['/130', '/131', '/132'],
          companyId,
        },
      )
      // ── nuevos joins ──
      .leftJoin('movement.liquidation', 'liquidation')
      .leftJoin('liquidation.reasonContractTermination', 'reason')
      .where('employee.company_id = :companyId', { companyId });

    if (employeeId) {
      query.andWhere('employee.id = :employeeId', { employeeId });
    }

    return await query
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
        // ── nuevos campos ──
        'liquidation.id AS liquidation_id',
        'liquidation.termination_date AS termination_date',
        'liquidation.cause_liquidation_id AS cause_liquidation_id',
        'liquidation.type AS liquidation_type',
        'reason.code AS reason_code',
        'reason.description AS reason_description',
      ])
      .orderBy('employee.id', 'ASC')
      .getRawMany();
  }
  async getProvisionsSummaryByEmployee(companyId: string, periodId: string) {
    return await this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoin(
        (qb) =>
          qb
            .select([
              'snap.employee_id AS emp_id',
              'snap_input.value_numeric AS emp_salary', // ← from input table ✓
            ])
            .from('payroll_employee_snapshot', 'snap')
            .innerJoin(
              'payroll_employee_snapshot_input',
              'snap_input',
              `snap_input.snapshot_id = snap.id
             AND snap_input.input_code = 'SALARY.SALARY'`,
            )
            .where('snap.company_id = :companyId', { companyId })
            .andWhere('snap.period_id = :periodId', { periodId }),
        'salary',
        'salary.emp_id = employee.id',
      )
      .leftJoin(
        'employee.movements',
        'movement',
        'movement.period_id = :periodId',
        { periodId },
      )
      .leftJoin(
        'movement.concept',
        'concept',
        'concept.provision = true AND concept.company_id = :companyId',
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
  }

  async get_resume_payroll_v2(
    companyId: string,
    periodId: string,
  ): Promise<any[]> {
    const rawPayrolls = await this.employeeRepository
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
        'concept.conceptGroup IN (:...groups) AND concept.company_id = :companyId',
        { groups: ['NOSALARIAL', 'SALARIAL', 'DEDUCCION'], companyId },
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
        // SUM values for each conceptGroup
        "SUM(CASE WHEN concept.conceptGroup = 'NOSALARIAL' THEN movement.value ELSE 0 END) AS total_nosalarial",
        "SUM(CASE WHEN concept.conceptGroup = 'SALARIAL' THEN movement.value ELSE 0 END) AS total_salarial",
        "SUM(CASE WHEN concept.conceptGroup = 'DEDUCCION' THEN movement.value ELSE 0 END) AS total_deduccion",
        // Aggregate movements into arrays
        `ARRAY_AGG(
      CASE 
        WHEN concept.conceptGroup = 'NOSALARIAL' THEN 
          jsonb_build_object('quantity', movement.quantity, 'value', movement.value, 'concept_code', concept.code, 'description', concept.description) 
        ELSE NULL 
      END
    ) FILTER (WHERE concept.conceptGroup = 'NOSALARIAL') AS movements_nosalarial`,

        `ARRAY_AGG(
      CASE 
        WHEN concept.conceptGroup = 'SALARIAL' THEN 
          jsonb_build_object('quantity', movement.quantity, 'value', movement.value, 'concept_code', concept.code, 'description', concept.description) 
        ELSE NULL 
      END
    ) FILTER (WHERE concept.conceptGroup = 'SALARIAL') AS movements_salarial`,

        `ARRAY_AGG(
      CASE 
        WHEN concept.conceptGroup = 'DEDUCCION' THEN 
          jsonb_build_object('quantity', movement.quantity, 'value', movement.value, 'concept_code', concept.code, 'description', concept.description) 
        ELSE NULL 
      END
    ) FILTER (WHERE concept.conceptGroup = 'DEDUCCION') AS movements_deduccion`,
      ])
      .groupBy('employee.id, salary.emp_salary')
      .orderBy('employee.id', 'ASC')
      .getRawMany();

    return rawPayrolls;
  }
}
