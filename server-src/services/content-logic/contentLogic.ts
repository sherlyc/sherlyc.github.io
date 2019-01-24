import { IRawArticle } from '../../interfaces/IRawArticle';
import { IContentRule } from '../../interfaces/IContentRule';
import ruleRegistry from './ruleRegistry';

export default (articleList: IRawArticle[]): IRawArticle[] => {
  let articles: IRawArticle[] = articleList;
  Object.values(ruleRegistry).forEach((rule: IContentRule) => {
    articles = rule(articles);
  });

  return articles;
};
