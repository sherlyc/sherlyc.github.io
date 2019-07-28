import { HandlerInputType } from './HandlerInputType';
import { ListAsset } from '../../listAsset';
import { Strap } from '../../strap';

export interface IMiniMidStripHandlerInput {
  type: HandlerInputType.MiniMidStrip;
  sourceId: ListAsset.MiniMidStrip | Strap.MiniMidStrip;
  strapName: string;
  totalArticles?: number;
}
