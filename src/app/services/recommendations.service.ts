import { Injectable } from '@angular/core';
import { CookieService } from './cookie/cookie.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from './config/config.service';
import { catchError } from 'rxjs/operators';
import { LoggerService } from './logger/logger.service';

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
    return this.http
      .get<string>(this.configService.getConfig().recommendationsAPI)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.loggerService.warn(`RecommendationsService - API failed - ${error}`);
          return throwError(error);
        })
      );
  }
}
