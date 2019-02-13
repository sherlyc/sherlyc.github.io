import { IRawArticle } from '../__types__/IRawArticle';
import { IContentBlock } from '../../../common/__types__/IContentBlock';
import layoutRegistry from './layout-registry';

export default (articleList: IRawArticle[]): IContentBlock[] => {
  return [
    { type: 'Header' },
    { type: 'Container', items: layoutRegistry['homepage'](articleList) },
    { type: 'Footer' }
  ];
};
