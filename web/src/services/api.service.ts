import axios from "./http.service";
import { Country, CountryFull } from "../ts/interfaces/country.interface";

export default Object.freeze({
  public: {
    getCountries: () => axios.get<Country[]>("country"),
    getCountry: (countryCode: string) =>
      axios.get<CountryFull>(`country/${countryCode}`),
  },
});
