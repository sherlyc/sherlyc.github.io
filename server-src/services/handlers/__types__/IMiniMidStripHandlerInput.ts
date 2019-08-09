import { HandlerInputType } from './HandlerInputType';
import { Strap } from '../../strap';

export interface IMiniMidStripHandlerInput {
  type: HandlerInputType.MiniMidStrip;
  sourceId: Strap.MiniMidStrip;
  strapName: string;
  totalArticles?: number;
}
