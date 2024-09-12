import { registerAs } from '@nestjs/config';

export default registerAs('countryApi', () => ({
  countriesUrl: 'https://date.nager.at/api/v3/AvailableCountries',
  countryUrl: 'https://date.nager.at/api/v3/CountryInfo',
  populationUrl: 'https://countriesnow.space/api/v0.1/countries/population',
  flagUrl: 'https://countriesnow.space/api/v0.1/countries/flag/images',
}));
