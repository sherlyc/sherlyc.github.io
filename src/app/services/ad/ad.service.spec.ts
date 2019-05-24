import { TestBed } from '@angular/core/testing';
import { AdService } from './ad.service';
import { ConfigService } from '../config/config.service';
import { mockService, ServiceMock } from '../mocks/MockService';
import { ScriptInjectorService } from '../script-injector/script-injector.service';
import { DOCUMENT } from '@angular/common';

describe('AdService', () => {
  let scriptInjectorService: ServiceMock<ScriptInjectorService>;
  let configMock: ServiceMock<ConfigService>;
  let adService: AdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConfigService,
          useClass: mockService(ConfigService)
        },
        {
          provide: ScriptInjectorService,
          useClass: mockService(ScriptInjectorService)
        }
      ]
    });

    scriptInjectorService = TestBed.get(ScriptInjectorService);
    configMock = TestBed.get(ConfigService);
    adService = TestBed.get(AdService);
  });

  it('should be created', () => {
    expect(adService).toBeTruthy();
  });

  it('should delegate to script injector to load the script on setup', async () => {
    const aadSdkUrl = 'http://whatever_url/';
    configMock.getConfig.mockReturnValue({ aadSdkUrl });
    await adService.setup();
    expect(scriptInjectorService.load).toHaveBeenCalledWith(
      'aad-sdk',
      aadSdkUrl
    );
  });

  it('should notify the adnostic sdk', (done) => {
    const document: Document = TestBed.get(DOCUMENT);
    document.dispatchEvent = jest.fn();
    adService.notify();
    setTimeout(() => {
      const fakeEvent = new Event('NavigationEnd');
      expect(document.dispatchEvent).toHaveBeenCalledWith(fakeEvent);
      done();
    });
  });
});
