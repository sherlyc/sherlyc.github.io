import { FeatureName } from "../../../../common/FeatureName";
import { HandlerInput } from "./HandlerInput";
import { HandlerInputType } from "./HandlerInputType";

export interface IFeatureHandlerInput {
  type: HandlerInputType.Feature;
  name: FeatureName;
  content?: HandlerInput[];
  fallback?: HandlerInput[];
  suppressError?: boolean;
}
