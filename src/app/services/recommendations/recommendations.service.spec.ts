import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from '../config/config.service';
import { CookieService } from '../cookie/cookie.service';
import { LoggerService } from '../logger/logger.service';
import { mockService, ServiceMock } from '../mocks/MockService';
import { RecommendationsService } from './recommendations.service';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';

describe('RecommendationsService', () => {
  const recommendationsAPI = 'httpMock://localhost/recommendations';

  let recommendationsService: RecommendationsService;
  let configService: ServiceMock<ConfigService>;
  let cookieService: ServiceMock<CookieService>;
  let httpMock: HttpTestingController;
  let loggerService: ServiceMock<LoggerService>;

  const basicArticleUnit: IBasicArticleUnit = {
    type: ContentBlockType.BasicArticleUnit,
    id: '1',
    strapName: 'yup',
    indexHeadline: 'yup',
    introText: 'yup',
    linkUrl: 'yup',
    imageSrc: 'yup',
    imageSrcSet: 'yup',
    lastPublishedTime: 123,
    headlineFlags: []
  };

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
    configService.getConfig.mockReturnValue({
      recommendationsAPI,
      recommendationsCookie: {
        name: 'abc',
        segments: ['a', 'b'],
        maxCount: 1
      }
    });
    loggerService = TestBed.get(LoggerService);

    recommendationsService = TestBed.get(RecommendationsService);
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(recommendationsService).toBeTruthy();
  });

  it('should get recommendations', () => {
    cookieService.get.mockReturnValue('a=123;b=456;c=789');
    const articles = [basicArticleUnit, basicArticleUnit];

    recommendationsService.getRecommendations(2, 3).subscribe((res) => {
      expect(res).toEqual(articles);
    });

    httpMock
      .expectOne((req) => {
        expect(req.method).toBe('GET');
        expect(req.url).toBe(recommendationsAPI);
        expect(req.params.get('segments')).toBe('a%3D123%3Bb%3D456');
        expect(req.params.get('totalBasicArticlesUnit')).toBe('2');
        expect(req.params.get('totalBasicArticleTitleUnit')).toBe('3');
        return true;
      })
      .flush(articles);

    httpMock.verify();
  });

  it('should log warning and throw error when api fails', (done) => {
    recommendationsService.getRecommendations(2, 3).subscribe({
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
      ${['enth', 'rt', 'x']} | ${1}     | ${'geo=akl;geo=aklr;rt=nanz;enth=amuh;rt=nbnsu;rt=tsv'} | ${'enth=amuh;rt=nanz'}
    `('works with $output', ({ keys, maxCount, input, output }) => {
      configService.getConfig.mockReturnValue({
        recommendationsCookie: {
          segments: keys,
          maxCount
        }
      });
      expect(recommendationsService.parseCookie(input)).toBe(output);
    });
  });
});
