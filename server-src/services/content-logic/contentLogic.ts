import { IRawArticle } from '../__types__/IRawArticle';
import ruleRegistry from './ruleRegistry';

export default (articleList: IRawArticle[]): IRawArticle[] =>
  Object.values(ruleRegistry).reduce(
    (articles, rule) => rule(articles),
    articleList
  );
