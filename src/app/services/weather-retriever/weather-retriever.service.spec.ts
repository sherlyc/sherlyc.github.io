import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { WeatherRetrieverService } from './weather-retriever.service';
import { WeatherLocations } from '../../../../common/WeatherLocations';
import { ConfigService } from '../config/config.service';
import { mockService, ServiceMock } from '../mocks/MockService';
import * as weatherResponse from './__fixtures__/weatherData.json';

describe('Weather Retriever', () => {
  let weatherRetrieverService: WeatherRetrieverService;
  let httpMock: HttpTestingController;
  let configServiceMock: ServiceMock<ConfigService>;
  const weatherAPI = 'http://localhost';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ConfigService,
          useClass: mockService(ConfigService)
        }
      ]
    });

    weatherRetrieverService = TestBed.get(WeatherRetrieverService);
    httpMock = TestBed.get(HttpTestingController);
    configServiceMock = TestBed.get(ConfigService);
    configServiceMock.getConfig.mockReturnValue({ weatherAPI });
  });

  it('should fetch weather data', (done) => {
    weatherRetrieverService
      .getWeather(WeatherLocations.Auckland)
      .subscribe((response) => {
        expect(response).toEqual(weatherResponse);
        done();
      });

    const req = httpMock.expectOne(
      `${weatherAPI}?location=${WeatherLocations.Auckland}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(weatherResponse);
  });

  it('should return error if unable to fetch weather data', (done) => {
    weatherRetrieverService.getWeather(WeatherLocations.Auckland).subscribe(
      () => {},
      (error) => {
        expect(error).toBeTruthy();
        done();
      }
    );

    const req = httpMock.expectOne(
      `${weatherAPI}?location=${WeatherLocations.Auckland}`
    );
    expect(req.request.method).toBe('GET');
    req.flush({}, { status: 500, statusText: 'Internal Server error' });
  });
});
