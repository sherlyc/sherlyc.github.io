import { IRawArticle } from '../../interfaces/IRawArticle';
import { IContentRule } from '../../interfaces/IContentRule';
import loadRules from './rulesLoader';

export default (articleList: IRawArticle[]): IRawArticle[] => {
  let articles: IRawArticle[] = articleList;
  Object.values(loadRules()).forEach((rule: IContentRule) => {
    articles = rule(articles);
  });

  return articles;
};
