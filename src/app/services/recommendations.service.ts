import { Injectable } from '@angular/core';
import { CookieService } from './cookie/cookie.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from './config/config.service';
import { RuntimeService } from './runtime/runtime.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private configService: ConfigService,
    private runtimeService: RuntimeService
  ) {}

  getRecommendations(): Observable<string> {
    return this.http
      .get<string>(this.configService.getConfig().recommendationsAPI)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('thrown error');
          return throwError(error);
        })
      );
  }
}
