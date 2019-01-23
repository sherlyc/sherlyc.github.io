import { IRawArticleList } from '../../interfaces/IRawArticleList';
import { IRawArticle } from '../../interfaces/IRawArticle';
import { IContentRule } from '../../interfaces/IContentRule';
import loadRules from './rulesLoader';

export default (articleList: IRawArticleList): IRawArticle[] => {
  let articles: IRawArticle[] = Object.values(articleList);
  Object.values(loadRules()).forEach((rule: IContentRule) => {
    articles = rule(articles);
  });

  return articles;
};
