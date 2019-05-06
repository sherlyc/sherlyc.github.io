import { TestBed } from '@angular/core/testing';

import { DtmService } from './dtm.service';
import { ScriptInjectorService } from '../script-injector/script-injector.service';
import { mockService, ServiceMock } from '../mocks/MockService';
import { ConfigService } from '../config/config.service';

describe('DtmService', () => {
  let dtmService: DtmService;
  let configService: ServiceMock<ConfigService>;
  let scriptInjectorService: ServiceMock<ScriptInjectorService>;
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
        }
      ]
    });
    dtmService = TestBed.get(DtmService);
    configService = TestBed.get(ConfigService);
    scriptInjectorService = TestBed.get(ScriptInjectorService);
  });

  it('should be created', () => {
    expect(dtmService).toBeTruthy();
  });

  it('should delegate to script injector to load the script after the setup', () => {
    configService.getConfig.mockReturnValue({
      dtmUrl: 'http://example/dtm.js'
    });

    dtmService.setup();

    expect(scriptInjectorService.load).toHaveBeenCalled();
  });
});
