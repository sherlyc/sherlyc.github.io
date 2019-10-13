import { TestBed } from '@angular/core/testing';

import { RecommendationsService } from './recommendations.service';
import { mockService, ServiceMock } from './mocks/MockService';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config/config.service';
import { CookieService } from './cookie/cookie.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('RecommendationsService', () => {
  const recommendationsAPI = 'http://locahost:1234/recommendations';

  let recommendationsService: RecommendationsService;
  let configService: ServiceMock<ConfigService>;
  let cookieService: ServiceMock<CookieService>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ConfigService,
          useClass: mockService(ConfigService)
        },
        {
          provide: CookieService,
          useClass: mockService(CookieService)
        },
        {
          provide: HttpClient,
          useClass: mockService(HttpClient)
        }
      ]
    });
    configService = TestBed.get(ConfigService);
    cookieService = TestBed.get(CookieService);
    httpMock = TestBed.get(HttpTestingController);
    configService.getConfig.mockReturnValue({ recommendationsAPI });
    recommendationsService = TestBed.get(RecommendationsService);
  });

  it('should be created', () => {
    const service: RecommendationsService = TestBed.get(RecommendationsService);
    expect(service).toBeTruthy();
  });
});
