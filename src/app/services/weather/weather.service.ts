import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { WeatherLocations } from "../../../../common/WeatherLocations";
import { IWeatherResponse } from "../../../../common/__types__/IWeatherResponse";
import { ConfigService } from "../config/config.service";
import { LoggerService } from "../logger/logger.service";
import { RuntimeService } from "../runtime/runtime.service";
import { StorageKeys, StoreService } from "../store/store.service";
import { WindowService } from "../window/window.service";

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  private location!: BehaviorSubject<WeatherLocations>;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private logger: LoggerService,
    private storeService: StoreService,
    private runtimeService: RuntimeService,
    private windowService: WindowService
  ) {
    this.init();
  }

  init() {
    const location = this.storeService.get(
      StorageKeys.WeatherLocation
    ) as WeatherLocations;
    this.location = new BehaviorSubject<WeatherLocations>(location);
  }

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

  getLocation() {
    return this.location.getValue();
  }

  subscribe(subscriber: (location: WeatherLocations, link?: string) => void) {
    this.location.subscribe((location: WeatherLocations) => {
      subscriber(location, this.getWeatherLink(location));
    });
  }

  updateLocation(location: WeatherLocations) {
    this.storeService.set(StorageKeys.WeatherLocation, location);
    this.location.next(location);
  }

  private getWeatherLink(location: WeatherLocations) {
    if (this.windowService.isDesktopDomain()) {
      return location
        ? `/national/weather/${this.getLocation()
            .toLowerCase()
            .replace(/\s+/, "-")}-forecast`
        : "/national/weather/";
    }
    return undefined;
  }
}
