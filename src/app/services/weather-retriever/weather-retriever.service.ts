import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { IWeatherResponse } from "../../../../common/__types__/IWeatherResponse";
import { ConfigService } from "../config/config.service";
import { LoggerService } from "../logger/logger.service";

@Injectable({
  providedIn: "root"
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
        `${this.config.getConfig().weatherAPI}/${location}`
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.logger.warn(
            error,
            `WeatherRetrieverService - getWeather error for location: ${location}`
          );
          return throwError(error);
        })
      );
  }
}
