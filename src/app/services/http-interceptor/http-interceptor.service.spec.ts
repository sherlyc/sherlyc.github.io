import { TestBed } from "@angular/core/testing";

import { HttpInterceptorService } from "./http-interceptor.service";
import { RuntimeService } from "../runtime/runtime.service";
import { mockService, ServiceMock } from "../mocks/MockService";
import { HttpHandler, HttpRequest } from "@angular/common/http";
import { REQUEST } from "@nguniversal/express-engine/tokens";

describe("HttpInterceptorService", () => {
  const requestMock = {
    header: jest.fn()
  };

  let interceptor: HttpInterceptorService;
  let runtimeService: ServiceMock<RuntimeService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpInterceptorService,
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        },
        {
          provide: REQUEST,
          useFactory: () => requestMock
        }
      ]
    });
    interceptor = TestBed.get(HttpInterceptorService);
    runtimeService = TestBed.get(RuntimeService);
    requestMock.header.mockReset();
  });

  it("should prefix url with localhost in ssr", () => {
    runtimeService.isServer.mockReturnValue(true);
    runtimeService.isBrowser.mockReturnValue(false);

    const fakeHttpRequest = {
      url: "/spade/api/content",
      clone: function(extra: any) {
        return { ...this, ...extra };
      }
    } as HttpRequest<any>;

    const fakeHttpHandler = {
      handle: jest.fn()
    } as HttpHandler;

    interceptor.intercept(fakeHttpRequest, fakeHttpHandler);

    expect(fakeHttpHandler.handle).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "http://localhost:4000/spade/api/content"
      })
    );
  });

  it("should add Authorization headers", () => {
    runtimeService.isServer.mockReturnValue(true);
    runtimeService.isBrowser.mockReturnValue(false);

    requestMock.header.mockReturnValue("fakeAuthHeader");

    const fakeHttpRequest = {
      url: "/spade/api/content",
      clone: function(extra: any) {
        return { ...this, ...extra };
      }
    } as HttpRequest<any>;

    const fakeHttpHandler = {
      handle: jest.fn()
    } as HttpHandler;

    interceptor.intercept(fakeHttpRequest, fakeHttpHandler);

    expect(fakeHttpHandler.handle).toHaveBeenCalledWith(
      expect.objectContaining({
        withCredentials: true,
        setHeaders: { Authorization: "fakeAuthHeader" }
      })
    );
  });
});
