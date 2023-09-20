import { COUNTRY } from '@nordea-web/core';
import { NwccIconType } from '@nordea-web/ui';
import {
  Applicant,
  ApplicationStatus,
  Country,
  Employment,
  HousingType,
  InterestRateType,
  MotorType,
  NavigationSteps,
  ResidencePermit,
  VAP,
  VehicleType,
  PEPFieldType,
  PEPReason as PEPReason,
  pledgeFeeType,
} from '_/enums';

export type SupportedCountry = typeof COUNTRY.DK | typeof COUNTRY.SE;

export type Configs = Record<SupportedCountry, Config>;

export interface Config {
  constants: {
    currency: string;
    fees: FeesUnion;
    receivedApplicationStatusAndNextStepsLists: ApplicationStatusAndNextStepsListsUnion;
    idleTime: number;
    timeoutTime: number;
  };
  defaults: {
    personalInfo: PersonalInfo;
    coApplicantInfo: CoApplicantInfo;
    mainApplicantInfo: MainApplicantInfo;
    householdInfo: HouseholdInfo;
    personalInfoPopulated: PersonalInfoPopulated;
    coApplicantLoanInfo: CoApplicantLoanInfo;
  };
  calculatorConfig: CalculationConfig;
  navigationStepsConfigs: NavigationStepsConfigs;
  consentPageConfig: ConsentPageConfig;
  loanCalculatorPageConfig: LoanCalculatorPageConfig;
  householdPageConfig?: HouseholdPageConfig;
  kycPageConfig?: KYCPageConfig;
  applicationReceivedConfig?: ApplicationReceivedConfig;
}

export interface LoanCalculations {
  loanAmount: number;
  totalCostFinanced: number;
  monthlyPayment: number;
  totalPayment: number;
  APR: number;
}

export interface LoanInfo extends LoanCalculations {
  downPayment: number;
  interestRate: number;
  interestRateType: InterestRateType;
  loanTermMonths: number;
  motorType: MotorType;
  vehiclePrice: number;
  vehicleType: VehicleType;
}

export interface LoanInfoDraft {
  loanAmountDraft: number;
  totalCostFinancedDraft: number;
  monthlyPaymentDraft: number;
  APRDraft: number;
  vehicleTypeDraft: VehicleType;
  motorTypeDraft: MotorType;
  vehiclePriceDraft: number;
  downPaymentDraft: number;
  loanTermMonthsDraft: number;
  interestRateDraft: number;
  interestRateTypeDraft: InterestRateType;
}

export interface LoanTermOption {
  months: number;
  monthlyPayment?: number;
}

export interface LoanCalculatorState extends LoanInfo {
  loanTermOptions: LoanTermOption[];
}

export interface InterestRate {
  type: InterestRateType;
  value: number;
}

export type LoanCalculatorPageAllCountriesConfig = Record<
  SupportedCountry,
  LoanCalculatorPageConfig
>;

export interface LoanCalculatorPageConfig {
  uiContent: LoanCalculatorPageUIElements;
  calculatorUIConfig: LoanCalculatorUIAllVehicleTypesConfigs;
  calculatorUIDefaults: {
    motorType: MotorType;
    vehicleType: VehicleType;
  };
}

export type LoanCalculatorPageUIElements = {
  loanCalculator: LoanCalculatorUIContentConfig;
  loanInfoBox: LoanInfoBoxConfig;
};

export type LoanCalculatorUIAllVehicleTypesConfigs = Partial<
  Record<VehicleType, LoanCalculatorUIAllMotorTypesConfigs>
>;

export type LoanCalculatorUIAllMotorTypesConfigs = Partial<
  Record<MotorType, LoanCalculatorUIConfig>
>;

export interface LoanCalculatorUIConfig {
  config: {
    downPaymentPercentMin: number;
    downPaymentStepSize: number;
    interestRates: InterestRatesGroup;
    loanTermMax: number;
    loanTermMin: number;
    loanTermOptions: number[];
    priceMax: number;
    priceMin: number;
    priceStepSize: number;
  };
  defaults: {
    downPayment: number;
    interestRateType: InterestRateType;
    loanTermMonths: number;
    vehiclePrice: number;
  };
}

export interface LoanCalculatorUIContentConfig {
  subHeadline?: string;
  loanCalculatorTitle?: string;
}

export interface LoanInfoBoxConfig {
  decimals: number;
  showTotalCostFinanced: boolean;
  showAPR: boolean;
}

export type ConsentPageAllCountriesConfig = Record<
  SupportedCountry,
  ConsentPageConfig
>;

export interface ConsentPageConfig {
  sectionMain: {
    headlineLabel?: string;
    subHeadlineLabel?: string;
  };
  sectionCheckboxes: {
    checkboxes: Array<ConsentCheckbox>;
  };
}

export type ConsentCheckbox = {
  key: string;
  label: string;
  required: boolean;
  showMore?: string;
  value?: boolean;
  error?: boolean;
};

export type HouseholdPageAllCountriesConfig = Record<
  SupportedCountry,
  HouseholdPageConfig
>;

export interface HouseholdPageConfig {
  sectionIncome?: {
    employmentType?: {
      options: Array<Employment>;
      defaultValue?: Employment;
    };
    grossMonthlyEarnings?: boolean;
  };
  sectionHousehold?: {
    housingType?: {
      options: Array<HousingType>;
      defaultValue?: HousingType;
    };
    numberOfAdults?: {
      defaultValue?: number;
      min: number;
      max: number;
    };
    numberOfChildren?: {
      defaultValue?: number;
      min: number;
      max: number;
    };
  };
}

export type KYCPageAllCountriesConfig = Record<SupportedCountry, KYCPageConfig>;

export interface KYCPageConfig {
  sectionOther?: {
    residencePermitType?: {
      options: Array<ResidencePermit>;
      defaultValue?: ResidencePermit;
    };
    countryOfBirth?: {
      options: Array<Country>;
      defaultValue?: Country;
    };
    citizenships?: CountryConfigField;
    taxationCountries?: CountryConfigField;
    // only tell if the form field should exist or not
    mainBank?: boolean;
  };
  sectionPEP?: {
    pep?: {
      type: PEPFieldType;
      defaultValue?: boolean;
      // configuration for additional select field if FieldType is EXTENDED
      whyPep?: {
        options: Array<PEPReason>;
        defaultValue?: PEPReason;
      };
    };
  };
}

export interface CountryConfigField {
  maxEntries?: number;
  options: Array<Country>;
  defaultValue?: Country;
}

/* TODO: change this to Partial<Record> as it might happen that some
configurations won't have all interest rate types */
export type InterestRatesGroup = {
  [InterestRateType.VARIABLE]: number;
  [InterestRateType.FIXED]?: number;
};

export interface Fees {
  [COUNTRY.DK]: FeesUnion;
  [COUNTRY.SE]: FeesUnion;
}

export interface FeesUnion {
  vap: {
    [VAP.INSURANCE]?: number;
    [VAP.ESTABLISHMENT]: number;
  };
  invoiceMonthly: number;
  pledge?: PledgeFees;
}

export interface PledgeFees {
  [pledgeFeeType.FIXED_AMOUNT]: number;
  [pledgeFeeType.VARIABLE_RATE]: number;
}

export interface CalculationConfigs {
  [COUNTRY.DK]: CalculationConfig;
  [COUNTRY.SE]: CalculationConfig;
}

export interface CalculationConfig {
  areFeesFinanced: boolean;
}

export interface PledgeRatesDK {
  amount: number;
  fee: number;
}

export interface PersonalInfoPopulated {
  cpr: string;
}

export interface PersonalInfo {
  ssn: string;
  email: string;
  residencePermitType: ResidencePermit | '';
  phoneNumber: string;
  mainBank: string;
  name: string;
  citizenships: (Country | '')[];
  countryOfBirth: Country | '';
  taxationCountries: (Country | '')[];
  isPEP?: boolean;
  pepReason?: PEPReason | '';
}

export interface CoApplicantInfo {
  coApplicantExists: string;
  cpr: string;
  phoneNumber: string;
  email: string;
  name: string;
}

export interface MainApplicantInfo {
  cpr: string;
  phoneNumber: string;
  email: string;
}

export interface CoApplicantLoanInfo {
  mainApplicant: string;
  coApplicant: string;
}

export interface HouseholdInfo {
  housingType: HousingType | '';
  numberOfAdults?: number;
  numberOfChildren?: number;
  employmentType: Employment | '';
  grossMonthlyEarnings?: number;
}

export interface Applications {
  [Applicant.MAIN]: ApplicationsList;
  [Applicant.CO]: ApplicationsList;
}

export type ApplicationsList = ApplicationData[];

export interface ExternalServiceURLs {
  monthioMainApplicant?: string;
  monthioCoApplicant?: string;
}

export interface ApplicationData {
  applicationId: string;
  status: ApplicationStatus;
  quote: LoanInfo;
  applicant: PersonalInfo;
  mainApplicant?: MainApplicantInfo;
  coApplicant?: CoApplicantInfo;
  household?: HouseholdInfo;
  externalServiceURLs?: ExternalServiceURLs;
}

export interface Quote {
  vehiclePrice: number;
  downPayment: number; // TODO not sure amount or percentage
  interestRate: InterestRate; // holds the interest rate name/type (fixed vs variable) and the value(%)
  termMonths: number; // final choice of loan term (months)
}

export interface ApplicationStatusListItem {
  isFinished: boolean;
  icon: NwccIconType;
  text: string;
}

export type ApplicationStatusList = ApplicationStatusListItem[];

export type ApplicationNextStepsList = string[];

export interface ApplicationStatusAndNextStepsListsEntry {
  statusList: ApplicationStatusList;
  nextStepsList: ApplicationNextStepsList;
}

export interface ApplicationStatusAndNextStepsLists {
  [COUNTRY.DK]: ApplicationStatusAndNextStepsListsDK;
  [COUNTRY.SE]: ApplicationStatusAndNextStepsListsSE;
}

export type ApplicationStatusAndNextStepsListsUnion =
  ApplicationStatusAndNextStepsListsDK;

export interface ApplicationStatusAndNextStepsListsDK {
  withoutCoApplicant: {
    waitingForMonthio: ApplicationStatusAndNextStepsListsEntry;
    processing: ApplicationStatusAndNextStepsListsEntry;
  };
  withCoApplicant: {
    asMainApplicant: {
      waitingForCoApplicant: ApplicationStatusAndNextStepsListsEntry;
      waitingForCoApplicantMonthio: ApplicationStatusAndNextStepsListsEntry;
      waitingForMainApplicantMonthio: ApplicationStatusAndNextStepsListsEntry;
      processing: ApplicationStatusAndNextStepsListsEntry;
    };
    asCoApplicant: {
      waitingForCoApplicantMonthio: ApplicationStatusAndNextStepsListsEntry;
      waitingForMainApplicantMonthio: ApplicationStatusAndNextStepsListsEntry;
      processing: ApplicationStatusAndNextStepsListsEntry;
    };
  };
}

export interface ApplicationStatusAndNextStepsListsSE {
  withoutCoApplicant: {
    processing: ApplicationStatusAndNextStepsListsEntry;
  };
  withCoApplicant: {
    asMainApplicant: {
      waitingForCoApplicant: ApplicationStatusAndNextStepsListsEntry;
      processing: ApplicationStatusAndNextStepsListsEntry;
    };
    asCoApplicant: {
      processing: ApplicationStatusAndNextStepsListsEntry;
    };
  };
}

export type ApplicationReceivedAllCountriesConfig = Record<
  SupportedCountry,
  ApplicationReceivedConfig
>;

export interface ApplicationReceivedConfig {
  isCoApplicant: Record<PropertyKey, unknown>; // for conditonally displaying content to co-and main applicants
  isMainApplicant: Record<PropertyKey, unknown>; // type properly when these are needed
  component: {
    ui: ApplicationReceivedComponentUiConfig;
  };
}

export interface ApplicationReceivedComponentUiConfig {
  greetingFromNordea?: string;
  // etc. conditional, general, content
}

export type CitizenshipAllCountriesDefaults = Record<
  SupportedCountry,
  Country | undefined
>;

export type TaxationCountryAllCountriesDefaults = Record<
  SupportedCountry,
  Country | undefined
>;

export type CurrencyAllCountriesConstants = Record<SupportedCountry, string>;

export type NavigationStepsAllCountriesConfig = Record<
  SupportedCountry,
  NavigationStepsConfigs
>;

export type NavigationStepsConfigs = Record<Applicant, NavigationStepsConfig>;

export type NavigationStepsConfig = Array<NavigationSteps>;
