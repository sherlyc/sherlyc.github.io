import { AxiosResponse } from "axios";
import { forkJoin, from, Observable, of } from "rxjs";
import { catchError, concatMap, map } from "rxjs/operators";
import { IParams } from "../../__types__/IParams";
import cacheHttp from "../../utils/cache-http";
import config from "../../utils/config";
import wrappedLogger from "../../utils/logger";
import { IRawArticle } from "../__types__/IRawArticle";
import { getArticleById } from "../jsonfeed/jsonfeed";

interface IMostPopularResponse {
  mostPopular: {
    mostPopularArticles: Array<{ id: string }>;
    error: boolean;
  };
}

export function getMostPopular(
  limit: number,
  params: IParams
): Promise<IRawArticle[]> {
  return of(config.mostPopularApi)
    .pipe(
      concatMap((url) => cacheHttp<IMostPopularResponse>(params, url)),
      concatMap((response: AxiosResponse<IMostPopularResponse>) => {
        if (response.data.mostPopular.error) {
          throw new Error("Most Popular Service: API returns error");
        }
        return forkJoin(
          response.data.mostPopular.mostPopularArticles.map(
            ({ id }): Observable<IRawArticle | undefined> =>
              from(getArticleById(params, parseInt(id, 10))).pipe(
                catchError(() => of(undefined))
              )
          )
        );
      }),
      map((articles: Array<IRawArticle | undefined>): IRawArticle[] => {
        const filtered = [];
        while (articles.length > 0 && filtered.length < limit) {
          const article = articles.shift();
          if (article) {
            filtered.push(article);
          }
        }
        if (filtered.length < limit / 2) {
          throw new Error(
            "Most Popular Service: more than half of articles are missing"
          );
        }
        return filtered;
      }),
      catchError((err) => {
        wrappedLogger.error(
          params.apiRequestId,
          "Most popular service level error",
          err
        );
        throw err;
      })
    )
    .toPromise();
}
