import { COUNTRY } from '@nordea-web/core'
import { HouseholdPageAllCountriesConfig, HouseholdPageConfigs, HouseholdPageConfig } from '_/models'
import { Applicant, Employment, HousingType } from '_/enums'

export const householdPageConfigs: HouseholdPageAllCountriesConfig = {
    [COUNTRY.DK]: {},
    [COUNTRY.SE]: {
        [Applicant.MAIN]: [
            sectionIncome: {
                employmentType: {
                    options: [
                        Employment.EMPLOYEE,
                        Employment.INDEPENDENT_WORKER,
                        Employment.PENSIONER,
                        Employment.STUDENT,
                        Employment.UNEMPLOYED,
                        Employment.OTHER,
                    ],
                },
                grossMonthlyEarnings: true,
            },
            sectionHousehold: {
                housingType: {
                    options: [
                        HousingType.OWN_HOUSE,
                        HousingType.CONDO,
                        HousingType.RENTED_ACCOMMODATION,
                        HousingType.OTHER,
                    ],
                },
                numberOfAdults: {
                    defaultValue: 1,
                    min: 1,
                    max: 10,
                },
                numberOfChildren: {
                    defaultValue: 0,
                    min: 0,
                    max: 10,
                },
            },
        ],
        [Applicant.CO]: [
            sectionIncome: {
                employmentType: {
                    options: [
                        Employment.EMPLOYEE,
                        Employment.INDEPENDENT_WORKER,
                        Employment.PENSIONER,
                        Employment.STUDENT,
                        Employment.UNEMPLOYED,
                        Employment.OTHER,
                    ],
                },
                grossMonthlyEarnings: true,
            },
            sectionHousehold: {
                housingType: {
                    options: [
                        HousingType.OWN_HOUSE,
                        HousingType.CONDO,
                        HousingType.RENTED_ACCOMMODATION,
                        HousingType.OTHER,
                    ],
                },
                numberOfAdults: {
                    defaultValue: 1,
                    min: 1,
                    max: 10,
                },
                numberOfChildren: {
                    defaultValue: 0,
                    min: 0,
                    max: 10,
                },
            },
        ]
    },
}