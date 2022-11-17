export enum COUNTRY_CODE_ISO {
  CANADA = 'CAN',
  'UNITED STATES' = 'USA',
}

export const getCountryCodeIso = (country: string) => {
  switch (country.toUpperCase()) {
    case 'UNITED STATES':
      return COUNTRY_CODE_ISO['UNITED STATES']
    case 'CANADA':
      return COUNTRY_CODE_ISO.CANADA
    default:
      return COUNTRY_CODE_ISO['UNITED STATES']
  }
}
