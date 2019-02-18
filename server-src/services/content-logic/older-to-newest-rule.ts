import { IRawArticle } from '../__types__/IRawArticle';

export default (articleList: IRawArticle[]): IRawArticle[] => {
  return articleList
    .slice()
    .sort(
      (article1: IRawArticle, article2: IRawArticle) =>
        article1.lastPublishedTime - article2.lastPublishedTime
    );
};