import * as config from '../config.json';
import { ILoggerOptions } from '../../common/__types__/ILoggerOptions';
import { IEnvironmentDefinition } from './__types__/IEnvironmentDefinition';

const defaultEnvironmentName = 'production';
const environmentName = process.env.SPADE_ENV || defaultEnvironmentName;

const environments: { [key: string]: IEnvironmentDefinition } = config;
const environment: IEnvironmentDefinition =
  environments[environmentName] || environments['production'];

export default environment;
