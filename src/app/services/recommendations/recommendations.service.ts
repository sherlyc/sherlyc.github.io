import { Injectable } from "@angular/core";
import { CustomHttpParamsCodec } from "../../shared/custom-http-params-codec";
import { CookieService } from "../cookie/cookie.service";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { ConfigService } from "../config/config.service";
import { catchError } from "rxjs/operators";
import { LoggerService } from "../logger/logger.service";
import { split, flow, pick, flatMap, join, groupBy, take } from "lodash/fp";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";

@Injectable({
  providedIn: "root"
})
export class RecommendationsService {
  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private configService: ConfigService,
    private loggerService: LoggerService
  ) {}

  getRecommendations(
    totalBasicArticlesUnit: number,
    totalBasicArticleTitleUnit: number
  ): Observable<IContentBlock[]> {
    const cookie = this.cookieService.get(
      this.configService.getConfig().recommendationsCookie.name
    );
    const parsedSegments = this.parseCookie(cookie);

    return this.http
      .get<IContentBlock[]>(this.configService.getConfig().recommendationsAPI, {
        params: new HttpParams({
          encoder: new CustomHttpParamsCodec(),
          fromObject: {
            segments: parsedSegments,
            totalBasicArticlesUnit: `${totalBasicArticlesUnit}`,
            totalBasicArticleTitleUnit: `${totalBasicArticleTitleUnit}`
          }
        })
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.loggerService.warn(
            `RecommendationsService - API failed - ${error}`
          );
          return throwError(error);
        })
      );
  }

  parseCookie(cookie: string): string {
    const {
      segments,
      limitPerSegment
    } = this.configService.getConfig().recommendationsCookie;

    return flow(
      split(";"),
      groupBy(flow(split("="), take(1))),
      pick(segments),
      flatMap(take(limitPerSegment)),
      join(";")
    )(cookie);
  }
}
