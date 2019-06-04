import { HandlerInputType } from './HandlerInputType';

export interface IMidStripHandlerInput {
  type: HandlerInputType.MidStrip;
  strapName: string;
  totalArticles: number;
}
