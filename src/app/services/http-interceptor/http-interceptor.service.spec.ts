import { TestBed } from '@angular/core/testing';
import { HttpInterceptorService } from './http-interceptor.service';
import { CookieService } from '../cookie/cookie.service';
import { RuntimeService } from '../runtime/runtime.service';
import { mockService, ServiceMock } from '../mocks/MockService';
import { HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { CorrelationService } from '../correlation/correlation.service';

describe('HttpInterceptorService', () => {
  let runtimeServiceMock: ServiceMock<RuntimeService>;
  let cookieServiceMock: ServiceMock<CookieService>;
  let httpInterceptorService: ServiceMock<HttpInterceptorService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpInterceptorService,
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        },
        {
          provide: CookieService,
          useClass: mockService(CookieService)
        }
      ]
    });
    runtimeServiceMock = TestBed.get(RuntimeService);
    cookieServiceMock = TestBed.get(CookieService);
    httpInterceptorService = TestBed.get(HttpInterceptorService);
  });

  it('should be created', () => {
    expect(httpInterceptorService).toBeTruthy();
  });

  it('should intercept request from browser runtime', () => {
    const req: HttpRequest<any> = new HttpRequest('GET', 'http://endpoint.com');
    const next: HttpHandler = { handle: jest.fn() };
    runtimeServiceMock.isBrowser.mockReturnValue(true);

    httpInterceptorService.intercept(req, next);

    expect(next.handle).toHaveBeenCalledWith(req);
  });

  it('should intercept request from server runtime', () => {
    const req: HttpRequest<any> = new HttpRequest('GET', 'http://endpoint.com');
    const next: HttpHandler = { handle: jest.fn() };
    runtimeServiceMock.isBrowser.mockReturnValue(false);
    cookieServiceMock.getAll.mockReturnValue({ breakingNewsID: '1' });

    const expectedReq = req.clone({
      setHeaders: {
        Cookie: 'breakingNewsID=1'
      },
      withCredentials: true
    });

    httpInterceptorService.intercept(req, next);

    expect(next.handle).toHaveBeenCalledWith(expectedReq);
  });
});
