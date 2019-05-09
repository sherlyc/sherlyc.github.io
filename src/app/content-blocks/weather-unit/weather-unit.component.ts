import { Component, Input, OnInit } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IWeatherUnit } from '../../../../common/__types__/IWeatherUnit';
import { WeatherRetrieverService } from '../../services/weather-retriever/weather-retriever.service';
import { AnalyticsService } from '../../services/data-layer/analytics.service';
import { IWeatherResponse } from '../../../../common/__types__/IWeatherResponse';
import {
  weatherRegions,
  WeatherLocations
} from '../../../../common/WeatherLocations';
import { StoreService, StorageKeys } from '../../services/store/store.service';
import { RuntimeService } from '../../services/runtime/runtime.service';
import { mapForecastToIcon } from './forecast-icon.mapper';
import { IAnalyticsEvent } from '../../services/data-layer/__types__/IAnalyticsEvent';

@Component({
  selector: 'app-weather-unit',
  templateUrl: './weather-unit.component.html',
  styleUrls: ['./weather-unit.component.scss']
})
export class WeatherUnitComponent implements IContentBlockComponent, OnInit {
  constructor(
    private storeService: StoreService,
    private runtimeService: RuntimeService,
    private weatherRetrieverService: WeatherRetrieverService,
    private dataLayerService: AnalyticsService
  ) {}

  @Input() input!: IWeatherUnit;

  regions = weatherRegions;
  firstColumnLimit = 8;

  isDropdownOpen = false;
  hasError = false;

  weatherData: IWeatherResponse = {} as any;
  selectedLocation?: WeatherLocations;
  forecastSvgPath?: string;

  ngOnInit() {
    if (this.runtimeService.isBrowser()) {
      this.selectedLocation = this.storeService.get(
        StorageKeys.WeatherLocation
      ) as WeatherLocations;
      if (this.selectedLocation) {
        this.getWeatherData(this.selectedLocation);
      }
    }
  }

  onToggle(isExitClicked = false) {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.trackAnalytics(isExitClicked);
  }

  onSelectLocation(location: string) {
    this.dataLayerService.pushEvent({
      event: 'weather.location.change',
      'weather.location': location
    });
    this.selectedLocation = location as WeatherLocations;
    this.storeService.set(StorageKeys.WeatherLocation, location);
    this.getWeatherData(location);
    this.onToggle();
  }

  private getWeatherData(location: string) {
    this.weatherRetrieverService.getWeather(location).subscribe(
      (weatherData: IWeatherResponse) => {
        this.weatherData = weatherData;
        this.hasError = false;
        this.forecastSvgPath = mapForecastToIcon(weatherData.condition);
      },
      (error) => (this.hasError = true)
    );
  }

  private trackAnalytics(isExitClicked: boolean) {
    if (isExitClicked) {
      this.dataLayerService.pushEvent({
        event: 'weather.location.exit'
      });
      return;
    }

    this.dataLayerService.pushEvent({
      event: 'weather.location.bar',
      'weather.bar': this.isDropdownOpen ? 'opened' : 'closed'
    });
  }
}
