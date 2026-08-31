import { ResponseEmployeeContractDto } from '../dtos/employee-contract.dto';
import { ResponseEmployeeDto } from '../dtos/employee.dto';
import { EmployeeContract } from '../entities/employee-contract.entity';
import { Employee } from '../entities/employee.entity';

export function mapEmployeeToDto(employee: Employee): ResponseEmployeeDto {
  return {
    id: employee.id,
    identification: employee.identification,
    firstName: employee.firstName,
    secondName: employee.secondName,
    surname: employee.surname,
    secondSurName: employee.secondSurName,
    birthDate: employee.birthDate,
    address: employee.address,
    phone: employee.phone,
    cellPhone: employee.cellPhone,
    img: employee.img,
    email: employee.email,
    isActive: employee.isActive,
    company_id: employee.company_id,
    identificationType: employee.identificationType
      ? {
          id: employee.identificationType.id,
          code: employee.identificationType.code,
          description: employee.identificationType.description,
        }
      : null,
    company: employee.company
      ? { id: employee.company.id, name: employee.company.name }
      : null,
    city: employee.city
      ? { id: employee.city.id, name: employee.city.name }
      : null,
    state: employee.state
      ? { id: employee.state.id, name: employee.state.name }
      : null,
    country: employee.country
      ? { id: employee.country.id, name: employee.country.name }
      : null,
    gender: employee.gender
      ? {
          id: employee.gender.id,
          name: employee.gender.code,
          description: employee.gender.description,
          isActive: employee.gender.isActive,
        }
      : null,
    job: employee.job
      ? {
          id: employee.city.id,
          costCenter_id: employee.job.costCenter_id,
          area_id: employee.job.area_id,
          subsidiary_id: employee.job.subsidiary_id,
          position_id: employee.job.position_id,
          isActive: employee.job.isActive,
          costCenter: {
            id: employee.job.costCenter.id,
            code: employee.job.costCenter.code,
            description: employee.job.costCenter.description,
            isActive: employee.job.costCenter.isActive,
          },
          area: {
            id: employee.job.area.id,
            description: employee.job.area.description,
            isActive: employee.job.area.isActive,
          },
          subsidiary: {
            id: employee.job.subsidiary.id,
            description: employee.job.subsidiary.description,
            isActive: employee.job.subsidiary.isActive,
          },
          position: {
            id: employee.job.position.id,
            description: employee.job.position.description,
            isActive: employee.job.position.isActive,
          },
        }
      : null,

    payment: employee.payment
      ? {
          accountNumber: employee.payment.accountNumber,
          bank_id: employee.payment.bank_id,
          accountType_id: employee.payment.accountType_id,
          isActive: employee.payment.isActive,
          bank: {
            id: employee.payment.bank.id,
            code: employee.payment.bank.code,
            name: employee.payment.bank.name,
            isActive: employee.payment.bank.isActive,
          },
          accounType: {
            id: employee.payment.accountType.id,
            code: employee.payment.accountType.code,
            description: employee.payment.accountType.description,
            isActive: employee.payment.accountType.isActive,
          },
        }
      : null,

    socialSecurity: employee.socialSecurity
      ? {
          contributorType_id: employee.socialSecurity.contributorType_id,
          contributorSubType_id: employee.socialSecurity.contributorSubType_id,
          entityHealth_id: employee.socialSecurity.entityHealth_id,
          entityPension_id: employee.socialSecurity.entityPension_id,
          entitySeverance_id: employee.socialSecurity.entitySeverance_id,
          isActive: employee.socialSecurity.isActive,
          contributorType: {
            id: employee.socialSecurity.contributorType.id,
            code: employee.socialSecurity.contributorType.code,
            description: employee.socialSecurity.contributorType.description,
          },
          contributorSubType: {
            id: employee.socialSecurity.contributorSubType.id,
            code: employee.socialSecurity.contributorSubType.code,
            description: employee.socialSecurity.contributorSubType.description,
          },
          healthEntity: {
            id: employee.socialSecurity.healthEntity.id,
            code: employee.socialSecurity.healthEntity.code,
            name: employee.socialSecurity.healthEntity.name,
          },
          pensionEntity: {
            id: employee.socialSecurity.pensionEntity.id,
            code: employee.socialSecurity.pensionEntity.code,
            name: employee.socialSecurity.pensionEntity.name,
          },
          severanceEntity: {
            id: employee.socialSecurity.severanceEntity.id,
            code: employee.socialSecurity.severanceEntity.code,
            name: employee.socialSecurity.severanceEntity.name,
          },
        }
      : null,

    working: employee.working
      ? {
          contractRegime_id: employee.working.contractRegime_id,
          employeeType_id: employee.working.employeeType_id,
          companyEconomicActivityRisk_id:
            employee.working.companyEconomicActivityRisk_id,
          workingHour_id: employee.working.workingHour_id,
          transportAssistance: employee.working.transportAssistance,
          variableSalary: employee.working.variableSalary,
          isActive: employee.working.isActive,
          contractRegime: {
            id: employee.working.contractRegime.id,
            code: employee.working.contractRegime.code,
            description: employee.working.contractRegime.description,
            isActive: employee.working.contractRegime.isActive,
          },
          employeeType: {
            id: employee.working.employeeType.id,
            code: employee.working.employeeType.code,
            description: employee.working.employeeType.description,
            isActive: employee.working.employeeType.isActive,
          },
          companyEconomicActivityRisk: employee.working
            .companyEconomicActivityRisk
            ? {
                id: employee.working.companyEconomicActivityRisk.id,
                company_id:
                  employee.working.companyEconomicActivityRisk.company_id,
                economicactivity_id:
                  employee.working.companyEconomicActivityRisk
                    .economicactivity_id,
                workplacerisk_id:
                  employee.working.companyEconomicActivityRisk.workplacerisk_id,
                workPlaceRisks: employee.working.companyEconomicActivityRisk
                  .workPlaceRisks
                  ? {
                      id: employee.working.companyEconomicActivityRisk
                        .workPlaceRisks.id,
                      code: employee.working.companyEconomicActivityRisk
                        .workPlaceRisks.code,
                      description:
                        employee.working.companyEconomicActivityRisk
                          .workPlaceRisks.description,
                      percentage:
                        employee.working.companyEconomicActivityRisk
                          .workPlaceRisks.percentage,
                      isActive:
                        employee.working.companyEconomicActivityRisk
                          .workPlaceRisks.isActive,
                    }
                  : null,
                economicActivity: employee.working.companyEconomicActivityRisk
                  .economicActivity
                  ? {
                      id: employee.working.companyEconomicActivityRisk
                        .economicActivity.id,
                      code: employee.working.companyEconomicActivityRisk
                        .economicActivity.code,
                      description:
                        employee.working.companyEconomicActivityRisk
                          .economicActivity.description,
                    }
                  : null,
              }
            : null,
        }
      : null,
    salaries: employee.salaries
      ? employee.salaries.map((s) => ({
          employee_id: s.employee_id,
          salaryType_id: s.salaryType_id,
          salary: s.salary,
          initialSalaryDate: s.initialSalaryDate,
          endSalaryDate: s.endSalaryDate,
          isActive: s.isActive,
          salaryType: {
            id: s.salaryType.id,
            code: s.salaryType.code,
            description: s.salaryType.description,
            isActive: s.salaryType.isActive,
          },
        }))
      : null,

    contracts: employee.contracts
      ? employee.contracts.map((c) => ({
          employee_id: c.employee_id,
          contractType_id: c.contractType_id,
          initialContractDate: c.initialContractDate,
          endContractDate: c.endContractDate,
          isActive: c.isActive,
          contractType: {
            id: c.contractType.id,
            code: c.contractType.code,
            description: c.contractType.description,
            isActive: c.contractType.isActive,
          },
        }))
      : null,
  };
}

export function mapEmployeeContractToDto(
  employeeContract: EmployeeContract,
): ResponseEmployeeContractDto {
  return {
    id: employeeContract.id,
    initialContractDate: employeeContract.initialContractDate,
    endContractDate: employeeContract.endContractDate,
    isActive: employeeContract.isActive,
    firstContractDate: employeeContract.firstContractDate,
    employee: employeeContract.employee
      ? {
          id: employeeContract.employee.id,
          name: employeeContract.employee.firstName,
        }
      : null,
    contractType: employeeContract.contractType
      ? {
          id: employeeContract.contractType.id,
          name: employeeContract.contractType.description,
        }
      : null,
    contractClassification: employeeContract.contractClassification
      ? {
          id: employeeContract.contractClassification.id,
          code: employeeContract.contractClassification.code,
          description: employeeContract.contractClassification.description,
        }
      : null,
  };
}
