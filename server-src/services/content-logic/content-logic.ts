import { IRawArticle } from '../__types__/IRawArticle';
import ruleRegistry from './rule-registry';

export default (articleList: IRawArticle[]): IRawArticle[] =>
  Object.values(ruleRegistry).reduce(
    (articles, rule) => rule(articles),
    articleList
  );
