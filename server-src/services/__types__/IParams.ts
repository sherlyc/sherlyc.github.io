import { Strap } from '../strap';
import { IRawArticle } from '../adapters/__types__/IRawArticle';

export interface IParams {
  apiRequestId: string;
  authorization?: string;
  cache?: { [key in Strap]?: IRawArticle[] };
}
