import { IRawArticle } from '../../interfaces/IRawArticle';
import { IContentBlock } from '../../interfaces/content-blocks/IContentBlock';
import layoutRegistry from './layoutRegistry';

export default (articleList: IRawArticle[]): IContentBlock[] => {
  return layoutRegistry['homepage'](articleList);
};
