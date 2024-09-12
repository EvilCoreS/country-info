export interface Country {
  countryCode: string;
  name: string;
}

export interface CountryFull {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: NestedCountry[];
  populationCounts: PopulationCount[];
  flag: string;
}

export interface NestedCountry {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: null;
}

export interface PopulationCount {
  year: number;
  value: number;
}
