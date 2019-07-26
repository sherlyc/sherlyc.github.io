import * as config from '../../config.json';
import * as strapConfig from '../../strapConfig.json';
import { IEnvironmentDefinition } from './__types__/IEnvironmentDefinition';
import { IStrapConfigDefinition } from './__types__/IStrapConfigDefinition';
import { Omit } from 'utility-types';

const defaultEnvironmentName = 'production';
const environmentName = process.env.SPADE_ENV || defaultEnvironmentName;

const environments = config as {
  [key: string]: Omit<IEnvironmentDefinition, 'strapConfig'>;
};
const environment = environments[environmentName] || environments['production'];

(environment as IEnvironmentDefinition).strapConfig = strapConfig as IStrapConfigDefinition;

export default environment as IEnvironmentDefinition;
