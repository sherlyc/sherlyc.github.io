import * as config from '../../config.json';
import * as strapConfiguration from '../../strapConfig.json';
import * as featureProd from '../../featuresConfig/features-prod.json';
import * as featureStaging from '../../featuresConfig/features-staging.json';
import * as featureDev from '../../featuresConfig/features-dev.json';
import { IEnvironmentDefinition } from './__types__/IEnvironmentDefinition';
import { IStrapConfigDefinition } from './__types__/IStrapConfigDefinition';
import { IFeaturesConfig } from '../__types__/IFeaturesConfig';

const environmentName: string = process.env.SPADE_ENV || 'production';

const loadStrapConfig = (): IStrapConfigDefinition => {
  const strapConfig = strapConfiguration as IStrapConfigDefinition;
  if (strapConfig.overrides && strapConfig.overrides[environmentName]) {
    strapConfig.homepageStraps = {
      ...strapConfig.homepageStraps,
      ...strapConfig.overrides![environmentName]
    };
  }
  return strapConfig;
};

const featuresConfigs: { [key: string]: IFeaturesConfig } = {
  production: featureProd,
  staging: featureStaging,
  development: featureDev,
  localhost: featureDev
};

const loadFeatures = (): IFeaturesConfig => {
  return featuresConfigs[environmentName] || featuresConfigs['production'];
};

const loadConfig = (): IEnvironmentDefinition => {
  const environments = config as {
    [key: string]: Partial<IEnvironmentDefinition>;
  };
  const environmentConfig =
    environments[environmentName] || environments['production'];
  environmentConfig.strapConfig = loadStrapConfig();
  environmentConfig.features = loadFeatures();
  return environmentConfig as IEnvironmentDefinition;
};

export default loadConfig();
