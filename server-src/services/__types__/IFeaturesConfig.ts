import { ISwitchConfig } from './ISwitchConfig';

export interface IFeaturesConfig {
  [featureName: string]: ISwitchConfig;
}
