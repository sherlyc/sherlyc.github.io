import { ExperimentName } from "../../../common/ExperimentName";
import { ISwitchConfig } from "./ISwitchConfig";

export type IExperimentsConfig = {
  [experiment in ExperimentName]?: {
    [variant: string]: ISwitchConfig;
  };
};
