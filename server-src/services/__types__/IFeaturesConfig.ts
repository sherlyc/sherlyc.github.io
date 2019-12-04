import { ISwitchConfig } from "./ISwitchConfig";
import { FeatureName } from "../../../common/FeatureName";

export type IFeaturesConfig = { [key in FeatureName]: ISwitchConfig };
