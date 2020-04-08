const config = require("../../config.json");
const strapConfiguration = require("../../strapConfig.json");
const featureProd = require("../../featuresConfig/features-prod.json");
const featureStaging = require("../../featuresConfig/features-staging.json");
const featureDev = require("../../featuresConfig/features-dev.json");
import { IFeaturesConfig } from "../__types__/IFeaturesConfig";
import { IEnvironmentDefinition } from "./__types__/IEnvironmentDefinition";
import { IStrapConfigDefinition } from "./__types__/IStrapConfigDefinition";

const productionEnvName = "production";
const environmentName: string = process.env.SPADE_ENV || productionEnvName;

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
  return featuresConfigs[environmentName] || featuresConfigs[productionEnvName];
};

const loadConfig = (): IEnvironmentDefinition => {
  const environments = config as {
    [key: string]: Partial<IEnvironmentDefinition>;
  };
  const environmentConfig =
    environments[environmentName] || environments[productionEnvName];
  environmentConfig.strapConfig = loadStrapConfig();
  environmentConfig.features = loadFeatures();
  return environmentConfig as IEnvironmentDefinition;
};

export default loadConfig();
