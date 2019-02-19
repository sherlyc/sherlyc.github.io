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
import { RuntimeService } from '../runtime/runtime.service';
import { RuntimeServiceMock } from '../runtime/runtime.service.mock';
import { TransferState } from '@angular/platform-browser';
import { TransferStateMock } from '../mocks/transfer-state.mock';

describe('ContentRetrieverService', () => {
  let contentRetrieverService: ContentRetrieverService;
  let httpMock: HttpTestingController;
  let configServiceMock: ConfigServiceMock;
  let runtimeMock: RuntimeServiceMock;
  let transferStateMock: TransferStateMock;

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
        },
        {
          provide: RuntimeService,
          useClass: RuntimeServiceMock
        },
        {
          provide: TransferState,
          useClass: TransferStateMock
        }
      ]
    });

    contentRetrieverService = TestBed.get(ContentRetrieverService);
    httpMock = TestBed.get(HttpTestingController);
    configServiceMock = TestBed.get(ConfigService);
    runtimeMock = TestBed.get(RuntimeService);
    transferStateMock = TestBed.get(TransferState);
  });

  describe('in browser', () => {
    beforeEach(() => {
      configServiceMock.getConfig.mockReturnValue({ spadeAPI });
      runtimeMock.isServer.mockResolvedValue(false);
      runtimeMock.isBrowser.mockResolvedValue(true);
    });

    it('should return data from transfer-state if available', (done) => {
      transferStateMock.get.mockReturnValue(jsonfeed);
      contentRetrieverService.getContent().subscribe((response) => {
        expect(response).toEqual(jsonfeed);
        done();
      });
    });

    it('should fetch article data if not available in state', (done) => {
      transferStateMock.get.mockReturnValue(null);
      contentRetrieverService.getContent().subscribe((response) => {
        expect(response).toEqual(jsonfeed);
        done();
      });

      const req = httpMock.expectOne(spadeAPI);
      expect(req.request.method).toBe('GET');
      req.flush(jsonfeed);
    });

    it('should return an error content block when the request fails', (done) => {
      contentRetrieverService.getContent().subscribe(
        (response) => {
          expect(response).toEqual(
            expect.arrayContaining([
              { type: 'Header' },
              {
                type: 'Container',
                items: [expect.objectContaining({ type: 'ErrorBlock' })]
              },
              { type: 'Footer' }
            ])
          );
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

  describe('in server', () => {
    beforeEach(() => {
      configServiceMock.getConfig.mockReturnValue({ spadeAPI });
      runtimeMock.isServer.mockResolvedValue(true);
      runtimeMock.isBrowser.mockResolvedValue(false);
    });

    it('should add result to transfer-state', (done) => {
      transferStateMock.get.mockReturnValue(null);
      contentRetrieverService.getContent().subscribe((response) => {
        expect(transferStateMock.set).toHaveBeenCalledWith('KEY', jsonfeed);
        done();
      });

      const req = httpMock.expectOne(spadeAPI);
      expect(req.request.method).toBe('GET');
      req.flush(jsonfeed);
    });

    it('should return data from transfer-state if available', (done) => {
      transferStateMock.get.mockReturnValue(jsonfeed);
      contentRetrieverService.getContent().subscribe((response) => {
        expect(response).toEqual(jsonfeed);
        done();
      });
    });

    it('should fetch article data if not available in state', (done) => {
      transferStateMock.get.mockReturnValue(null);
      contentRetrieverService.getContent().subscribe((response) => {
        expect(response).toEqual(jsonfeed);
        done();
      });

      const req = httpMock.expectOne(spadeAPI);
      expect(req.request.method).toBe('GET');
      req.flush(jsonfeed);
    });

    it('should return an error content block when the request fails', (done) => {
      contentRetrieverService.getContent().subscribe(
        (response) => {
          expect(response).toEqual(
            expect.arrayContaining([
              { type: 'Header' },
              {
                type: 'Container',
                items: [expect.objectContaining({ type: 'ErrorBlock' })]
              },
              { type: 'Footer' }
            ])
          );
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
});
