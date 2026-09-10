import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ExporterBase } from './exports.ExporterBase';
import { AppConstants } from 'src/app.constants';
import { CompanyService } from 'src/companies/company/company.service';
import { format } from 'date-fns';
import { CompanyPaymentService } from 'src/companies/company-payment/companyPayment.service';
import { PayrollService } from '../payroll/payroll.service';
import { EmployeePaymentService } from 'src/employees/employee-payment/employee-payment.service';
import { BankService } from 'src/shared/bank/bank.service';
import { AccountTypeService } from 'src/shared/account-type/account-type.service';
import { AccountTypeANimo } from './Enums/exports..Enum.AccountTypeAnimo';
import { AccountTypeBCOL } from './Enums/exports..Enum.AccountTypeBCOL';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class ExportsService extends ExporterBase {
  constructor(
    private readonly companyService: CompanyService,
    private readonly companyPaymentSevice: CompanyPaymentService,
    private readonly payrollService: PayrollService,
    private readonly employeePaymentService: EmployeePaymentService,
    private readonly bankService: BankService,
    private readonly accountType: AccountTypeService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    super();
  }

  //creates the plain text content  for Bancolombia (BCOL)
  public async Export(
    id: string,
    periodId: string,
    employees: Array<string>,
  ): Promise<string> {
    const content: Array<string> = new Array<string>();
    const currentDate = format(new Date(), 'yyMMdd');
    const currentDateSec = format(new Date(), 'yyMMddhhmmss');
    const streamableFilename = `Animo-BCOL-${currentDateSec}.txt`;
    let totalSalary: number = 0,
      totalNoNSalary: number = 0,
      totalDeduction: number = 0;
    try {
      // get nit and name for company
      // get account number and type for company
      const { accountNumber, accountType_id } =
        await this.companyPaymentSevice.findOne(id);
      // get account AccountType
      const { code } = await this.accountType.findOne(accountType_id);
      // get credit totals
      const resumePayroll = await this.payrollService.getResumePayroll(
        id,
        periodId,
      );
      const { identification, name } = await this.companyService.findOne(id);

      for (const element of resumePayroll) {
        if (employees.find((employee) => employee === element['id'])) {
          // total on header
          totalSalary += Number(element['SALARIAL']);
          totalNoNSalary += Number(element['NOSALARIAL']);
          totalDeduction += Number(element['DEDUCCION']);
          const totalTransaction =
            Number(element['SALARIAL']) +
            Number(element['NOSALARIAL']) -
            Number(element['DEDUCCION']);

          try {
            const { bank_id, accountNumber, accountType_id } =
              await this.employeePaymentService.findOne(element['id']);
            const { code } = await this.bankService.findOne(bank_id);

            const detailFields = [
              {
                name: 'DetailRecordType',
                value: AppConstants.DETAIL_RECORD_TYPE,
                length: 1,
                isNumber: false,
                align: 'left',
              },
              {
                name: 'BeneficiaryNit',
                value: element['identification'],
                length: 15,
                isNumber: false,
                align: 'left',
              },
              {
                name: 'BeneficiaryName',
                value: `${element['first_name']} ${element['second_name']} ${element['first_last_name']} ${element['second_last_name']}`,
                length: 18,
                isNumber: false,
                align: 'left',
              },
              {
                name: 'BankCode',
                value: code,
                length: 9,
                isNumber: true,
                align: 'right',
              },
              {
                name: 'BankAccountNumber',
                value: accountNumber,
                length: 17,
                isNumber: true,
                align: 'right',
              },
              {
                name: 'PaymentPlace',
                value: AppConstants.PAYMENT_PLACE,
                length: 1,
                isNumber: false,
                align: 'left',
              },
              {
                name: 'AccountType',
                value: accountType_id,
                length: 1,
                isNumber: false,
                align: 'left',
              },
              {
                name: 'TransactionValue',
                value: totalTransaction.toString(),
                length: 10,
                isNumber: true,
                align: 'right',
              },
              {
                name: 'Concept',
                value: '0',
                length: 9,
                isNumber: true,
                align: 'right',
              },
              {
                name: 'Reference',
                value: '0',
                length: 12,
                isNumber: true,
                align: 'right',
              },
              {
                name: 'Spaces',
                value: ' ',
                length: 1,
                isNumber: false,
                align: 'left',
              },
            ];
            const DetailLine = await this.createLine(detailFields);
            content.push(DetailLine);
            console.log(DetailLine);
          } catch (err) {
            this.logger.error(`Company Id ${id} Period Id ${periodId} ${err} `);
            throw err;
          }
        }
      }

      const totalCredits = totalSalary + totalNoNSalary - totalDeduction;

      //headers fields mapping
      const headerFields = [
        {
          name: 'RecordType',
          value: AppConstants.RECORD_TYPE,
          length: 1,
          isNumber: false,
          align: 'left',
        },
        {
          name: 'CompanyNit',
          value: identification,
          length: 10,
          isNumber: false,
          align: 'left',
        },
        {
          name: 'CompanyName',
          value: name,
          length: 16,
          isNumber: false,
          align: 'left',
        },
        {
          name: 'TransactionType',
          value: AppConstants.TRANSACTION_TYPE,
          length: 3,
          isNumber: false,
          align: 'left',
        },
        {
          name: 'TransactionDescription',
          value: AppConstants.TRANSACTION_DESCRIPTION,
          length: 10,
          isNumber: false,
          align: 'left',
        },
        {
          name: 'TransactionDate',
          value: currentDate,
          length: 6,
          isNumber: false,
          align: 'left',
        },
        {
          name: 'ShippingSequence',
          value: AppConstants.SHIPPING_SEQUENCE,
          length: 1,
          isNumber: false,
          align: 'left',
        },
        {
          name: 'ApplicationDate',
          value: currentDate,
          length: 6,
          isNumber: false,
          align: 'right',
        },
        {
          name: 'NumberOfRecords',
          value: resumePayroll.length.toString(),
          length: 6,
          isNumber: true,
          align: 'right',
        },
        {
          name: 'DebitsTotal',
          value: totalCredits.toString(),
          length: 12,
          isNumber: true,
          align: 'right',
        }, // always come with zeros
        {
          name: 'CreditsTotal',
          value: '0',
          length: 12,
          isNumber: true,
          align: 'right',
        },
        {
          name: 'AccountNumber',
          value: accountNumber,
          length: 11,
          isNumber: true,
          align: 'right',
        },
        {
          name: 'AccountType',
          value:
            code === AccountTypeANimo.AH
              ? AccountTypeBCOL.S
              : AccountTypeBCOL.D,
          length: 1,
          isNumber: false,
          align: 'left',
        },
      ];

      //create header line
      const headerLine = this.createLine(headerFields);
      content.push(headerLine);
      console.log(headerLine);
    } catch (err) {
      this.logger.error(`Company Id ${id} Period Id ${periodId} ${err} `);
      throw err;
    }

    this.streamWriteArrayToFile(streamableFilename, content.reverse());
    return streamableFilename;
  }
}
