import { DOCUMENT } from "@angular/common";
import { TestBed } from "@angular/core/testing";
import { forEach } from "lodash-es";
import { ConfigService } from "../config/config.service";
import { IEnvironmentDefinition } from "../config/__types__/IEnvironmentDefinition";
import { FeatureSwitchService } from "../feature-switch/feature-switch.service";
import { LoggerService } from "../logger/logger.service";
import { mockService, ServiceMock } from "../mocks/MockService";
import { RuntimeService } from "../runtime/runtime.service";
import { ScriptInjectorService } from "../script-injector/script-injector.service";
import { AdService } from "./ad.service";

describe("AdService", () => {
  let scriptInjectorService: ServiceMock<ScriptInjectorService>;
  let configMock: ServiceMock<ConfigService>;
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

    scriptInjectorService = TestBed.inject(
      ScriptInjectorService
    ) as ServiceMock<ScriptInjectorService>;
    configMock = TestBed.inject(ConfigService) as ServiceMock<ConfigService>;
    logger = TestBed.inject(LoggerService) as ServiceMock<LoggerService>;
    adService = TestBed.inject(AdService) as ServiceMock<AdService>;
    featureSwitch = TestBed.inject(FeatureSwitchService) as ServiceMock<
      FeatureSwitchService
    >;
  });

  it("should be created", () => {
    expect(adService).toBeTruthy();
  });

  it("should delegate to script injector to load the script on setup", async () => {
    const mockConfig: Pick<IEnvironmentDefinition, "advertising"> = {
      advertising: {
        gpt: "//example.com/gpt.js",
        prebid: "//example.com/prebid.js",
        adnostic: "//example.com/adnostic.js"
      }
    };
    configMock.getConfig.mockReturnValue(mockConfig);
    await adService.setup();
    forEach(mockConfig.advertising, (src, id) =>
      expect(scriptInjectorService.load).toHaveBeenCalledWith(id, src)
    );
  });

  it("should notify the adnostic sdk with custom event", async () => {
    const document: Document = TestBed.inject(DOCUMENT);
    document.dispatchEvent = jest.fn();

    await adService.notify();

    expect(document.dispatchEvent).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: "NavigationEnd"
      })
    );
  });
});
