import { TestBed } from '@angular/core/testing';

import { DeviceService } from './device.service';
import { WindowService } from './window/window.service';
import { mockService, ServiceMock } from './mocks/MockService';
import { DeviceType } from '../../../common/DeviceType';

describe('DeviceService', () => {
  let deviceService: DeviceService;
  let windowService: ServiceMock<WindowService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: WindowService,
          useClass: mockService(WindowService)
        }
      ]
    });

    windowService = TestBed.get(WindowService);
    deviceService = TestBed.get(DeviceService);
  });

  it('should be created', () => {
    expect(deviceService).toBeTruthy();
  });

  it('should get mobile device type', () => {
    const mobileAgent =
      'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H)';
    windowService.getWindow.mockReturnValue({
      navigator: { userAgent: mobileAgent }
    });

    const result = deviceService.getDevice();

    expect(result).toEqual(DeviceType.mobile);
  });

  it('should get tablet device type', () => {
    const tabletAgent =
      'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) Safari/604.1';
    windowService.getWindow.mockReturnValue({
      navigator: { userAgent: tabletAgent }
    });

    const result = deviceService.getDevice();

    expect(result).toEqual(DeviceType.tablet);
  });

  it('should get desktop device type', () => {
    const desktopAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) Chrome/78.0.3904.97 Safari/537.36';
    windowService.getWindow.mockReturnValue({
      navigator: { userAgent: desktopAgent }
    });

    const result = deviceService.getDevice();

    expect(result).toEqual(DeviceType.desktop);
  });

  it('should get unknown device type', () => {
    const randomAgent = 'what is this';
    windowService.getWindow.mockReturnValue({
      navigator: { userAgent: randomAgent }
    });

    const result = deviceService.getDevice();

    expect(result).toEqual(DeviceType.unknown);
  });
});
