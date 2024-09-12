import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Country, CountryFull } from './interfaces/country.interface';
import { firstValueFrom, map } from 'rxjs';
import {
  FlagResponse,
  PopulationResponse,
} from './interfaces/response.interface';
import { HttpStatusCode } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class CountryService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async findAll(): Promise<Country[]> {
    return firstValueFrom(
      this.httpService
        .get<Country[]>(this.configService.get('countryApi.countriesUrl'))
        .pipe(map((response) => response.data)),
    );
  }

  async findOne(countryCode: string): Promise<CountryFull> {
    let data: Omit<CountryFull, 'populationCounts' | 'flag'>;

    try {
      data = await firstValueFrom(
        this.httpService
          .get<Omit<CountryFull, 'populationCounts' | 'flag'>>(
            `${this.configService.get('countryApi.countryUrl')}/${countryCode}`,
          )
          .pipe(map((response) => response.data)),
      );
    } catch (e) {
      if (e.status === HttpStatusCode.NotFound) {
        throw new NotFoundException(e.message);
      }
    }

    const { flag, iso3 } = await firstValueFrom(
      this.httpService
        .get<FlagResponse>(
          `${this.configService.get(
            'countryApi.flagUrl',
          )}/q?iso2=${countryCode}`,
        )
        .pipe(map((response) => response.data.data)),
    );

    const populationCounts = await firstValueFrom(
      this.httpService
        .get<PopulationResponse>(
          `${this.configService.get(
            'countryApi.populationUrl',
          )}/q?iso3=${iso3}`,
        )
        .pipe(map((response) => response.data.data.populationCounts)),
    );

    return { ...data, populationCounts, flag };
  }
}
