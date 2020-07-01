import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By, TransferState } from "@angular/platform-browser";
import { of, throwError } from "rxjs";
import { AnalyticsService } from "src/app/services/analytics/analytics.service";
import { WindowService } from "src/app/services/window/window.service";
import { DeviceType } from "../../../../common/DeviceType";
import { Forecasts } from "../../../../common/Forecasts";
import { WeatherLocations } from "../../../../common/WeatherLocations";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IWeatherResponse } from "../../../../common/__types__/IWeatherResponse";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { MediaQueryService } from "../../services/media-query/media-query.service";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { RuntimeService } from "../../services/runtime/runtime.service";
import { WeatherService } from "../../services/weather/weather.service";
import { WeatherIconComponent } from "../../shared/components/weather-icon/weather-icon.component";
import { WeatherUnitComponent } from "./weather-unit.component";

const OriginalNow = global.Date.now;

describe("WeatherUnitComponent", () => {
  let weatherService: ServiceMock<WeatherService>;
  let runtimeService: ServiceMock<RuntimeService>;
  let analyticsService: ServiceMock<AnalyticsService>;
  let mediaQueryService: ServiceMock<MediaQueryService>;
  const weatherData: IWeatherResponse = {
    temperatureUnit: "°C",
    minTemp: 14,
    maxTemp: 21,
    location: "AUCKLAND",
    temperature: 18,
    condition: Forecasts.cloudy
  };
  let fixture: ComponentFixture<WeatherUnitComponent>;
  let component: WeatherUnitComponent;
  let windowService: ServiceMock<WindowService>;
  const scrollToSpy = jest.fn();

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      declarations: [WeatherUnitComponent, WeatherIconComponent],
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
          provide: WeatherService,
          useClass: mockService(WeatherService)
        },
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        },
        {
          provide: WindowService,
          useClass: mockService(WindowService)
        },
        {
          provide: MediaQueryService,
          useClass: mockService(MediaQueryService)
        }
      ]
    }).compileComponents();

    runtimeService = TestBed.inject(RuntimeService) as ServiceMock<
      RuntimeService
    >;
    weatherService = TestBed.inject(WeatherService) as ServiceMock<
      WeatherService
    >;
    analyticsService = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;
    windowService = TestBed.inject(WindowService) as ServiceMock<WindowService>;

    runtimeService.isBrowser.mockReturnValue(true);
    mediaQueryService = TestBed.inject(MediaQueryService) as ServiceMock<
      MediaQueryService
    >;
    mediaQueryService.subscribe.mockImplementation(
      (subscriber: (device: DeviceType) => void) => {
        subscriber(DeviceType.desktop);
      }
    );

    fixture = TestBed.createComponent(WeatherUnitComponent);
    component = fixture.componentInstance;
    component.input = {
      type: ContentBlockType.WeatherUnit
    };
    windowService.getWindow.mockReturnValue({ scrollTo: scrollToSpy });
  });

  afterAll(() => {
    global.Date.now = OriginalNow;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display region list when weather label is clicked on mobile", () => {
    component.showDropdown = false;
    mediaQueryService.subscribe.mockImplementation(
      (subscriber: (device: DeviceType) => void) => {
        subscriber(DeviceType.mobile);
      }
    );
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css(".location-list-visible"))
    ).toBeFalsy();

    fixture.debugElement.query(By.css(".weather-info")).nativeElement.click();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css(".location-list-visible"))
    ).toBeTruthy();
  });

  it("should display 2 columns of region list when weather label is clicked on mobile", () => {
    component.showDropdown = false;
    mediaQueryService.subscribe.mockImplementation(
      (subscriber: (device: DeviceType) => void) => {
        subscriber(DeviceType.mobile);
      }
    );
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(".regionsList"))).toBeFalsy();

    fixture.debugElement.query(By.css(".weather-info")).nativeElement.click();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css(".location-list-left-col"))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css(".region-list-right-col"))
    ).toBeTruthy();
  });

  it("should hide region list when weather label is clicked and region list is already displayed on mobile", () => {
    component.showDropdown = true;
    mediaQueryService.subscribe.mockImplementation(
      (subscriber: (device: DeviceType) => void) => {
        subscriber(DeviceType.mobile);
      }
    );
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css(".location-list-visible"))
    ).toBeTruthy();

    fixture.debugElement.query(By.css(".weather-info")).nativeElement.click();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css(".location-list-visible"))
    ).toBeFalsy();
  });

  it("should display tick for selected location", () => {
    weatherService.getWeather.mockReturnValue(of(weatherData));
    weatherService.subscribe.mockImplementation(
      (subscriber: (location: WeatherLocations, link?: string) => void) => {
        subscriber(WeatherLocations.Auckland);
      }
    );
    component.regions = [
      {
        name: "Auckland",
        locations: [WeatherLocations.Auckland]
      }
    ];
    component.showDropdown = true;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css(".tick"))).toBeTruthy();
  });

  it("should not display tick for non-selected location", () => {
    component.regions = [
      {
        name: "Auckland",
        locations: [WeatherLocations.Auckland]
      }
    ];
    component.showDropdown = true;
    component.weatherLocation = undefined;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css(".tick"))).toBeFalsy();
  });

  it("should save last selected location and retrieve weather data for that location", () => {
    weatherService.getWeather.mockReturnValue(of(weatherData));
    component.regions = [
      {
        name: "Auckland",
        locations: [WeatherLocations.Auckland]
      }
    ];
    component.showDropdown = true;
    fixture.detectChanges();

    const aucklandListElement = fixture.debugElement
      .queryAll(By.css(".location-name"))
      .find(
        (element) => element.nativeElement.textContent === "Auckland"
      ) as DebugElement;
    aucklandListElement.nativeElement.click();

    expect(weatherService.updateLocation).toHaveBeenCalledWith(
      WeatherLocations.Auckland
    );
    expect(weatherService.getWeather).toHaveBeenCalledWith(
      WeatherLocations.Auckland
    );
  });

  it("should retrieve last selected location on load if there is a location", async () => {
    weatherService.subscribe.mockImplementation(
      (subscriber: (location: WeatherLocations, link?: string) => void) => {
        subscriber(WeatherLocations.Auckland);
      }
    );
    weatherService.getWeather.mockReturnValue(of(weatherData));
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css(".weather-location-info"))
    ).toBeTruthy();

    expect(weatherService.getWeather).toHaveBeenCalledWith(
      WeatherLocations.Auckland
    );
  });

  it("should show the weather condition svg icon of current location", () => {
    weatherService.getWeather.mockReturnValue(of(weatherData));
    component.regions = [
      {
        name: "Auckland",
        locations: [WeatherLocations.Auckland]
      }
    ];
    component.showDropdown = true;
    fixture.detectChanges();

    const aucklandListElement = fixture.debugElement
      .queryAll(By.css(".location-name"))
      .find(
        (element) => element.nativeElement.textContent === "Auckland"
      ) as DebugElement;
    aucklandListElement.nativeElement.click();
    fixture.detectChanges();

    const weatherIcon = fixture.debugElement.query(By.css(".weather-icon"));
    expect(weatherIcon).toBeTruthy();
  });

  it("should display weather info on load if there is a selected location", () => {
    weatherService.getWeather.mockReturnValue(of(weatherData));
    weatherService.subscribe.mockImplementation(
      (subscriber: (location: WeatherLocations, link?: string) => void) => {
        subscriber(WeatherLocations.Auckland);
      }
    );
    component.weather = weatherData;
    fixture.detectChanges();

    const weatherLocationInfo = fixture.debugElement.query(
      By.css(".weather-location-info")
    );

    expect(weatherLocationInfo.nativeElement.textContent).toContain(
      WeatherLocations.Auckland
    );
    expect(weatherLocationInfo.nativeElement.textContent).toContain(
      weatherData.temperature
    );
    expect(weatherLocationInfo.nativeElement.textContent).toContain(
      weatherData.minTemp
    );
    expect(weatherLocationInfo.nativeElement.textContent).toContain(
      weatherData.maxTemp
    );
  });

  it("should not retrieve last selected location on load if there is no location saved", () => {
    weatherService.subscribe.mockImplementation(
      (subscriber: (location: WeatherLocations, link?: string) => void) => {
        // @ts-ignore
        subscriber(undefined);
      }
    );
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css(".weatherLocationInfo"))
    ).toBeFalsy();

    expect(weatherService.getWeather).not.toHaveBeenCalled();
  });

  it("should collapse location list after selecting a location", () => {
    weatherService.getWeather.mockReturnValue(of(weatherData));
    component.showDropdown = true;
    fixture.detectChanges();

    const aucklandListElement = fixture.debugElement
      .queryAll(By.css(".location-name"))
      .find(
        (element) => element.nativeElement.textContent === "Auckland"
      ) as DebugElement;
    aucklandListElement.nativeElement.click();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css(".location-list-visible"))
    ).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css(".weather-location-info"))
    ).toBeTruthy();
    expect(scrollToSpy).toHaveBeenCalled();
  });

  it("should show weather unavailable if cannot retrieve selected weather info for returning user", () => {
    weatherService.subscribe.mockImplementation(
      (subscriber: (location: WeatherLocations, link?: string) => void) => {
        subscriber(WeatherLocations.Auckland);
      }
    );
    weatherService.getWeather.mockReturnValue(
      throwError({ status: 500, statusText: "Internal Server error" })
    );
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css(".weather-error")).nativeElement
        .textContent
    ).toContain("Weather is unavailable");
    expect(
      fixture.debugElement.query(By.css(".weather-location-info"))
    ).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css(".weatherCheckLabel"))
    ).toBeFalsy();
  });

  it("should show weather unavailable if cannot retrieve selected weather info after selecting new location", () => {
    weatherService.subscribe.mockImplementation(
      (subscriber: (location: WeatherLocations, link?: string) => void) => {
        subscriber(WeatherLocations.Auckland);
      }
    );
    component.showDropdown = true;
    component.regions = [
      {
        name: "Auckland",
        locations: [WeatherLocations.Auckland]
      }
    ];
    weatherService.getWeather.mockReturnValue(
      throwError({ status: 500, statusText: "Internal Server error" })
    );
    fixture.detectChanges();

    const aucklandListElement = fixture.debugElement
      .queryAll(By.css(".location-name"))
      .find(
        (element) => element.nativeElement.textContent === "Auckland"
      ) as DebugElement;
    aucklandListElement.nativeElement.click();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css(".weather-error")).nativeElement
        .textContent
    ).toContain("Weather is unavailable");
    expect(
      fixture.debugElement.query(By.css(".weatherLocationInfo"))
    ).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css(".weatherCheckLabel"))
    ).toBeFalsy();
  });

  it("when weather is unavailable, it should show weather info when it is available again", () => {
    weatherService.subscribe.mockImplementation(
      (subscriber: (location: WeatherLocations, link?: string) => void) => {
        subscriber(WeatherLocations.Auckland);
      }
    );
    weatherService.getWeather.mockReturnValue(
      throwError({ status: 500, statusText: "Internal Server error" })
    );
    component.showDropdown = true;
    component.regions = [
      {
        name: "Auckland",
        locations: [WeatherLocations.Auckland]
      }
    ];
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css(".weather-error")).nativeElement
        .textContent
    ).toContain("Weather is unavailable");
    expect(
      fixture.debugElement.query(By.css(".weatherLocationInfo"))
    ).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css(".weatherCheckLabel"))
    ).toBeFalsy();

    weatherService.getWeather.mockReturnValue(of(weatherData));
    const aucklandListElement = fixture.debugElement
      .queryAll(By.css(".location-name"))
      .find(
        (element) => element.nativeElement.textContent === "Auckland"
      ) as DebugElement;
    aucklandListElement.nativeElement.click();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css(".weather-location-info")).nativeElement
        .textContent
    ).toContain(weatherData.temperature);
    expect(
      fixture.debugElement.query(By.css(".weather-location-info")).nativeElement
        .textContent
    ).toContain(weatherData.minTemp);
    expect(
      fixture.debugElement.query(By.css(".weather-location-info")).nativeElement
        .textContent
    ).toContain(weatherData.maxTemp);

    expect(fixture.debugElement.query(By.css(".weather-error"))).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css(".weatherCheckLabel"))
    ).toBeFalsy();
  });

  it("should show check weather if there is no selected location", () => {
    weatherService.subscribe.mockImplementation(
      (subscriber: (location: WeatherLocations, link?: string) => void) => {
        // @ts-ignore
        subscriber(undefined);
      }
    );
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css(".weather-check-label")).nativeElement
        .textContent
    ).toContain("Check your weather");
    expect(fixture.debugElement.query(By.css(".weather-error"))).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css(".weather-location-info"))
    ).toBeFalsy();
  });

  it("should close region list when clicking exit button", () => {
    component.showDropdown = true;
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css(".location-list-visible"))
    ).toBeTruthy();

    fixture.debugElement.query(By.css(".close-button")).nativeElement.click();
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css(".location-list-visible"))
    ).toBeFalsy();
    expect(scrollToSpy).toHaveBeenCalled();
  });

  it("should show timestamp", () => {
    const christmas = "2020-12-25T00:00:00+00:00";
    (global as any).Date.now = () => new Date(christmas).getTime();
    fixture = TestBed.createComponent(WeatherUnitComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    const timeStamp = fixture.debugElement.nativeElement.querySelector(
      ".timestamp"
    );

    expect(timeStamp!.textContent).toEqual("December 25 2020");
  });

  describe("Analytics", () => {
    it("should push analytic event when weather location is changed ", () => {
      weatherService.getWeather.mockReturnValue(of(weatherData));
      component.showDropdown = true;
      component.regions = [
        {
          name: "Auckland",
          locations: [WeatherLocations.Auckland]
        }
      ];
      fixture.detectChanges();

      const aucklandListElement = fixture.debugElement
        .queryAll(By.css(".location-name"))
        .find(
          (element) => element.nativeElement.textContent === "Auckland"
        ) as DebugElement;
      aucklandListElement.nativeElement.click();

      expect(analyticsService.pushEvent).toHaveBeenCalledWith({
        type: AnalyticsEventsType.WEATHER_LOCATION_CHANGED,
        location: "Auckland"
      });
    });
  });
});
