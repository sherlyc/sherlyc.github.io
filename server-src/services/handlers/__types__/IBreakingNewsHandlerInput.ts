import { HandlerInputType } from './HandlerInputType';

export interface IBreakingNewsHandlerInput {
  type: HandlerInputType.BreakingNews;
  ignoreBreakingNews?: string;
  variant: 'purpleBackground' | 'orangeBackground' | 'control';
}
