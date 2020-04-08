import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { TransferState } from "@angular/platform-browser";
import { RESPONSE } from "@nguniversal/express-engine/tokens";
import { ConfigService } from "../config/config.service";
import { LoggerService } from "../logger/logger.service";
import { mockService, ServiceMock } from "../mocks/MockService";
import { RuntimeService } from "../runtime/runtime.service";
import { ContentRetrieverService } from "./content-retriever.service";

const jsonfeed = require("./__fixtures__/contentBlockArticles.json");

describe("ContentRetrieverService", () => {
  let contentRetrieverService: ContentRetrieverService;
  let httpMock: HttpTestingController;
  let configServiceMock: ServiceMock<ConfigService>;
  let runtimeMock: ServiceMock<RuntimeService>;
  let transferStateMock: ServiceMock<TransferState>;

  const spadeAPI = "http://localhost";

  const responseMock = {
    sendStatus: jest.fn()
  };

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
        },
        {
          provide: RESPONSE,
          useFactory: () => responseMock
        }
      ]
    });

    contentRetrieverService = TestBed.inject(
      ContentRetrieverService
    ) as ServiceMock<ContentRetrieverService>;
    httpMock = TestBed.inject(HttpTestingController) as ServiceMock<
      HttpTestingController
    >;
    configServiceMock = TestBed.inject(ConfigService) as ServiceMock<
      ConfigService
    >;
    runtimeMock = TestBed.inject(RuntimeService) as ServiceMock<RuntimeService>;
    transferStateMock = TestBed.inject(TransferState) as ServiceMock<
      TransferState
    >;
    responseMock.sendStatus.mockReset();
  });

  describe("in browser", () => {
    beforeEach(() => {
      configServiceMock.getConfig.mockReturnValue({ spadeAPI });
      runtimeMock.isServer.mockReturnValue(false);
      runtimeMock.isBrowser.mockReturnValue(true);
    });

    it("should return data from transfer-state if available", (done) => {
      transferStateMock.get.mockReturnValue(jsonfeed);
      contentRetrieverService.getContent().subscribe((response) => {
        expect(response).toEqual(jsonfeed);
        done();
      });
    });

    it("should fetch article data if not available in state", (done) => {
      transferStateMock.get.mockReturnValue(null);
      contentRetrieverService.getContent().subscribe((response) => {
        expect(response).toEqual(jsonfeed);
        done();
      });

      const req = httpMock.expectOne(spadeAPI);
      expect(req.request.method).toBe("GET");
      req.flush(jsonfeed);
    });
  });

  describe("in server", () => {
    beforeEach(() => {
      configServiceMock.getConfig.mockReturnValue({ spadeAPI });
      runtimeMock.isServer.mockReturnValue(true);
      runtimeMock.isBrowser.mockReturnValue(false);
    });

    it("should set http 500 when error", (done) => {
      responseMock.sendStatus = jest.fn();
      contentRetrieverService.getContent().subscribe(() => {
        expect(responseMock.sendStatus).toHaveBeenCalledWith(500);
        done();
      });
      let req = httpMock.expectOne(spadeAPI);
      req.error({} as ErrorEvent, { status: 500, statusText: "Server Error" });
      req = httpMock.expectOne(spadeAPI);
      req.error({} as ErrorEvent, { status: 500, statusText: "Server Error" });
      req = httpMock.expectOne(spadeAPI);
      req.error({} as ErrorEvent, { status: 500, statusText: "Server Error" });
      req = httpMock.expectOne(spadeAPI);
      req.error({} as ErrorEvent, { status: 500, statusText: "Server Error" });
    });

    it("should add result to transfer-state", (done) => {
      transferStateMock.get.mockReturnValue(null);
      contentRetrieverService.getContent().subscribe(() => {
        expect(transferStateMock.set).toHaveBeenCalledWith("KEY", jsonfeed);
        done();
      });

      const req = httpMock.expectOne(spadeAPI);
      expect(req.request.method).toBe("GET");
      req.flush(jsonfeed);
    });

    it("should return data from transfer-state if available", (done) => {
      transferStateMock.get.mockReturnValue(jsonfeed);
      contentRetrieverService.getContent().subscribe((response) => {
        expect(response).toEqual(jsonfeed);
        done();
      });
    });

    it("should fetch article data if not available in state", (done) => {
      transferStateMock.get.mockReturnValue(null);
      contentRetrieverService.getContent().subscribe((response) => {
        expect(response).toEqual(jsonfeed);
        done();
      });

      const req = httpMock.expectOne(spadeAPI);
      expect(req.request.method).toBe("GET");
      req.flush(jsonfeed);
    });
  });
});
