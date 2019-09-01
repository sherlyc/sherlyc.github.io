import { DeviceType } from '../../../common/DeviceType';

export interface IExperimentsConfig {
  [experiment: string]: {
    [variant: string]: IExperimentVariantConfig;
  };
}

export interface IExperimentVariantConfig {
  devices?: DeviceType[];
  public: {
    min: number;
    max: number;
  };
  internal: number;
}
