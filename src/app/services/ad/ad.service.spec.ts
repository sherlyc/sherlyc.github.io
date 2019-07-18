import { TestBed } from '@angular/core/testing';
import { AdService } from './ad.service';
import { ConfigService } from '../config/config.service';
import { mockService, ServiceMock } from '../mocks/MockService';
import { ScriptInjectorService } from '../script-injector/script-injector.service';
import { DOCUMENT } from '@angular/common';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '../logger/logger.service';

describe('AdService', () => {
  let scriptInjectorService: ServiceMock<ScriptInjectorService>;
  let configMock: ServiceMock<ConfigService>;
  let httpClient: ServiceMock<HttpClient>;
  let adService: AdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConfigService,
          useClass: mockService(ConfigService)
        },
        {
          provide: HttpClient,
          useClass: mockService(HttpClient)
        },
        {
          provide: LoggerService,
          useClass: mockService(LoggerService)
        },
        {
          provide: ScriptInjectorService,
          useClass: mockService(ScriptInjectorService)
        }
      ]
    });

    scriptInjectorService = TestBed.get(ScriptInjectorService);
    httpClient = TestBed.get(HttpClient);
    configMock = TestBed.get(ConfigService);
    adService = TestBed.get(AdService);
  });

  it('should be created', () => {
    expect(adService).toBeTruthy();
  });

  it('should delegate to script injector to load the script on setup', async () => {
    const manifestUrl = 'http://manifest_url/';
    const aadSdkUrl = 'http://whatever_url/';

    configMock.getConfig.mockReturnValue({ aadSdkUrl: manifestUrl });

    httpClient.get.mockReturnValue(of({ url: aadSdkUrl }));

    await adService.setup();

    expect(scriptInjectorService.load).toHaveBeenCalledWith(
      'aad-sdk',
      aadSdkUrl
    );
  });

  it('should notify the adnostic sdk', async () => {
    const document: Document = TestBed.get(DOCUMENT);
    document.dispatchEvent = jest.fn();
    await adService.notify();

    const fakeEvent = new Event('NavigationEnd');
    expect(document.dispatchEvent).toHaveBeenCalledWith(fakeEvent);
  });

  it('should notify the adnostic sdk in IE11', async () => {
    const document: ServiceMock<Document> = TestBed.get(DOCUMENT);
    document.dispatchEvent = jest.fn();
    document.createEvent = jest.fn();

    const fakeEvent = {
      initEvent: jest.fn()
    };

    document.createEvent.mockReturnValue(fakeEvent);
    (window as any).Event = { prototype: { constructor: {} } };
    await adService.notify();

    expect(document.createEvent).toHaveBeenCalledWith('Event');
    expect(fakeEvent.initEvent).toHaveBeenCalledWith(
      'NavigationEnd',
      true,
      true
    );
    expect(document.dispatchEvent).toHaveBeenCalledWith(fakeEvent);
  });
});
