import { Injectable } from '@angular/core';
import { CookieService } from './cookie/cookie.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from './config/config.service';
import { catchError } from 'rxjs/operators';
import { LoggerService } from './logger/logger.service';
import { split, flow, pick, flatMap, join, groupBy, take } from 'lodash/fp';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private configService: ConfigService,
    private loggerService: LoggerService
  ) {}

  getRecommendations(): Observable<string> {
    const {
      name,
      segments,
      maxCount
    } = this.configService.getConfig().recommendationsCookie;
    const cookie = this.cookieService.get(name);

    console.log(cookie, segments);
    const parsedSegments = this.parseCookie(cookie, segments, maxCount);

    return this.http
      .get<string>(this.configService.getConfig().recommendationsAPI, {
        params: {
          segments: parsedSegments
        }
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

  parseCookie = (cookie: string, keys: string[], maxCount: number) =>
    flow(
      split(';'),
      groupBy(
        flow(
          split('='),
          take(1)
        )
      ),
      pick(keys),
      flatMap(take(maxCount)),
      join(';')
    )(cookie);
}
