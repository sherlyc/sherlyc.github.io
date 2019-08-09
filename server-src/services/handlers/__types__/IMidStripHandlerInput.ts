import { HandlerInputType } from './HandlerInputType';
import { ListAsset } from '../../listAsset';
import { Strap } from '../../strap';

export interface IMidStripHandlerInput {
  type: HandlerInputType.MidStrip;
  sourceId: Strap.MidStrip;
  strapName: string;
  totalArticles?: number;
}
