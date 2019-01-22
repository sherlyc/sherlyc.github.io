import * as moment from 'moment';
import { IRawArticle } from '../../../interfaces/IRawArticle';

export default (articleList: IRawArticle[]): IRawArticle[] => {
  return articleList.sort(
    (article1: IRawArticle, article2: IRawArticle) =>
      moment(article1.displayTime).unix() - moment(article2.displayTime).unix()
  ) as IRawArticle[];
};
