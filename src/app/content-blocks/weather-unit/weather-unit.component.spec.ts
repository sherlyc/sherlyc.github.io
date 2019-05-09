import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherUnitComponent } from './weather-unit.component';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { By, TransferState } from '@angular/platform-browser';
import { WeatherLocations } from '../../../../common/WeatherLocations';
import { StoreService, StorageKeys } from '../../services/store/store.service';
import { mockService, ServiceMock } from '../../services/mocks/MockService';
import { RuntimeService } from '../../services/runtime/runtime.service';
import { WeatherRetrieverService } from '../../services/weather-retriever/weather-retriever.service';
import * as weatherDataJson from '../../services/weather-retriever/__fixtures__/weatherData.json';
import { of, throwError } from 'rxjs';
import { IWeatherResponse } from '../../../../common/__types__/IWeatherResponse';
import { DataLayerService } from 'src/app/services/data-layer/data-layer.service';
import { DebugElement } from '@angular/core';

describe('WeatherUnitComponent', () => {
  let storeService: ServiceMock<StoreService>;
  let runtimeService: ServiceMock<RuntimeService>;
  let weatherRetrieverService: ServiceMock<WeatherRetrieverService>;
  let dataLayerService: ServiceMock<DataLayerService>;
  const weatherData = weatherDataJson as IWeatherResponse;
  let fixture: ComponentFixture<WeatherUnitComponent>;
  let component: WeatherUnitComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherUnitComponent],
      providers: [
        {
          provide: TransferState,
          useClass: mockService(TransferState)
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        },
        {
          provide: StoreService,
          useClass: mockService(StoreService)
        },
        {
          provide: WeatherRetrieverService,
          useClass: mockService(WeatherRetrieverService)
        },
        {
          provide: DataLayerService,
          useClass: mockService(DataLayerService)
        }
      ]
    }).compileComponents();

    runtimeService = TestBed.get(RuntimeService);
    storeService = TestBed.get(StoreService);
    weatherRetrieverService = TestBed.get(WeatherRetrieverService);
    dataLayerService = TestBed.get(DataLayerService);
    runtimeService.isBrowser.mockReturnValue(true);

    fixture = TestBed.createComponent(WeatherUnitComponent);
    component = fixture.componentInstance;
    component.input = {
      type: ContentBlockType.WeatherUnit
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display region list when weather label is clicked', () => {
    component.isDropdownOpen = false;
    expect(
      fixture.debugElement.query(By.css('.location-list-visible'))
    ).toBeFalsy();

    fixture.debugElement.query(By.css('.weather-bar')).nativeElement.click();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.location-list-visible'))
    ).toBeTruthy();
  });

  it('should display 2 columns of region list when weather label is clicked', () => {
    component.isDropdownOpen = false;
    expect(fixture.debugElement.query(By.css('.regionsList'))).toBeFalsy();

    fixture.debugElement.query(By.css('.weather-bar')).nativeElement.click();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.location-list-left-col'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('.region-list-right-col'))
    ).toBeTruthy();
  });

  it('should hide region list when weather label is clicked and region list is already displayed', () => {
    component.isDropdownOpen = true;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.location-list-visible'))
    ).toBeTruthy();

    fixture.debugElement.query(By.css('.weather-bar')).nativeElement.click();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.location-list-visible'))
    ).toBeFalsy();
  });

  it('should display tick for selected location', () => {
    weatherRetrieverService.getWeather.mockReturnValue(of(weatherData));
    storeService.get.mockReturnValue(WeatherLocations.Auckland);
    component.regions = [
      {
        name: 'Auckland',
        locations: [WeatherLocations.Auckland]
      }
    ];
    component.isDropdownOpen = true;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.tick-icon'))).toBeTruthy();
  });

  it('should not display tick for non-selected location', () => {
    component.regions = [
      {
        name: 'Auckland',
        locations: [WeatherLocations.Auckland]
      }
    ];
    component.isDropdownOpen = true;
    component.selectedLocation = undefined;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.tick-icon'))).toBeFalsy();
  });

  it('should save last selected location and retrieve weather data for that location', () => {
    weatherRetrieverService.getWeather.mockReturnValue(of(weatherData));
    component.regions = [
      {
        name: 'Auckland',
        locations: [WeatherLocations.Auckland]
      }
    ];
    component.isDropdownOpen = true;
    fixture.detectChanges();

    fixture.debugElement.query(By.css('.location-name')).nativeElement.click();

    expect(storeService.set).toHaveBeenCalledWith(
      StorageKeys.WeatherLocation,
      WeatherLocations.Auckland
    );
    expect(weatherRetrieverService.getWeather).toHaveBeenCalledWith(
      WeatherLocations.Auckland
    );
  });

  it('should retrieve last selected location on load if there is a location', () => {
    storeService.get.mockReturnValue(WeatherLocations.Auckland);
    weatherRetrieverService.getWeather.mockReturnValue(of(weatherData));
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.weatherLocationInfo'))
    ).toBeTruthy();

    expect(storeService.get).toHaveBeenCalledWith(StorageKeys.WeatherLocation);
    expect(weatherRetrieverService.getWeather).toHaveBeenCalledWith(
      WeatherLocations.Auckland
    );
  });

  it('should show the weather condition svg icon of current location', () => {
    weatherRetrieverService.getWeather.mockReturnValue(of(weatherData));
    component.regions = [
      {
        name: 'Auckland',
        locations: [WeatherLocations.Auckland]
      }
    ];
    component.isDropdownOpen = true;
    fixture.detectChanges();

    fixture.debugElement.query(By.css('.location-name')).nativeElement.click();
    fixture.detectChanges();

    const weatherIcon = fixture.debugElement.query(By.css('.weather-icon'));
    expect(weatherIcon.nativeElement.src).toContain(
      'weather-forecast--partcloudy.svg'
    );
  });

  it('should display weather info on load if there is a selected location', () => {
    weatherRetrieverService.getWeather.mockReturnValue(of(weatherData));
    storeService.get.mockReturnValue(WeatherLocations.Auckland);
    component.weatherData = weatherData;
    fixture.detectChanges();

    const weatherLocationInfo = fixture.debugElement.query(
      By.css('.weatherLocationInfo')
    );

    expect(weatherLocationInfo.nativeElement.textContent).toContain(
      WeatherLocations.Auckland
    );
    expect(weatherLocationInfo.nativeElement.textContent).toContain(
      weatherData.temperature
    );
    expect(weatherLocationInfo.nativeElement.textContent).toContain(
      weatherData.min_temp
    );
    expect(weatherLocationInfo.nativeElement.textContent).toContain(
      weatherData.max_temp
    );
  });

  it('should not retrieve last selected location on load if there is no location saved', () => {
    storeService.get.mockReturnValue('');
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.weatherLocationInfo'))
    ).toBeFalsy();

    expect(storeService.get).toHaveBeenCalledWith(StorageKeys.WeatherLocation);
    expect(weatherRetrieverService.getWeather).not.toHaveBeenCalled();
  });

  it('should collapse location list after selecting a location', () => {
    weatherRetrieverService.getWeather.mockReturnValue(of(weatherData));
    component.isDropdownOpen = true;
    fixture.detectChanges();

    fixture.debugElement.query(By.css('.location-name')).nativeElement.click();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.location-list-visible'))
    ).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css('.weatherLocationInfo'))
    ).toBeTruthy();
  });

  it('should show weather unavailable if cannot retrieve selected weather info for returning user', () => {
    storeService.get.mockReturnValue(WeatherLocations.Auckland);
    weatherRetrieverService.getWeather.mockReturnValue(
      throwError({ status: 500, statusText: 'Internal Server error' })
    );
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.weatherError')).nativeElement
        .textContent
    ).toContain('Weather is unavailable');
    expect(
      fixture.debugElement.query(By.css('.weatherLocationInfo'))
    ).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css('.weatherCheckLabel'))
    ).toBeFalsy();
  });

  it('should show weather unavailable if cannot retrieve selected weather info after selecting new location', () => {
    storeService.get.mockReturnValue(null);
    component.isDropdownOpen = true;
    component.regions = [
      {
        name: 'Auckland',
        locations: [WeatherLocations.Auckland]
      }
    ];
    fixture.detectChanges();

    weatherRetrieverService.getWeather.mockReturnValue(
      throwError({ status: 500, statusText: 'Internal Server error' })
    );
    fixture.debugElement.query(By.css('.location-name')).nativeElement.click();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.weatherError')).nativeElement
        .textContent
    ).toContain('Weather is unavailable');
    expect(
      fixture.debugElement.query(By.css('.weatherLocationInfo'))
    ).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css('.weatherCheckLabel'))
    ).toBeFalsy();
  });

  it('when weather is unavailable, it should show weather info when it is available again', () => {
    storeService.get.mockReturnValue(WeatherLocations.Auckland);
    weatherRetrieverService.getWeather.mockReturnValue(
      throwError({ status: 500, statusText: 'Internal Server error' })
    );
    component.isDropdownOpen = true;
    component.regions = [
      {
        name: 'Auckland',
        locations: [WeatherLocations.Auckland]
      }
    ];
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.weatherError')).nativeElement
        .textContent
    ).toContain('Weather is unavailable');
    expect(
      fixture.debugElement.query(By.css('.weatherLocationInfo'))
    ).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css('.weatherCheckLabel'))
    ).toBeFalsy();

    weatherRetrieverService.getWeather.mockReturnValue(of(weatherData));
    fixture.debugElement.query(By.css('.location-name')).nativeElement.click();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.weatherLocationInfo')).nativeElement
        .textContent
    ).toContain(weatherData.temperature);
    expect(
      fixture.debugElement.query(By.css('.weatherLocationInfo')).nativeElement
        .textContent
    ).toContain(weatherData.min_temp);
    expect(
      fixture.debugElement.query(By.css('.weatherLocationInfo')).nativeElement
        .textContent
    ).toContain(weatherData.max_temp);

    expect(fixture.debugElement.query(By.css('.weatherError'))).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css('.weatherCheckLabel'))
    ).toBeFalsy();
  });

  it('should show check weather if there is no selected location', () => {
    storeService.get.mockReturnValue(null);
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.weatherCheckLabel')).nativeElement
        .textContent
    ).toContain('Check your weather');
    expect(fixture.debugElement.query(By.css('.weatherError'))).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css('.weatherLocationInfo'))
    ).toBeFalsy();
  });

  it('should close region list when clicking exit button', () => {
    component.isDropdownOpen = true;
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.location-list-visible'))
    ).toBeTruthy();

    fixture.debugElement.query(By.css('.close-button')).nativeElement.click();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.location-list-visible'))
    ).toBeFalsy();
  });

  describe('Analytics', () => {
    it('should push analytic event when weather bar is clicked to open it', () => {
      component.isDropdownOpen = false;
      fixture.detectChanges();

      fixture.debugElement.query(By.css('.weather-bar')).nativeElement.click();
      fixture.detectChanges();

      expect(dataLayerService.pushEvent).toHaveBeenCalledWith({
        event: 'weather.location.bar',
        'weather.bar': 'opened'
      });
    });

    it('should push analytic event when weather bar is clicked to close it', () => {
      component.isDropdownOpen = true;
      fixture.detectChanges();

      fixture.debugElement.query(By.css('.weather-bar')).nativeElement.click();
      fixture.detectChanges();

      expect(dataLayerService.pushEvent).toHaveBeenCalledWith({
        event: 'weather.location.bar',
        'weather.bar': 'closed'
      });
    });

    it('should push analytic event when weather bar is closed with X button', () => {
      component.isDropdownOpen = true;
      fixture.detectChanges();

      fixture.debugElement.query(By.css('.close-button')).nativeElement.click();
      fixture.detectChanges();

      expect(dataLayerService.pushEvent).toHaveBeenCalledWith({
        event: 'weather.location.exit'
      });
    });

    it('should push analytic event when weather location is changed ', () => {
      weatherRetrieverService.getWeather.mockReturnValue(of(weatherData));
      component.isDropdownOpen = true;
      component.regions = [
        {
          name: 'Auckland',
          locations: [WeatherLocations.Auckland]
        }
      ];
      fixture.detectChanges();

      const aucklandListElement = fixture.debugElement
        .queryAll(By.css('.location-name'))
        .find((element) => element.nativeElement.textContent === 'Auckland');
      (aucklandListElement as DebugElement).nativeElement.click();

      expect(dataLayerService.pushEvent).toHaveBeenCalledWith({
        event: 'weather.location.change',
        'weather.location': 'Auckland'
      });
    });
  });
});
