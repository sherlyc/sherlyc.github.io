import { TestBed } from '@angular/core/testing';
import { ContentRetrieverService } from './content-retriever.service';
import * as jsonfeed from './__fixtures__/contentBlockArticles.json';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ConfigService } from '../config/config.service';
import { ConfigServiceMock } from '../config/config.service.mock';
import { LoggerService } from '../logger/logger.service';
import { LoggerServiceMock } from '../logger/logger.service.mock';

describe('ContentRetrieverService', () => {
  let contentRetrieverService: ContentRetrieverService;
  let httpMock: HttpTestingController;
  let configServiceMock: ConfigServiceMock;

  const spadeAPI = 'http://localhost';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: LoggerService,
          useClass: LoggerServiceMock
        },
        {
          provide: ConfigService,
          useClass: ConfigServiceMock
        }
      ]
    });

    contentRetrieverService = TestBed.get(ContentRetrieverService);
    httpMock = TestBed.get(HttpTestingController);
    configServiceMock = TestBed.get(ConfigService);
  });

  it('should fetch article data correctly', (done) => {
    configServiceMock.getConfig.mockReturnValue({ spadeAPI });

    contentRetrieverService.getContent().subscribe((response) => {
      expect(response).toEqual(jsonfeed);
      done();
    });

    const req = httpMock.expectOne(spadeAPI);
    expect(req.request.method).toBe('GET');
    req.flush(jsonfeed);
  });

  it('should return an error content block when the request fails', (done) => {
    configServiceMock.getConfig.mockReturnValue({ spadeAPI });

    contentRetrieverService.getContent().subscribe(
      (response) => {
        expect(response).toHaveLength(1);
        expect(response[0].type).toEqual('ErrorBlock');
        done();
      },
      (err) => {
        fail(err);
      }
    );

    const req = httpMock.expectOne(spadeAPI);
    expect(req.request.method).toBe('GET');
    req.flush(
      { data: 'something went wrong' },
      { status: 500, statusText: 'Server error' }
    );
  });
});
