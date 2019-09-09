import { ISwitchConfig } from './ISwitchConfig';

export interface IExperimentsConfig {
  [experiment: string]: {
    [variant: string]: ISwitchConfig;
  };
}
