import * as config from '../../config.json';
import * as strapConfig from '../../strapConfig.json';
import { IEnvironmentDefinition } from './__types__/IEnvironmentDefinition';
import { IStrapConfigDefinition } from './__types__/IStrapConfigDefinition';

const defaultEnvironmentName = 'production';
const environmentName = process.env.SPADE_ENV || defaultEnvironmentName;

const environments = config as { [key: string]: IEnvironmentDefinition };
const environment: IEnvironmentDefinition =
  environments[environmentName] || environments['production'];

environment.strapConfig = strapConfig as IStrapConfigDefinition;

export default environment;
