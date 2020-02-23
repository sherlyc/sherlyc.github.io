import { TestBed } from "@angular/core/testing";
import { DtmService } from "./dtm.service";
import { ScriptInjectorService } from "../script-injector/script-injector.service";
import { mockService, ServiceMock } from "../mocks/MockService";
import { ConfigService } from "../config/config.service";
import { WindowService } from "../window/window.service";
import { RuntimeService } from "../runtime/runtime.service";
import { ScriptId } from "../script-injector/__types__/ScriptId";
import { LoggerService } from "../logger/logger.service";

describe("DtmService", () => {
  let dtmService: DtmService;
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
    dtmService = TestBed.get(DtmService);
    scriptInjectorService = TestBed.get(ScriptInjectorService);
    configService = TestBed.get(ConfigService);
    windowService = TestBed.get(WindowService);
    runtimeService = TestBed.get(RuntimeService);
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
