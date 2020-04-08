import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { WeatherLocations } from "../../../../common/WeatherLocations";
import { ConfigService } from "../config/config.service";
import { LoggerService } from "../logger/logger.service";
import { mockService, ServiceMock } from "../mocks/MockService";
import { WeatherRetrieverService } from "./weather-retriever.service";

const weatherResponse = require("./__fixtures__/weatherData.json");

describe("Weather Retriever", () => {
  let weatherRetrieverService: WeatherRetrieverService;
  let httpMock: HttpTestingController;
  let configServiceMock: ServiceMock<ConfigService>;
  let loggerService: ServiceMock<LoggerService>;
  const weatherAPI = "http://localhost";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
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

    weatherRetrieverService = TestBed.get(WeatherRetrieverService);
    httpMock = TestBed.get(HttpTestingController);
    configServiceMock = TestBed.get(ConfigService);
    loggerService = TestBed.get(LoggerService);
    configServiceMock.getConfig.mockReturnValue({ weatherAPI });
  });

  it("should fetch weather data", (done) => {
    weatherRetrieverService
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
    weatherRetrieverService.getWeather(WeatherLocations.Auckland).subscribe(
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
