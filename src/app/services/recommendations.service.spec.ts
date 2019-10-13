import { TestBed } from '@angular/core/testing';

import { RecommendationsService } from './recommendations.service';
import { mockService, ServiceMock } from './mocks/MockService';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config/config.service';
import { CookieService } from './cookie/cookie.service';
import { RuntimeService } from './runtime/runtime.service';
import { of } from 'rxjs';

describe('RecommendationsService', () => {
  const recommendationsAPI = 'http://localhost/recommendations';

  let recommendationsService: RecommendationsService;
  let configService: ServiceMock<ConfigService>;
  let cookieService: ServiceMock<CookieService>;
  let httpMock: ServiceMock<HttpClient>;
  let runtimeService: ServiceMock<RuntimeService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        }
      ]
    });
    configService = TestBed.get(ConfigService);
    cookieService = TestBed.get(CookieService);
    httpMock = TestBed.get(HttpClient);
    configService.getConfig.mockReturnValue({ recommendationsAPI });
    runtimeService = TestBed.get(RuntimeService);
    recommendationsService = TestBed.get(RecommendationsService);
  });

  it('should be created', () => {
    expect(recommendationsService).toBeTruthy();
  });

  it('should get recommendation', async () => {
    httpMock.get.mockReturnValue(of('sample'));

    await recommendationsService.getRecommendations();
    expect(httpMock.get).toHaveBeenCalled();
  });
});
