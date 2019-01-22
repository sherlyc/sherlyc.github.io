import { IEnvironmentDefinition } from '../interfaces/IEnvironmentDefinition';
import * as config from '../config.json';

const defaultEnvironmentName = 'development';
const environmentName = process.env.SPADE_ENV || defaultEnvironmentName;

const environments: { [key: string]: IEnvironmentDefinition } = config;
const environment: IEnvironmentDefinition =
  environments[environmentName] || environments['development'];

export default environment;
