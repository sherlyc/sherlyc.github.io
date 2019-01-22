import { IRawArticle } from '../../../interfaces/IRawArticle';

export default (articleList: IRawArticle[]): IRawArticle[] => {
  return articleList.sort((article1: IRawArticle, article2: IRawArticle) => {
    if (article1.displayTime < article2.displayTime) {
      return -1;
    } else if (article1.displayTime > article2.displayTime) {
      return 1;
    }
    return 0;
  }) as IRawArticle[];
};
