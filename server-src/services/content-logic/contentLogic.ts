import { IRawArticleList } from '../../interfaces/IRawArticleList';
import { IRawArticle } from '../../interfaces/IRawArticle';
import { IContentRule } from '../../interfaces/IContentRule';
import olderToNewest from './rules/olderToNewest.rule';

const availableRules: Map<string, IContentRule> = new Map();
availableRules.set('olderToNewest', olderToNewest);

export default (articleList: IRawArticleList): IRawArticle[] => {
  const articles: IRawArticle[] = Object.values(articleList);

  const rule: IContentRule = availableRules.get(
    'olderToNewest'
  ) as IContentRule;

  return rule(articles);
};
