import { FeatureName } from "../../../common/FeatureName";
import { ISwitchConfig } from "./ISwitchConfig";

export type IFeaturesConfig = { [key in FeatureName]: ISwitchConfig };
