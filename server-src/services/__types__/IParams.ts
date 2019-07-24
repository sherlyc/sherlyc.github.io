import { Strap } from '../strap';
import { IRawArticle } from '../adapters/__types__/IRawArticle';

export interface IParams {
  apiRequestId: string;
  authorization?: string;
  strapArticlesCache?: { [key in Strap]?: IRawArticle[] };
}
