import * as config from '../../config.json';
import { IEnvironmentDefinition } from './__types__/IEnvironmentDefinition';

const defaultEnvironmentName = 'production';
const environmentName = process.env.SPADE_ENV || defaultEnvironmentName;

const environments = config as { [key: string]: IEnvironmentDefinition };
const environment: IEnvironmentDefinition =
  environments[environmentName] || environments['production'];

export default environment;
