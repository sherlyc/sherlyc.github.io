import { RouteGuard } from './route.guard';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { mockService, ServiceMock } from './services/mocks/MockService';
import { CookieService } from './services/cookie/cookie.service';
import { WindowService } from './services/window/window.service';
import { RuntimeService } from './services/runtime/runtime.service';
import { DeviceService } from './services/device.service';
import { DeviceType } from '../../common/DeviceType';

describe('RouteGuard', () => {
  let cookieService: ServiceMock<CookieService>;
  let windowService: ServiceMock<WindowService>;
  let runtimeService: ServiceMock<RuntimeService>;
  let deviceService: ServiceMock<DeviceService>;

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
        },
        {
          provide: DeviceService,
          useClass: mockService(DeviceService)
        }
      ]
    });
    cookieService = TestBed.get(CookieService);
    windowService = TestBed.get(WindowService);
    runtimeService = TestBed.get(RuntimeService);
    deviceService = TestBed.get(DeviceService);
  });

  describe('when site view is not set', () => {
    beforeEach(() => {
      cookieService.get.mockReturnValue(null);
    });

    it('should return false if device is not mobile', () => {
      deviceService.getDevice.mockReturnValue(DeviceType.unknown);
      const routeGuard = new RouteGuard(cookieService, windowService, runtimeService, deviceService);

      const result = routeGuard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{});

      expect(result).toBeFalsy();
    });

    it('should return true if device is mobile', () => {
      deviceService.getDevice.mockReturnValue(DeviceType.mobile);
      const routeGuard = new RouteGuard(cookieService, windowService, runtimeService, deviceService);

      const result = routeGuard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{});

      expect(result).toBeTruthy();
    });
  });

});
