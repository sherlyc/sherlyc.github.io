import { IEnvironmentDefinition } from './__types__/IEnvironmentDefinition';
import * as config from '../config.json';

const defaultEnvironmentName = 'production';
const environmentName = process.env.SPADE_ENV || defaultEnvironmentName;

const environments: { [key: string]: IEnvironmentDefinition } = config;
const environment: IEnvironmentDefinition =
  environments[environmentName] || environments['production'];

export default environment;
