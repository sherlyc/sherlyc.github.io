import { Component, Input, OnInit } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IWeatherUnit } from '../../../../common/__types__/IWeatherUnit';
import { weatherRegions } from '../../../../common/WeatherLocations';
import { StoreService, StorageKeys } from '../../services/store/store.service';
import { RuntimeService } from '../../services/runtime/runtime.service';

@Component({
  selector: 'app-weather-unit',
  templateUrl: './weather-unit.component.html',
  styleUrls: ['./weather-unit.component.scss']
})
export class WeatherUnitComponent implements IContentBlockComponent, OnInit {
  constructor(
    private storeService: StoreService,
    private runtimeService: RuntimeService
  ) {}
  @Input() input!: IWeatherUnit;

  isDropdownOpen = false;
  selectedLocation = '';
  regions = weatherRegions;

  ngOnInit() {
    if (this.runtimeService.isBrowser()) {
      this.selectedLocation =
        this.storeService.get(StorageKeys.WeatherLocation) || '';
    }
  }

  onToggle() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onSelectLocation(location: string) {
    this.selectedLocation = location;
    this.storeService.set(StorageKeys.WeatherLocation, location);
    this.onToggle();
  }
}
