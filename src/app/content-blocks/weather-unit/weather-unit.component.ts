import { Component, Input, OnInit } from "@angular/core";
import { DeviceType } from "../../../../common/DeviceType";
import {
  WeatherLocations,
  weatherRegions
} from "../../../../common/WeatherLocations";
import { IWeatherResponse } from "../../../../common/__types__/IWeatherResponse";
import { IWeatherUnit } from "../../../../common/__types__/IWeatherUnit";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { MediaQueryService } from "../../services/media-query/media-query.service";
import { RuntimeService } from "../../services/runtime/runtime.service";
import { WeatherService } from "../../services/weather/weather.service";
import { WindowService } from "../../services/window/window.service";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

enum WeatherState {
  available = "available",
  unknown = "unknown",
  unavailable = "unavailable"
}

@Component({
  selector: "app-weather-unit",
  templateUrl: "./weather-unit.component.html",
  styleUrls: ["./weather-unit.component.scss"]
})
export class WeatherUnitComponent implements IContentBlockComponent, OnInit {
  constructor(
    private weatherService: WeatherService,
    private runtimeService: RuntimeService,
    private analyticsService: AnalyticsService,
    private windowService: WindowService,
    private mediaQueryService: MediaQueryService
  ) {}

  @Input() input!: IWeatherUnit;
  regions = weatherRegions;
  firstColumnLimit = 8;

  weather?: IWeatherResponse;
  weatherLocation?: WeatherLocations;
  weatherLink?: string;

  weatherState?: WeatherState;
  showDropdown = false;

  deviceType!: DeviceType;

  currentDateTime: number = Date.now();

  ngOnInit() {
    if (this.runtimeService.isBrowser()) {
      this.mediaQueryService.subscribe((device) => {
        this.deviceType = device;
      });
      this.weatherService.subscribe((location, link) => {
        if (location) {
          this.weatherLocation = location;
          this.weatherLink = link;
          this.getWeatherData(location);
        } else {
          this.weatherState = WeatherState.unknown;
        }
      });
    }
  }

  onSelectLocation(location: WeatherLocations) {
    this.weatherService.updateLocation(location);
    this.getWeatherData(location);
    this.onToggleDropdown();
  }

  onToggleDropdown() {
    this.showDropdown = !this.showDropdown;
    if (!this.showDropdown) {
      this.windowService.getWindow().scrollTo(0, 0);
    }
  }

  private getWeatherData(location: WeatherLocations) {
    this.weatherService.getWeather(location).subscribe(
      (weatherData: IWeatherResponse) => {
        this.weather = weatherData;
        this.weatherState = WeatherState.available;
      },
      () => {
        this.weatherState = WeatherState.unavailable;
      }
    );
  }

  sendLocationAnalytics(location: string) {
    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.WEATHER_LOCATION_CHANGED,
      location: location
    });
  }
}
