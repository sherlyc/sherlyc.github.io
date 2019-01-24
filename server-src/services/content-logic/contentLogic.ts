import { IRawArticle } from '../../interfaces/IRawArticle';
import ruleRegistry from './ruleRegistry';

export default (articleList: IRawArticle[]): IRawArticle[] =>
  Object.values(ruleRegistry).reduce(
    (articles, rule) => rule(articles),
    articleList
  );
