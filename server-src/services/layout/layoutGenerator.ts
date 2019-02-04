import { IRawArticle } from '../__types__/IRawArticle';
import { IContentBlock } from '../../../common/__types__/IContentBlock';
import layoutRegistry from './layoutRegistry';

export default (articleList: IRawArticle[]): IContentBlock[] => {
  return layoutRegistry['homepage'](articleList);
};
