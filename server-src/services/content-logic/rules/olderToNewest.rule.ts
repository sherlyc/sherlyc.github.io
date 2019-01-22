import { IRawArticle } from '../../../interfaces/IRawArticle';

export default (articleList: IRawArticle[]): IRawArticle[] => {
  return articleList.sort(
    (article1: IRawArticle, article2: IRawArticle) =>
      article1.displayTime - article2.displayTime
  );
};
