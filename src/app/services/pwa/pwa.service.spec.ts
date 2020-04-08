import { TestBed } from "@angular/core/testing";
import { AnalyticsEventsType } from "../analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../analytics/analytics.service";
import { mockService, ServiceMock } from "../mocks/MockService";
import { RuntimeService } from "../runtime/runtime.service";
import { WindowService } from "../window/window.service";
import { PwaService } from "./pwa.service";

describe("PwaService", () => {
  let pwaService: ServiceMock<PwaService>;
  let analyticsService: ServiceMock<AnalyticsService>;
  let windowService: ServiceMock<WindowService>;
  let runtimeService: ServiceMock<RuntimeService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: WindowService,
          useClass: mockService(WindowService)
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        },
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        }
      ]
    });

    windowService = TestBed.inject(WindowService) as ServiceMock<WindowService>;
    runtimeService = TestBed.inject(RuntimeService) as ServiceMock<
      RuntimeService
    >;
    analyticsService = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;

    pwaService = TestBed.inject(PwaService) as ServiceMock<PwaService>;
  });

  it("should create", () => {
    expect(true).toBe(true);
  });

  it("should push pwa downloaded event when app is installed in browser", async () => {
    runtimeService.isServer.mockReturnValue(false);

    const eventRegistry: any = {};
    const addEventListener = jest.fn((event, callback) => {
      eventRegistry[event] = callback;
    });
    windowService.getWindow.mockReturnValue({ addEventListener });

    await pwaService.setup();
    eventRegistry.appinstalled();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.PWA_DOWNLOADED
    });
  });

  it("should not add event listener in server", async () => {
    runtimeService.isServer.mockReturnValue(true);

    const addEventListener = jest.fn();
    windowService.getWindow.mockReturnValue({ addEventListener });

    await pwaService.setup();

    expect(addEventListener).not.toHaveBeenCalled();
  });
});
