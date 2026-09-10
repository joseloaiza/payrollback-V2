import { EmployeeFullView } from 'src/employees/entities/employee.view';
import { Movement } from 'src/movement/entities/movement.entity';

export interface PayrollCalculationResult {
  salary: number;
  movements: Movement[];
  deductions: number;
  contributions: number;
}

export interface IPeriod {
  id: string;
  year: number;
  number: number;
  initialDate: Date;
  endDate: Date;
  company_id: string;
  periodStatus_id: string;
  description?: string;
  isActive: boolean;
  month?: number;
  previousPeriodYear: number;
  previousPeriodNumber: number;
}

export interface PayrollContext {
  employeeId: string;
  companyId: string;
  period: IPeriod;
  realEndDatePeriod: Date;
  totalWorkindays: number;
  totalAbseenteDays: number;
  excess1393: number;
  totalBaseCree: number;
  ibcSocialSecurity: number;
  rawSalary: number;
  vacationHistory: number;
  salaryData: {
    salary: number;
    salaryTypeCode: string;
    variableSalary: boolean;
  };
  contractData: {
    regimeCode: string;
    contributorTypeCode: string;
    riskPercentage: number;
    transportAssistance: boolean;
    variableSalary: boolean;
    contractsInPeriod: Contract[];
    initialContract: Contract;
  };
  employeeContext: EmployeeFullView;
  // Add other relevant data as needed
}

export interface Contract {
  initialContractDate: Date;
  endContractDate: Date | null;
  classification: string;
}

export interface MappingConfig {
  daysKey: string;
  valueKey?: string;
  value?: number;
  code: string;
}

export interface MovementData {
  quantity: number;
  value: number;
  concept: string;
}

export interface Excess1393Result {
  movements: Movement[];
  excess1393: number;
  totalBaseCree: number;
}

export interface PeriodData {
  id: string;
  number: number;
  year: number;
  month: number;
  initialDate: Date;
  endDate: Date;
  isActive: boolean;
  previousPeriodYear: number;
  previousPeriodNumber: number;
}

/**
 * DTO for creating a new payroll job
 * All fields from PayrollJob entity except auto-generated ones
 */
export interface CreatePayrollJobDto {
  companyId: string;
  periodId: string;
  totalEmployees: number;
  periodData: PeriodData;

  // Optional fields with defaults
  processedCount?: number;
  failedCount?: number;
  status?: 'processing' | 'completed' | 'completed_with_errors' | 'failed';
  employeeResults?: Record<
    string,
    {
      status: string;
      error?: string;
      completedAt: Date;
    }
  >;
}

export interface JobSearchFilters {
  companyId?: string;
  status?: string | string[];
  periodId?: string;
  createdAfter?: Date;
  createdBefore?: Date;
  limit?: number;
  offset?: number;
}

export interface JobStatusResponse {
  jobId: string;
  companyId: string;
  periodId: string;
  status: 'processing' | 'completed' | 'completed_with_errors' | 'failed';
  progress: number; // Percentage 0-100
  totalEmployees: number;
  processedCount: number;
  failedCount: number;
  createdAt: Date;
  completedAt: Date | null;
  updatedAt: Date;
  estimatedTimeRemaining?: number; // in seconds
  periodData?: {
    id: string;
    number: number;
    year: number;
    month: number;
    initialDate: Date;
    endDate: Date;
  };
}

export interface JobDetailResponse extends JobStatusResponse {
  employeeResults?: Record<
    string,
    {
      status: string;
      error?: string;
      completedAt: Date;
    }
  >;
  failedEmployees?: Array<{
    employeeId: string;
    error: string;
    completedAt: Date;
  }>;
  completedEmployees?: Array<{
    employeeId: string;
    completedAt: Date;
  }>;
  completedWithErrorsEmployees?: Array<{
    employeeId: string;
    completedAt: Date;
  }>;
}

export interface movements {
  concept_code: string;
  concept_description: string;
  quantity: number;
  value: number;
}

export interface Provisions {
  vacaciones: movements[];
  prima: movements[];
  cesantias: movements[];
  interes_cesantias: movements[];
}
