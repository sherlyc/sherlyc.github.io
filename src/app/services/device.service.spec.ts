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

  it.each([
    [DeviceType.mobile, 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H)'],
    [DeviceType.tablet, 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) Safari/604.1'],
    [DeviceType.desktop, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) Chrome/78.0.3904.97 Safari/537.36'],
    [DeviceType.unknown, 'Invalid UserAgent']
  ])('should get %s device from user agent %s', (device: string, userAgent: string) => {
    windowService.getWindow.mockReturnValue({
      navigator: { userAgent }
    });

    const result = deviceService.getDevice();

    expect(result).toEqual(device);
  });
});
