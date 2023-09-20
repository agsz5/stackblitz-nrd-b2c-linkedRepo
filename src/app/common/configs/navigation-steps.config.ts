import { COUNTRY } from '@nordea-web/core'
import { Applicant, NavigationSteps } from '_/enums'
import { NavigationStepsAllCountriesConfig } from '_/models'

/**
 * Config for navigation steps of the application form
 * The order of the items in the array is the order in which the steps should go
 */

export const navigationStepsConfigs: NavigationStepsAllCountriesConfig = {
    [COUNTRY.DK]: {
        [Applicant.MAIN]: [
            NavigationSteps.PERSONAL_INFO,
            NavigationSteps.KYC,
            NavigationSteps.CO_APPLICANT,
            NavigationSteps.SUMMARY,
        ],
        [Applicant.CO]: [
            NavigationSteps.PERSONAL_INFO,
            NavigationSteps.KYC,
            NavigationSteps.SUMMARY,
        ],
    },
    [COUNTRY.SE]: {
        [Applicant.MAIN]: [
            NavigationSteps.PERSONAL_INFO,
            NavigationSteps.HOUSEHOLD,
            NavigationSteps.KYC,
            NavigationSteps.CO_APPLICANT,
            NavigationSteps.SUMMARY,
        ],
        [Applicant.CO]: [
            NavigationSteps.PERSONAL_INFO,
            NavigationSteps.HOUSEHOLD,
            NavigationSteps.KYC,
            NavigationSteps.SUMMARY,
        ],
    },
}
