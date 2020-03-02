import { DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { ConfigService } from "../config/config.service";
import { FeatureSwitchService } from "../feature-switch/feature-switch.service";
import { LoggerService } from "../logger/logger.service";
import { mockService, ServiceMock } from "../mocks/MockService";
import { RuntimeService } from "../runtime/runtime.service";
import { ScriptInjectorService } from "../script-injector/script-injector.service";
import { AdService } from "./ad.service";

describe("AdService", () => {
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

  it("should be created", () => {
    expect(adService).toBeTruthy();
  });

  it("should delegate to script injector to load the script on setup", async () => {
    const aadSdkUrl = "http://whatever_url/";
    configMock.getConfig.mockReturnValue({ aadSdkUrl });
    httpClient.get.mockReturnValue(of({ url: aadSdkUrl }));
    await adService.setup();
    expect(scriptInjectorService.load).toHaveBeenCalledWith(
      "aad-sdk",
      aadSdkUrl
    );
  });

  it("should notify the adnostic sdk with custom event detail", async () => {
    const document: Document = TestBed.get(DOCUMENT);
    document.dispatchEvent = jest.fn();

    await adService.notify();

    expect(document.dispatchEvent).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: "NavigationEnd",
        detail: expect.objectContaining({
          isHomepageTakeoverOn: true
        })
      })
    );
  });
});
