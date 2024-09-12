import { Module } from '@nestjs/common';
import CountryModule from './routes/country/country.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import countryApiConfig from './config/country-api.config';

@Module({
  imports: [
    CountryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, countryApiConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
