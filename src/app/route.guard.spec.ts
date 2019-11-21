import { RouteGuard } from './route.guard';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { mockService, ServiceMock } from './services/mocks/MockService';
import { CookieService } from './services/cookie/cookie.service';
import { WindowService } from './services/window/window.service';
import { RuntimeService } from './services/runtime/runtime.service';

describe('RouteGuard', () => {
  let cookieService: ServiceMock<CookieService>;
  let windowService: ServiceMock<WindowService>;
  let runtimeService: ServiceMock<RuntimeService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CookieService,
          useClass: mockService(CookieService)
        },
        {
          provide: WindowService,
          useClass: mockService(WindowService)
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        }
      ]
    });
    cookieService = TestBed.get(CookieService);
    windowService = TestBed.get(WindowService);
    runtimeService = TestBed.get(RuntimeService);
  });

  describe('when site view is not set', () => {
    it('should return false if device is not mobile', () => {
      const routeGuard = new RouteGuard(cookieService, windowService, runtimeService);
      const result = routeGuard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{});
    });
  });

});
