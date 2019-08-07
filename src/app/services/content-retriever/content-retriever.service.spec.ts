import { TestBed } from '@angular/core/testing';
import { ContentRetrieverService } from './content-retriever.service';
import * as jsonfeed from './__fixtures__/contentBlockArticles.json';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ConfigService } from '../config/config.service';
import { LoggerService } from '../logger/logger.service';
import { RuntimeService } from '../runtime/runtime.service';
import { TransferState } from '@angular/platform-browser';
import { mockService, ServiceMock } from '../mocks/MockService';

describe('ContentRetrieverService', () => {
  let contentRetrieverService: ContentRetrieverService;
  let httpMock: HttpTestingController;
  let configServiceMock: ServiceMock<ConfigService>;
  let runtimeMock: ServiceMock<RuntimeService>;
  let transferStateMock: ServiceMock<TransferState>;

  const spadeAPI = 'http://localhost';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: LoggerService,
          useClass: mockService(LoggerService)
        },
        {
          provide: ConfigService,
          useClass: mockService(ConfigService)
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        },
        {
          provide: TransferState,
          useClass: mockService(TransferState)
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
      runtimeMock.isServer.mockReturnValue(false);
      runtimeMock.isBrowser.mockReturnValue(true);
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
  });

  describe('in server', () => {
    beforeEach(() => {
      configServiceMock.getConfig.mockReturnValue({ spadeAPI });
      runtimeMock.isServer.mockReturnValue(true);
      runtimeMock.isBrowser.mockReturnValue(false);
    });

    it('should add result to transfer-state', (done) => {
      transferStateMock.get.mockReturnValue(null);
      contentRetrieverService.getContent().subscribe(() => {
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
  });
});
