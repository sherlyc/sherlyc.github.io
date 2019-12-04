import { IBreakingNewsResponse } from "./IBreakingNewsResponse";

export interface IIsomophicApiBreakingNews {
  [key: string]: any;
  breakingNews: {
    breakingNewsData: IBreakingNewsResponse;
  };
}
