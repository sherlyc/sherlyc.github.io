import { DeviceType } from "../../../common/DeviceType";

export interface ISwitchConfig {
  devices?: DeviceType[];
  public: {
    min: number;
    max: number;
  };
  internal: number;
}
