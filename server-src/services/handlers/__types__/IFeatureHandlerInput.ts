import { HandlerInputType } from './HandlerInputType';
import { HandlerInput } from './HandlerInput';
import { Features } from '../../../../common/Features';

export interface IFeatureHandlerInput {
  type: HandlerInputType.Feature;
  name: Features;
  toggle: HandlerInput;
}
