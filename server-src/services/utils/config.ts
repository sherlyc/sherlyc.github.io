import * as config from '../../config.json';
import * as strapConfiguration from '../../strapConfig.json';
import { IEnvironmentDefinition } from './__types__/IEnvironmentDefinition';
import { IStrapConfigDefinition } from './__types__/IStrapConfigDefinition';
import { Omit } from 'utility-types';

const environmentName: string = process.env.SPADE_ENV || 'production';

const loadStrapConfig = (): IStrapConfigDefinition => {
  const strapConfig = strapConfiguration as IStrapConfigDefinition;
  if (strapConfig.overrides && strapConfig.overrides![environmentName]) {
    strapConfig.homepageStraps = { ...strapConfig.homepageStraps, ...strapConfig.overrides![environmentName] };
  }
  return strapConfig;
};

const loadConfig = (): IEnvironmentDefinition => {
  const environments = config as {
    [key: string]: Omit<IEnvironmentDefinition, 'strapConfig'>;
  };
  const environmentConfig = environments[environmentName] || environments['production'];
  (environmentConfig as IEnvironmentDefinition).strapConfig = loadStrapConfig();
  return environmentConfig as IEnvironmentDefinition;
};

export default loadConfig();
