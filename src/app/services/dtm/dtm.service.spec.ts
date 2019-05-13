import { TestBed } from '@angular/core/testing';

import { DtmService } from './dtm.service';
import { ScriptInjectorService } from '../script-injector/script-injector.service';
import { mockService, ServiceMock } from '../mocks/MockService';
import { ConfigService } from '../config/config.service';
import { WindowService } from '../window/window.service';
import { IWindow } from '../window/__types__/IWindow';

describe('DtmService', () => {
  let dtmService: DtmService;
  let scriptInjectorService: ServiceMock<ScriptInjectorService>;
  let configService: ServiceMock<ConfigService>;
  let windowService: ServiceMock<WindowService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ScriptInjectorService,
          useClass: mockService(ScriptInjectorService)
        },
        {
          provide: ConfigService,
          useClass: mockService(ConfigService)
        },
        {
          provide: WindowService,
          useClass: mockService(WindowService)
        }
      ]
    });
    dtmService = TestBed.get(DtmService);
    scriptInjectorService = TestBed.get(ScriptInjectorService);
    configService = TestBed.get(ConfigService);
    windowService = TestBed.get(WindowService);
  });

  it('should be created', () => {
    expect(dtmService).toBeTruthy();
  });

  it('should delegate to script injector to load the script on setup', async () => {
    windowService.getWindow.mockReturnValue({});
    scriptInjectorService.load.mockImplementation(() => {
      windowService.getWindow()._satellite = { pageBottom: jest.fn() };
      return Promise.resolve(new Event('loaded'));
    });
    configService.getConfig.mockReturnValue({
      dtmUrl: 'http://example/dtm.js'
    });

    await dtmService.setup();

    expect(scriptInjectorService.load).toHaveBeenCalled();
    expect(windowService.getWindow()._satellite.pageBottom).toHaveBeenCalled();
  });
});
