import { TestBed } from "@angular/core/testing";
import { ConfigService } from "../config/config.service";
import { LoggerService } from "../logger/logger.service";
import { mockService, ServiceMock } from "../mocks/MockService";
import { RuntimeService } from "../runtime/runtime.service";
import { ScriptInjectorService } from "../script-injector/script-injector.service";
import { ScriptId } from "../script-injector/__types__/ScriptId";
import { WindowService } from "../window/window.service";
import { DtmService } from "./dtm.service";

describe("DtmService", () => {
  let dtmService: ServiceMock<DtmService>;
  let scriptInjectorService: ServiceMock<ScriptInjectorService>;
  let configService: ServiceMock<ConfigService>;
  let windowService: ServiceMock<WindowService>;
  let runtimeService: ServiceMock<RuntimeService>;

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
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        },
        {
          provide: LoggerService,
          useClass: mockService(LoggerService)
        }
      ]
    });
    dtmService = TestBed.inject(DtmService) as ServiceMock<DtmService>;
    scriptInjectorService = TestBed.inject(
      ScriptInjectorService
    ) as ServiceMock<ScriptInjectorService>;
    configService = TestBed.inject(ConfigService) as ServiceMock<ConfigService>;
    windowService = TestBed.inject(WindowService) as ServiceMock<WindowService>;
    runtimeService = TestBed.inject(RuntimeService) as ServiceMock<
      RuntimeService
    >;
  });

  it("should be created", () => {
    expect(dtmService).toBeTruthy();
  });

  it("should do nothing when running in ssr", async () => {
    runtimeService.isServer.mockReturnValue(true);

    await dtmService.setup();

    expect(windowService.getWindow).not.toHaveBeenCalled();
    expect(scriptInjectorService.load).not.toHaveBeenCalled();
  });

  it("should delegate to script injector to load launch script on setup", async () => {
    runtimeService.isServer.mockReturnValue(false);
    windowService.getWindow.mockReturnValue({});
    scriptInjectorService.load.mockImplementation(() => {
      windowService.getWindow()._satellite = { pageBottom: jest.fn() };
      return Promise.resolve();
    });
    const launchUrl = "http://example/launch.js";
    configService.getConfig.mockReturnValue({
      launchUrl
    });

    await dtmService.setup();

    expect(scriptInjectorService.load).toHaveBeenCalledWith(
      ScriptId.launch,
      launchUrl
    );
    expect(windowService.getWindow()._satellite!.pageBottom).toHaveBeenCalled();
  });
});
