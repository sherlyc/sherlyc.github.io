import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { WeatherLocations } from "../../../../common/WeatherLocations";
import { ConfigService } from "../config/config.service";
import { LoggerService } from "../logger/logger.service";
import { mockService, ServiceMock } from "../mocks/MockService";
import { RuntimeService } from "../runtime/runtime.service";
import { StoreService } from "../store/store.service";
import { WindowService } from "../window/window.service";
import { WeatherService } from "./weather.service";

describe("WeatherService", () => {
  let weatherService: WeatherService;
  let runtimeService: ServiceMock<RuntimeService>;
  let windowService: ServiceMock<WindowService>;
  let storeService: ServiceMock<StoreService>;

  let httpMock: HttpTestingController;
  let configServiceMock: ServiceMock<ConfigService>;
  let loggerService: ServiceMock<LoggerService>;
  const weatherAPI = "http://localhost";
  const weatherResponse = {
    "temperatureUnit": "°C",
    "minTemp": 14,
    "maxTemp": 21,
    "location": "AUCKLAND",
    "temperature": 18,
    "condition": "partcloudy"
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        },
        {
          provide: WindowService,
          useClass: mockService(WindowService)
        },
        {
          provide: StoreService,
          useClass: mockService(StoreService)
        },
        {
          provide: ConfigService,
          useClass: mockService(ConfigService)
        },
        {
          provide: LoggerService,
          useClass: mockService(LoggerService)
        }
      ]
    });
    weatherService = TestBed.inject(WeatherService);
    runtimeService = TestBed.inject(RuntimeService) as ServiceMock<
      RuntimeService
    >;
    windowService = TestBed.inject(WindowService) as ServiceMock<WindowService>;
    storeService = TestBed.inject(StoreService) as ServiceMock<StoreService>;
    httpMock = TestBed.inject(HttpTestingController) as ServiceMock<
      HttpTestingController
      >;
    configServiceMock = TestBed.inject(ConfigService) as ServiceMock<
      ConfigService
      >;
    loggerService = TestBed.inject(LoggerService) as ServiceMock<LoggerService>;
    configServiceMock.getConfig.mockReturnValue({ weatherAPI });
  });

  it("should be created", () => {
    expect(weatherService).toBeTruthy();
  });

  it("should subscribe the location change", () => {
    const subscriber = jest.fn();
    storeService.get.mockReturnValue(undefined);
    storeService.set = jest.fn();
    windowService.isDesktopDomain.mockReturnValue(true);
    weatherService.init();

    weatherService.subscribe(subscriber);
    expect(subscriber).toHaveBeenCalledWith(undefined, "/national/weather/");

    weatherService.updateLocation(WeatherLocations.NewPlymouth);
    expect(subscriber).toHaveBeenCalledWith(
      WeatherLocations.NewPlymouth,
      "/national/weather/new-plymouth-forecast"
    );
  });

  it("should get undefined weather link on mobile", () => {
    const subscriber = jest.fn();
    storeService.get.mockReturnValue(undefined);
    storeService.set = jest.fn();
    windowService.isDesktopDomain.mockReturnValue(false);
    weatherService.init();

    weatherService.subscribe(subscriber);
    expect(subscriber).toHaveBeenCalledWith(undefined, undefined);

    weatherService.updateLocation(WeatherLocations.NewPlymouth);
    expect(subscriber).toHaveBeenCalledWith(
      WeatherLocations.NewPlymouth,
      undefined
    );
  });

  it("should fetch weather data", (done) => {
    weatherService
      .getWeather(WeatherLocations.Auckland)
      .subscribe((response) => {
        expect(response).toEqual(weatherResponse);
        done();
      });

    const req = httpMock.expectOne(
      `${weatherAPI}/${WeatherLocations.Auckland}`
    );
    expect(req.request.method).toBe("GET");
    req.flush(weatherResponse);
  });

  it("should log warning and return error if unable to fetch weather data", (done) => {
    weatherService.getWeather(WeatherLocations.Auckland).subscribe(
      () => {},
      (error) => {
        expect(error).toBeTruthy();
        expect(loggerService.warn).toHaveBeenCalled();
        done();
      }
    );

    const req = httpMock.expectOne(
      `${weatherAPI}/${WeatherLocations.Auckland}`
    );
    expect(req.request.method).toBe("GET");
    req.flush({}, { status: 500, statusText: "Internal Server error" });
  });
});
