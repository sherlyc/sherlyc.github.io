import { TestBed } from "@angular/core/testing";
import { mockService, ServiceMock } from "../mocks/MockService";
import { WindowService } from "../window/window.service";
import { BrowserOverrideService } from "./browser-override.service";

describe("Browser Override Service", () => {
  let windowService: ServiceMock<WindowService>;
  let browserOverrideService: ServiceMock<BrowserOverrideService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: WindowService,
          useClass: mockService(WindowService)
        }
      ]
    });
    windowService = TestBed.get(WindowService);
    windowService.getWindow.mockReturnValue({});
    browserOverrideService = TestBed.get(BrowserOverrideService);
  });

  it("should override native browser functions", () => {
    const window = windowService.getWindow();
    expect(window.alert).toBeFalsy();
    expect(window.confirm).toBeFalsy();
    browserOverrideService.setup();
    expect(window.alert).toBeTruthy();
    expect(window.confirm).toBeTruthy();
  });
});
