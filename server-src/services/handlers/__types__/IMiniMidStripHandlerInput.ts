import { HandlerInputType } from './HandlerInputType';

export interface IMiniMidStripHandlerInput {
  type: HandlerInputType.MiniMidStrip;
  strapName: string;
  totalArticles?: number;
}
