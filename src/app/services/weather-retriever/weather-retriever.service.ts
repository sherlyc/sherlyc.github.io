import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeatherResponse } from '../../../../common/__types__/IWeatherResponse';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherRetrieverService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  getWeather(location: string): Observable<IWeatherResponse> {
    return this.http.get<IWeatherResponse>(
      `${this.config.getConfig().weatherAPI}?location=${location}`
    );
  }
}
