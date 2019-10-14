import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config/config.service';
import { CookieService } from './cookie/cookie.service';
import { LoggerService } from './logger/logger.service';
import { mockService, ServiceMock } from './mocks/MockService';
import { RecommendationsService } from './recommendations.service';
import { parseCookie } from '../../../server-src/services/adapters/recommendations/recommendations.service';

describe('RecommendationsService', () => {
  const recommendationsAPI = 'httpMock://localhost/recommendations';

  let recommendationsService: RecommendationsService;
  let configService: ServiceMock<ConfigService>;
  let cookieService: ServiceMock<CookieService>;
  let httpMock: HttpTestingController;
  let loggerService: ServiceMock<LoggerService>;

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
          provide: LoggerService,
          useClass: mockService(LoggerService)
        }
      ]
    });
    configService = TestBed.get(ConfigService);
    cookieService = TestBed.get(CookieService);
    httpMock = TestBed.get(HttpTestingController);
    configService.getConfig.mockReturnValue({ recommendationsAPI });
    loggerService = TestBed.get(LoggerService);

    recommendationsService = TestBed.get(RecommendationsService);
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(recommendationsService).toBeTruthy();
  });

  it('should get recommendations', () => {
    configService.getConfig.mockReturnValue({
      recommendationsCookie: {
        name: 'abc',
        segments: ['a', 'b'],
        maxCount: 1
      }
    });
    cookieService.get.mockReturnValue('a=123;b=456;c=789');
    const articles = ['article one'];

    recommendationsService.getRecommendations().subscribe((res) => {
      expect(res).toEqual(articles);
    });

    httpMock
      .expectOne((req) => {
        expect(req.method).toBe('GET');
        expect(req.url).toBe(recommendationsAPI);
        expect(req.params).toBe({
          params: {
            segments: 'a=123;b=456'
          }
        });
        return true;
      })
      .flush(articles);

    httpMock.verify();
  });

  it('should log warning and throw error when api fails', (done) => {
    recommendationsService.getRecommendations().subscribe({
      error: () => {
        expect(loggerService.warn).toHaveBeenCalled();
        done();
      }
    });

    httpMock
      .expectOne((req) => true)
      .flush(null, { status: 500, statusText: 'Internal Server Error' });
    httpMock.verify();
  });

  describe('parseCookie', () => {
    it.each`
      keys                   | maxCount | input                                                   | output
      ${['enth', 'rt', 'x']} | ${1}     | ${'geo=akl;geo=aklr;rt=nanz;enth=amuh;rt=nbnsu;rt=tsv'} | ${'rt=nanz;enth=amuh'}
    `('works with $output', ({ keys, maxCount, input, output }) => {
      expect(parseCookie(keys, maxCount)(input)).toBe(output);
    });
  });
});
