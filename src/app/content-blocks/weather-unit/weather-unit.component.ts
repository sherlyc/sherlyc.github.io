import { Component, Input, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IWeatherUnit } from "../../../../common/__types__/IWeatherUnit";
import { WeatherRetrieverService } from "../../services/weather-retriever/weather-retriever.service";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { IWeatherResponse } from "../../../../common/__types__/IWeatherResponse";
import {
  weatherRegions,
  WeatherLocations
} from "../../../../common/WeatherLocations";
import { StoreService, StorageKeys } from "../../services/store/store.service";
import { RuntimeService } from "../../services/runtime/runtime.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { WindowService } from "../../services/window/window.service";

@Component({
  selector: "app-weather-unit",
  templateUrl: "./weather-unit.component.html",
  styleUrls: ["./weather-unit.component.scss"]
})
export class WeatherUnitComponent implements IContentBlockComponent, OnInit {
  constructor(
    private storeService: StoreService,
    private runtimeService: RuntimeService,
    private weatherRetrieverService: WeatherRetrieverService,
    private analyticsService: AnalyticsService,
    private windowService: WindowService
  ) {}

  @Input() input!: IWeatherUnit;
  regions = weatherRegions;
  firstColumnLimit = 8;

  isDropdownOpen = false;
  hasError = false;

  weatherData: IWeatherResponse = {} as any;
  selectedLocation: WeatherLocations | null = null;

  currentDateTime: number = Date.now();

  ngOnInit() {
    if (this.runtimeService.isBrowser()) {
      const previousSelectedLocation = this.storeService.get(
        StorageKeys.WeatherLocation
      ) as WeatherLocations;
      if (previousSelectedLocation) {
        this.getWeatherData(previousSelectedLocation);
      }
    }
  }

  onSelectLocation(location: WeatherLocations) {
    this.storeService.set(StorageKeys.WeatherLocation, location);
    this.getWeatherData(location);
    this.onToggleDropdown();
  }

  onToggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (!this.isDropdownOpen) {
      this.windowService.getWindow().scrollTo(0, 0);
    }
  }

  private getWeatherData(location: WeatherLocations) {
    this.weatherRetrieverService.getWeather(location).subscribe(
      (weatherData: IWeatherResponse) => {
        this.selectedLocation = location;
        this.weatherData = weatherData;
        this.hasError = false;
      },
      () => {
        this.selectedLocation = location;
        this.hasError = true;
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
