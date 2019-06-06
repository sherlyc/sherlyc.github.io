import { IBreakingNewsResponse } from './IBreakingNewsResponse';

export interface ISicsApiBreakingNews {
  [key: string]: any;
  breakingNews: {
    breakingNewsData: IBreakingNewsResponse;
  };
}
