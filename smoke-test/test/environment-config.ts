import * as dotenv from 'dotenv';
dotenv.config();

interface IEnvironmentConfig {
  url: string;
  username: string;
  password: string;
}

export default {
  url: process.env.URL || 'http://expfrontend:4000/',
  username: process.env.PREPROD_USER_NAME || '',
  password: process.env.PREPROD_PASSWORD || ''
} as IEnvironmentConfig;
