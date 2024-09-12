export interface PopulationCount {
  year: number;
  value: number;
}

export interface PopulationResponse {
  error: boolean;
  msg: string;
  data: {
    country: string;
    code: string;
    iso3: string;
    populationCounts: PopulationCount[];
  };
}

export interface FlagResponse {
  error: boolean;
  msg: string;
  data: {
    name: string;
    flag: string;
    iso2: string;
    iso3: string;
  };
}
