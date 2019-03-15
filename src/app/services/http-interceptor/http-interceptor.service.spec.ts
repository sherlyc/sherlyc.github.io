import { TestBed } from '@angular/core/testing';

import { HttpInterceptorService } from './http-interceptor.service';
import { CookieService } from '../cookie/cookie.service';
import { RuntimeService } from '../runtime/runtime.service';
import { RuntimeServiceMock } from '../runtime/runtime.service.mock';
import { CookieServiceMock } from '../cookie/cookie.service.mock';

describe('HttpInterceptorService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        HttpInterceptorService,
        {
          provide: RuntimeService,
          useClass: RuntimeServiceMock
        },
        {
          provide: CookieService,
          useClass: CookieServiceMock
        }
      ]
    })
  );

  it('should be created', () => {
    const service: HttpInterceptorService = TestBed.get(HttpInterceptorService);
    expect(service).toBeTruthy();
  });
});
