import { TestBed } from '@angular/core/testing';
import { AdService } from './ad.service';
import { ConfigService } from '../config/config.service';
import { mockService, ServiceMock } from '../mocks/MockService';
import { ScriptInjectorService } from '../script-injector/script-injector.service';
import { DOCUMENT } from '@angular/common';
import { of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '../logger/logger.service';
import { RuntimeService } from '../runtime/runtime.service';
import { FeatureSwitchService } from '../feature-switch/feature-switch.service';

describe('AdService', () => {
  let scriptInjectorService: ServiceMock<ScriptInjectorService>;
  let configMock: ServiceMock<ConfigService>;
  let httpClient: ServiceMock<HttpClient>;
  let logger: ServiceMock<LoggerService>;
  let featureSwitch: ServiceMock<FeatureSwitchService>;
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
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        },
        {
          provide: FeatureSwitchService,
          useClass: mockService(FeatureSwitchService)
        }
      ]
    });

    scriptInjectorService = TestBed.get(ScriptInjectorService);
    httpClient = TestBed.get(HttpClient);
    configMock = TestBed.get(ConfigService);
    logger = TestBed.get(LoggerService);
    adService = TestBed.get(AdService);
    featureSwitch = TestBed.get(FeatureSwitchService);
  });

  it('should be created', () => {
    expect(adService).toBeTruthy();
  });

  it('should delegate to script injector to load the script on setup', async () => {
    const aadSdkUrl = 'http://whatever_url/';
    configMock.getConfig.mockReturnValue({ aadSdkUrl });
    httpClient.get.mockReturnValue(of({ url: aadSdkUrl }));
    await adService.setup();
    expect(scriptInjectorService.load).toHaveBeenCalledWith(
      'aad-sdk',
      aadSdkUrl
    );
  });

  describe('when AdsRelativePositioning feature is on', () => {
    const isFeatureOn = true;

    beforeEach(() => {
      featureSwitch.getFeature.mockResolvedValue(isFeatureOn);
    });

    it('should notify the adnostic sdk with a custom event that has relativePositioning switched on', async () => {
      const document: Document = TestBed.get(DOCUMENT);
      document.dispatchEvent = jest.fn();

      await adService.notify();

      expect(document.dispatchEvent).toHaveBeenCalledTimes(1);
      const [
        [dispatchedEvent]
      ] = (document.dispatchEvent as jest.Mock).mock.calls;
      expect((dispatchedEvent as CustomEvent).type).toBe('NavigationEnd');
      expect((dispatchedEvent as CustomEvent).detail).toEqual({
        relativePositioning: true
      });
    });
  });

  describe('when AdsRelativePositioning feature is off', () => {
    beforeEach(() => {
      featureSwitch.getFeature.mockResolvedValue(false);
    });

    it('should notify the adnostic sdk with event', async () => {
      const document: Document = TestBed.get(DOCUMENT);
      document.dispatchEvent = jest.fn();

      await adService.notify();

      expect(document.dispatchEvent).toHaveBeenCalledTimes(1);
      const [
        [dispatchedEvent]
      ] = (document.dispatchEvent as jest.Mock).mock.calls;
      expect((dispatchedEvent as Event).type).toBe('NavigationEnd');
    });

    it('should notify the adnostic sdk in IE11 initialised event', async () => {
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
});
