import { RedirectRouteGuard } from './redirect-route.guard';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { mockService, ServiceMock } from '../services/mocks/MockService';
import { CookieService } from '../services/cookie/cookie.service';
import { WindowService } from '../services/window/window.service';
import { RuntimeService } from '../services/runtime/runtime.service';
import { DeviceService } from '../services/device/device.service';
import { DeviceType } from '../../../common/DeviceType';
import { ConfigService } from '../services/config/config.service';

const OriginalNow = global.Date.now;

describe('RouteGuard', () => {
  let cookieService: ServiceMock<CookieService>;
  let windowService: ServiceMock<WindowService>;
  let runtimeService: ServiceMock<RuntimeService>;
  let deviceService: ServiceMock<DeviceService>;
  let configService: ServiceMock<ConfigService>;

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
        },
        {
          provide: ConfigService,
          useClass: mockService(ConfigService)
        }
      ]
    });
    cookieService = TestBed.get(CookieService);
    windowService = TestBed.get(WindowService);
    runtimeService = TestBed.get(RuntimeService);
    deviceService = TestBed.get(DeviceService);
    configService = TestBed.get(ConfigService);
  });

  afterEach(() => {
    global.Date.now = OriginalNow;
  });

  it('should not do anything when in server', () => {
    runtimeService.isServer.mockReturnValue(true);
    const routeGuard = new RedirectRouteGuard(
      cookieService,
      windowService,
      runtimeService,
      deviceService,
      configService
    );

    const result = routeGuard.canActivate(
      new ActivatedRouteSnapshot(),
      <RouterStateSnapshot>{}
    );

    expect(result).toBeTruthy();
    expect(cookieService.set).not.toHaveBeenCalled();
    expect(windowService.getWindow).not.toHaveBeenCalled();
    expect(deviceService.getDevice).not.toHaveBeenCalled();
  });

  describe('when redirecting', () => {
    beforeEach(() => {
      runtimeService.isServer.mockReturnValue(false);
      configService.getConfig.mockReturnValue({
        redirectUrl: 'https://www.stuff.co.nz'
      });
    });

    it('should not set cookie when site-view cookie is desktop', () => {
      cookieService.get.mockReturnValue('d');
      windowService.getWindow.mockReturnValue({
        location: { href: 'https://i.stuff.co.nz' }
      });
      const routeGuard = new RedirectRouteGuard(
        cookieService,
        windowService,
        runtimeService,
        deviceService,
        configService
      );

      const result = routeGuard.canActivate(
        new ActivatedRouteSnapshot(),
        <RouterStateSnapshot>{}
      );

      expect(windowService.getWindow().location.href).toBe(
        'https://www.stuff.co.nz'
      );
      expect(cookieService.set).not.toHaveBeenCalled();
      expect(result).toBeFalsy();
    });

    it('should set cookie when site-view cookie is not set and device is desktop', () => {
      cookieService.get.mockReturnValue(null);
      deviceService.getDevice.mockReturnValue(DeviceType.desktop);
      windowService.getWindow.mockReturnValue({
        location: { href: 'https://i.stuff.co.nz', hostname: 'i.stuff.co.nz' }
      });

      const date = new Date('2019-01-01T00:00:00.000Z');
      const oneYearFromNow = new Date('2020-01-01T00:00:00.000Z');
      (global as any).Date.now = () => date;

      const routeGuard = new RedirectRouteGuard(
        cookieService,
        windowService,
        runtimeService,
        deviceService,
        configService
      );

      const result = routeGuard.canActivate(
        new ActivatedRouteSnapshot(),
        <RouterStateSnapshot>{}
      );

      expect(windowService.getWindow().location.href).toBe(
        'https://www.stuff.co.nz'
      );
      expect(cookieService.set).toHaveBeenCalledWith('site-view', 'd', {
        domain: '.stuff.co.nz',
        path: '/',
        expires: oneYearFromNow
      });
      expect(result).toBeFalsy();
    });
  });

  describe('when not redirecting', () => {
    beforeEach(() => {
      runtimeService.isServer.mockReturnValue(false);
      configService.getConfig.mockReturnValue({
        redirectUrl: 'https://www.stuff.co.nz'
      });
    });

    it('should not set cookie when site-view cookie is mobile', () => {
      cookieService.get.mockReturnValue('i');
      windowService.getWindow.mockReturnValue({
        location: { href: 'https://i.stuff.co.nz', hostname: 'i.stuff.co.nz' }
      });
      const routeGuard = new RedirectRouteGuard(
        cookieService,
        windowService,
        runtimeService,
        deviceService,
        configService
      );

      const result = routeGuard.canActivate(
        new ActivatedRouteSnapshot(),
        <RouterStateSnapshot>{}
      );

      expect(windowService.getWindow().location.href).toBe(
        'https://i.stuff.co.nz'
      );
      expect(cookieService.set).not.toHaveBeenCalled();
      expect(result).toBeTruthy();
    });

    it.each([[DeviceType.mobile], [DeviceType.tablet], [DeviceType.unknown]])(
      'should set cookie when site-view cookie is not set and device is %s',
      (deviceType: DeviceType) => {
        cookieService.get.mockReturnValue(null);
        windowService.getWindow.mockReturnValue({
          location: { href: 'https://i.stuff.co.nz', hostname: 'i.stuff.co.nz' }
        });
        const date = new Date('2019-01-01T00:00:00.000Z');
        const oneYearFromNow = new Date('2020-01-01T00:00:00.000Z');
        (global as any).Date.now = () => date;

        deviceService.getDevice.mockReturnValue(deviceType);
        const routeGuard = new RedirectRouteGuard(
          cookieService,
          windowService,
          runtimeService,
          deviceService,
          configService
        );

        const result = routeGuard.canActivate(
          new ActivatedRouteSnapshot(),
          <RouterStateSnapshot>{}
        );

        expect(windowService.getWindow().location.href).toBe(
          'https://i.stuff.co.nz'
        );
        expect(cookieService.set).toHaveBeenCalledWith('site-view', 'i', {
          domain: '.stuff.co.nz',
          path: '/',
          expires: oneYearFromNow
        });
        expect(result).toBeTruthy();
      }
    );
  });

  it.each([
    ['i.stuff.co.nz', '.stuff.co.nz'],
    ['www.stuff.co.nz', '.stuff.co.nz'],
    ['localhost', 'localhost'],
    [
      'experience.expproduction.shift21.ffx.nz',
      'experience.expproduction.shift21.ffx.nz'
    ]
  ])(
    'when hostname is %s, it should set cookie domain to %s',
    (hostname: string, expectedCookieDomain: string) => {
      runtimeService.isServer.mockReturnValue(false);
      cookieService.get.mockReturnValue(null);
      windowService.getWindow.mockReturnValue({
        location: { href: 'https://i.stuff.co.nz', hostname }
      });
      const date = new Date('2019-01-01T00:00:00.000Z');
      const oneYearFromNow = new Date('2020-01-01T00:00:00.000Z');
      (global as any).Date.now = () => date;
      const routeGuard = new RedirectRouteGuard(
        cookieService,
        windowService,
        runtimeService,
        deviceService,
        configService
      );

      const result = routeGuard.canActivate(
        new ActivatedRouteSnapshot(),
        <RouterStateSnapshot>{}
      );

      expect(windowService.getWindow().location.href).toBe(
        'https://i.stuff.co.nz'
      );
      expect(cookieService.set).toHaveBeenCalledWith('site-view', 'i', {
        domain: expectedCookieDomain,
        path: '/',
        expires: oneYearFromNow
      });
      expect(result).toBeTruthy();
    }
  );

  it('should redirect to redirectUrl given by config service', () => {
    runtimeService.isServer.mockReturnValue(false);
    cookieService.get.mockReturnValue('d');
    const redirectUrl = 'https://www-preprod.stuff.co.nz';
    configService.getConfig.mockReturnValue({
      redirectUrl
    });
    windowService.getWindow.mockReturnValue({
      location: { href: 'https://i.stuff.co.nz' }
    });
    const routeGuard = new RedirectRouteGuard(
      cookieService,
      windowService,
      runtimeService,
      deviceService,
      configService
    );

    routeGuard.canActivate(
      new ActivatedRouteSnapshot(),
      <RouterStateSnapshot>{}
    );

    expect(windowService.getWindow().location.href).toBe(redirectUrl);
  });
});
