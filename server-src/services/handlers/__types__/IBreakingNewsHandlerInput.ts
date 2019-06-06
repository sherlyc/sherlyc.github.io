import { HandlerInputType } from './HandlerInputType';

export interface IBreakingNewsHandlerInput {
  type: HandlerInputType.BreakingNews;
  variant: 'purpleHeadline' | 'orangeHeadline' | 'control';
}
