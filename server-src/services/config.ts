import * as config from '../config.json';
import { ILoggerOptions } from '../../common/__types__/ILoggerOptions';

export interface IEnvironmentDefinition {
  retryTimeout: number;
  requestTimeout: number;
  jsonFeedAPI: string;
  maxArticlesToRetrieve: number;
  loggerOptions: ILoggerOptions;
}

const defaultEnvironmentName = 'production';
const environmentName = process.env.SPADE_ENV || defaultEnvironmentName;

const environments: { [key: string]: IEnvironmentDefinition } = config;
const environment: IEnvironmentDefinition =
  environments[environmentName] || environments['production'];

export default environment;
