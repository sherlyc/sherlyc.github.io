import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IWeatherResponse } from '../../../../common/__types__/IWeatherResponse';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherRetrieverService {
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private logger: LoggerService
  ) {}

  getWeather(location: string): Observable<IWeatherResponse> {
    return this.http
      .get<IWeatherResponse>(
        `${this.config.getConfig().weatherAPI}?location=${location}`
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.logger.warn(error, 'WeatherRetrieverService - getWeather error');
          return throwError(error);
        })
      );
  }
}
