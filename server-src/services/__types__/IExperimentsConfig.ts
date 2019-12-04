import { ISwitchConfig } from "./ISwitchConfig";
import { ExperimentName } from "../../../common/ExperimentName";

export type IExperimentsConfig = {
  [experiment in ExperimentName]?: {
    [variant: string]: ISwitchConfig;
  };
};
