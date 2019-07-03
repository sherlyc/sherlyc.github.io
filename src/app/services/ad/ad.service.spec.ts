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

  it('should notify ie11', (done) => {
    const document: ServiceMock<Document> = TestBed.get(DOCUMENT);
    document.dispatchEvent = jest.fn();
    document.createEvent = jest.fn();

    const fakeEvent = {
      initEvent: jest.fn()
    };

    document.createEvent.mockReturnValue(fakeEvent);
    (window as any).Event = { prototype: { constructor: {} } };
    adService.notify();
    setTimeout(() => {
      expect(document.createEvent).toHaveBeenCalledWith('Event');
      expect(fakeEvent.initEvent).toHaveBeenCalledWith(
        'NavigationEnd',
        true,
        true
      );
      expect(document.dispatchEvent).toHaveBeenCalledWith(fakeEvent);
      done();
    });
  });
});
