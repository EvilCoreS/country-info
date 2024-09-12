import { Controller, Get, Param } from '@nestjs/common';
import CountryService from './country.service';

@Controller('country')
export default class CountryController {
  constructor(private countryService: CountryService) {}

  @Get()
  findAll() {
    return this.countryService.findAll();
  }

  @Get(':countryCode')
  findOne(@Param('countryCode') countryCode: string) {
    return this.countryService.findOne(countryCode);
  }
}
