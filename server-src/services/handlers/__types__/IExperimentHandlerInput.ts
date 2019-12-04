import { HandlerInputType } from "./HandlerInputType";
import { HandlerInput } from "./HandlerInput";

export interface IExperimentHandlerInput {
  type: HandlerInputType.Experiment;
  name: string;
  variants: {
    control: HandlerInput;
    [key: string]: HandlerInput;
  };
}
