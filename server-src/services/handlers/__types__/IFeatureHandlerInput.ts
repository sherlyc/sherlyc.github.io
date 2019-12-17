import { HandlerInputType } from "./HandlerInputType";
import { HandlerInput } from "./HandlerInput";
import { FeatureName } from "../../../../common/FeatureName";

export interface IFeatureHandlerInput {
  type: HandlerInputType.Feature;
  name: FeatureName;
  content?: HandlerInput;
  fallback?: HandlerInput;
}
