import { Module } from '@nestjs/common';
import { AccountTypeService } from './account-type/account-type.service';
import { AssistanceTypeService } from './assistance-type/assistance-type.service';
import { AssistanceTypeController } from './assistance-type/assistance-type.controller';
import { BankService } from './bank/bank.service';
import { BankController } from './bank/bank.controller';
import { CityController } from './city/city.controller';
import { CityService } from './city/city.service';
import { ContractRegimeService } from './contract-regime/contract-regime.service';
import { ContractRegimeController } from './contract-regime/contract-regime.controller';
import { ContributorTypeService } from './contributor-type/contributor-type.service';
import { ContributorTypeController } from './contributor-type/contributor-type.controller';
import { ContributorSubTypeController } from './contributor-sub-type/contributor-sub-type.controller';
import { ContributorSubTypeService } from './contributor-sub-type/contributor-sub-type.service';
import { CountryService } from './country/country.service';
import { CountryController } from './country/country.controller';
import { EmbargoTypeService } from './embargo-type/embargo-type.service';
import { EmbargoTypeController } from './embargo-type/embargo-type.controller';
import { IdentificationTypeController } from './identification-type/identification-type.controller';
import { IdentificationTypeService } from './identification-type/identification-type.service';
import { MovementTypeService } from './movement-type/movement-type.service';
import { MovementTypeController } from './movement-type/movement-type.controller';
import { PaymentFrequencyController } from './payment-frequency/payment-frequency.controller';
import { PaymentFrequencyService } from './payment-frequency/payment-frequency.service';
import { PaymentMethodService } from './payment-method/payment-method.service';
import { PaymentMethodController } from './payment-method/payment-method.controller';
import { SalaryTypeController } from './salary-type/salary-type.controller';
import { SalaryTypeService } from './salary-type/salary-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountTypeController } from './account-type/account-type.controller';
import { AccountType } from './entities/account-type.entity';
import { AssistanceType } from './entities/assistance-type.entity';
import { Bank } from './entities/bank.entity';
import { City } from './entities/city.entity';
import { ContractRegime } from './entities/contractRegime.entity';
import { ContributorSubType } from './entities/contributorSubType.entity';
import { ContributorType } from './entities/contributorType.entity';
import { Country } from './entities/country.entity';
import { StateController } from './state/state.controller';
import { StateService } from './state/state.service';
import { State } from './entities/state.entity';
import { PaymentFrequency } from './entities/paymentFrequency.entity';
import { PaymentMethod } from './entities/paymentMethod.entity';
import { SolidarityService } from './solidarity/solidarity.service';
import { SolidarityController } from './solidarity/solidarity.controller';
import { Solidarity } from './entities/solidarity.entity';
import { WorkPlaceRisksService } from './work-place-risk/work-place-risk.service';
import { WorkPlaceRisksController } from './work-place-risk/work-place-risk.controller';
import { WorkPlaceRisk } from './entities/work-place-risk.entity';
import { SalaryType } from './entities/salary-type.entity';
import { WorkingHourService } from './working-hour/working-hour.service';
import { WorkingHourController } from './working-hour/working-hour.controller';
import { WorkingHour } from './entities/workin-hour.entity';
import { SpendingAccountService } from './spending-account/spending-account.service';
import { SpendingAccountController } from './spending-account/spending-account.controller';
import { SpendingAccount } from './entities/spending-account.entity';
import { InformationOperatorService } from './information-operator/information-operator.service';
import { InformationOperatorController } from './information-operator/information-operator.controller';
import { InformationOperatorRepository } from './information-operator/information-operator.repository';
import { InformationOperator } from './entities/information-operator.entity';
import { EconomicActivityService } from './economic-activity/economic-activity.service';
import { EconomicActivityController } from './economic-activity/economic-activity.controller';
import { EconomicActivityRepository } from './economic-activity/economic-activity.repository';
import { EconomicActivity } from './entities/economic-activity.entity';
import { CompanyEconomicActivityRiskService } from './company-economic-activity-risk/company-economic-activity-risk.service';
import { CompanyEconomicActivityRiskController } from './company-economic-activity-risk/company-economic-activity-risk.controller';
import { CompanyEconomicActivityRiskRepository } from './company-economic-activity-risk/company-economic-activity-risk.repository';
import { CompanyEconomicActivityRisk } from './entities/company-economic-activity-risk.entity';
import { AccountTypeRepository } from './account-type/accoun-type.repository';
import { AssistanceTypeRepository } from './assistance-type/assistance-type.repository';
import { BankRepository } from './bank/bank.repository';
import { CityRepository } from './city/city.repository';
import { ContractRegimeRepository } from './contract-regime/contract-regime.repository';
import { ContributorSubTypeRepository } from './contributor-sub-type/contributor-sub-type.repository';
import { ContributorTypeRepository } from './contributor-type/contributor-type.repository';
import { CountryRepository } from './country/country.repository';
import { PaymentFrequencyRepository } from './payment-frequency/payment-frecuency.repository';
import { PaymentMethodRepository } from './payment-method/payment-mathod.repository';
import { SalaryTypeRepository } from './salary-type/salary-type.repository';
import { SpendingAccountRepository } from './spending-account/spending-account.repository';
import { StateRepository } from './state/state.repoistory';
import { WorkPlaceRiskRepository } from './work-place-risk/work-place-risk.repository';
import { SolidarityRepository } from './solidarity/solidarity.repository';
import { ReasonsContractTerminationService } from './reasons-contract-termination/reasons-contract-termination.service';
import { ResonsContractTerminationController } from './reasons-contract-termination/reasons-contract-termination.controller';
import { ReasonContractTermination } from './entities/reasonContractTerminination.entity';
import { ReasonsContractTerminationRepository } from './reasons-contract-termination/reasons-contract-termination.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountType,
      AssistanceType,
      Bank,
      City,
      ContractRegime,
      ContributorSubType,
      ContributorType,
      Country,
      State,
      PaymentFrequency,
      PaymentMethod,
      Solidarity,
      WorkPlaceRisk,
      SalaryType,
      WorkingHour,
      SpendingAccount,
      InformationOperator,
      EconomicActivity,
      CompanyEconomicActivityRisk,
      ReasonContractTermination,
    ]),
  ],
  providers: [
    AccountTypeService,
    AssistanceTypeService,
    BankService,
    CityService,
    ContractRegimeService,
    ContributorTypeService,
    ContributorSubTypeService,
    CountryService,
    EmbargoTypeService,
    IdentificationTypeService,
    MovementTypeService,
    PaymentFrequencyService,
    PaymentMethodService,
    SalaryTypeService,
    StateService,
    SolidarityService,
    WorkPlaceRisksService,
    WorkingHourService,
    SpendingAccountService,
    InformationOperatorService,
    ReasonsContractTerminationService,
    InformationOperatorRepository,
    EconomicActivityService,
    EconomicActivityRepository,
    CompanyEconomicActivityRiskService,
    CompanyEconomicActivityRiskRepository,
    AccountTypeRepository,
    AssistanceTypeRepository,
    BankRepository,
    CityRepository,
    ContractRegimeRepository,
    ContributorSubTypeRepository,
    ContributorTypeRepository,
    CountryRepository,
    PaymentFrequencyRepository,
    PaymentMethodRepository,
    SalaryTypeRepository,
    SpendingAccountRepository,
    StateRepository,
    WorkPlaceRiskRepository,
    SolidarityRepository,
    ReasonsContractTerminationRepository,
  ],
  controllers: [
    AssistanceTypeController,
    BankController,
    CityController,
    ContractRegimeController,
    ContributorTypeController,
    ContributorSubTypeController,
    CountryController,
    EmbargoTypeController,
    IdentificationTypeController,
    MovementTypeController,
    PaymentFrequencyController,
    PaymentMethodController,
    SalaryTypeController,
    AccountTypeController,
    StateController,
    SolidarityController,
    WorkPlaceRisksController,
    WorkingHourController,
    SpendingAccountController,
    InformationOperatorController,
    EconomicActivityController,
    CompanyEconomicActivityRiskController,
    ResonsContractTerminationController,
  ],
  exports: [SolidarityService],
})
export class SharedModule {}
