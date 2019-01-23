import { IRawArticle } from '../../interfaces/IRawArticle';
import { IContentBlock } from '../../interfaces/content-blocks/IContentBlock';
import homepageLayout from './homepageLayout';

export default (articleList: IRawArticle[]): IContentBlock[] => {
  return homepageLayout(articleList);
};
