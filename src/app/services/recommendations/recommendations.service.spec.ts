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
        limitPerSegment: 1
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
        expect(req.params.get('segments')).toBe('a=123;b=456');
        expect(req.params.get('totalBasicArticlesUnit')).toBe('2');
        expect(req.params.get('totalBasicArticleTitleUnit')).toBe('3');
        return true;
      })
      .flush(articles);

    httpMock.verify();
  });

  it('should get recommendations when cookie is undefined', () => {
    cookieService.get.mockReturnValue(undefined);
    const articles = ['article one'];

    recommendationsService.getRecommendations().subscribe((res) => {
      expect(res).toEqual(articles);
    });

    httpMock
      .expectOne((req) => {
        expect(req.method).toBe('GET');
        expect(req.url).toBe(recommendationsAPI);
        expect(req.params.get('segments')).toBe('');
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
    describe('should only parse selected segments', () => {
      test.each`
        segments               | input                                          | expected
        ${['enth', 'rt', 'x']} | ${'geo=akl;rt=nanz;enth=amuh;rt=nbnsu'}        | ${'enth=amuh;rt=nanz'}
        ${['enth', 'geo']}     | ${'geo=akl;rt=nanz;enth=amuh;rt=nbnsu;rt=tsv'} | ${'enth=amuh;geo=akl'}
        ${['x']}               | ${'geo=akl;enth=amuh;rt=nbnsu;rt=tsv'}         | ${''}
        ${[]}                  | ${'geo=akl;enth=amuh'}                         | ${''}
      `(
        'for $segments - $input returns $expected',
        ({ segments, input, expected }) => {
          configService.getConfig.mockReturnValue({
            recommendationsCookie: {
              segments,
              limitPerSegment: 1
            }
          });

          expect(recommendationsService.parseCookie(input)).toBe(expected);
        }
      );
    });

    describe('should parse up to the limitPerSegment for each segment', () => {
      test.each`
        segments          | limitPerSegment | input                               | expected
        ${['enth']}       | ${0}            | ${'enth=aaa;enth=bbb;geo=akl'}      | ${''}
        ${['enth']}       | ${1}            | ${'enth=aaa;enth=bbb;geo=akl'}      | ${'enth=aaa'}
        ${['enth']}       | ${2}            | ${'enth=aaa;enth=bbb;geo=akl'}      | ${'enth=aaa;enth=bbb'}
        ${['enth', 'rt']} | ${2}            | ${'geo=akl;rt=aaa;enth=aaa;rt=bbb'} | ${'enth=aaa;rt=aaa;rt=bbb'}
      `(
        'for limitPerSegment of $limitPerSegment and selected segments ($segments) - $input returns $expected',
        ({ segments, limitPerSegment, input, expected }) => {
          configService.getConfig.mockReturnValue({
            recommendationsCookie: {
              segments,
              limitPerSegment
            }
          });

          expect(recommendationsService.parseCookie(input)).toBe(expected);
        }
      );
    });
  });
});
