import { TestBed } from '@angular/core/testing';

import { HttpInterceptorService } from './http-interceptor.service';
import { RuntimeService } from '../runtime/runtime.service';
import { mockService } from '../mocks/MockService';

describe('HttpInterceptorService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        HttpInterceptorService,
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        }
      ]
    })
  );

  it('should be created', () => {
    const service: HttpInterceptorService = TestBed.get(HttpInterceptorService);
    expect(service).toBeTruthy();
  });
});
