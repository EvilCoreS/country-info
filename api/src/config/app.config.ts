import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.APP_PORT || 3000,
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  env: process.env.NODE_ENV || 'dev',
  isProduction: process.env.NODE_ENV === 'production',
}));
