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
});
