

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

type HouseholdPageConfigsForCountry = {
  [Applicant.MAIN]: HouseholdPageConfig,
  [Applicant.CO]: HouseholdPageConfig,
};

interface HouseholdPageAllCountriesConfig {
  [COUNTRY.DK]: HouseholdPageConfig, 
  [COUNTRY.SE]: HouseholdPageConfigsForCountry,
}