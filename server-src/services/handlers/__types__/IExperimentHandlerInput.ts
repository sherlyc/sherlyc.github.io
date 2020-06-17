import { HandlerInput } from "./HandlerInput";
import { HandlerInputType } from "./HandlerInputType";

export interface IExperimentHandlerInput {
  type: HandlerInputType.Experiment;
  name: string;
  variants: {
    control: HandlerInput;
    [key: string]: HandlerInput;
  };
}
