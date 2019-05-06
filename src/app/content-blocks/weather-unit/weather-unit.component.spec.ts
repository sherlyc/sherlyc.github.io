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

describe('WeatherUnitComponent', () => {
  let storeService: ServiceMock<StoreService>;
  let runtimeService: ServiceMock<RuntimeService>;
  let weatherRetrieverService: ServiceMock<WeatherRetrieverService>;
  const weatherData = weatherDataJson as IWeatherResponse;

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
        }
      ]
    }).compileComponents();

    runtimeService = TestBed.get(RuntimeService);
    storeService = TestBed.get(StoreService);
    weatherRetrieverService = TestBed.get(WeatherRetrieverService);
    runtimeService.isBrowser.mockReturnValue(true);
  });

  const setupComponent = () => {
    const fixture = TestBed.createComponent(WeatherUnitComponent);
    const component = fixture.componentInstance;
    component.input = {
      type: ContentBlockType.WeatherUnit
    };
    return { fixture, component };
  };

  it('should create', () => {
    const { component } = setupComponent();
    expect(component).toBeTruthy();
  });

  it('should display region list when weather label is clicked', () => {
    const { component, fixture } = setupComponent();
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
    const { component, fixture } = setupComponent();
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
    const { component, fixture } = setupComponent();
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
    const { component, fixture } = setupComponent();
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
    const { component, fixture } = setupComponent();
    component.regions = [
      {
        name: 'Auckland',
        locations: [WeatherLocations.Auckland]
      }
    ];
    component.isDropdownOpen = true;
    component.selectedLocation = '';
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.tick-icon'))).toBeFalsy();
  });

  it('should save last selected location and retrieve weather data for that location', () => {
    weatherRetrieverService.getWeather.mockReturnValue(of(weatherData));
    const { component, fixture } = setupComponent();
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
    const { fixture } = setupComponent();
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
    const { component, fixture } = setupComponent();
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
    const { component, fixture } = setupComponent();
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
    const { fixture } = setupComponent();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.weatherLocationInfo'))
    ).toBeFalsy();

    expect(storeService.get).toHaveBeenCalledWith(StorageKeys.WeatherLocation);
    expect(weatherRetrieverService.getWeather).not.toHaveBeenCalled();
  });

  it('should collapse location list after selecting a location', () => {
    weatherRetrieverService.getWeather.mockReturnValue(of(weatherData));
    const { component, fixture } = setupComponent();
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
    const { fixture } = setupComponent();
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
    const { component, fixture } = setupComponent();
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
    const { component, fixture } = setupComponent();
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
    const { fixture } = setupComponent();
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
    const { fixture, component } = setupComponent();
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
});
