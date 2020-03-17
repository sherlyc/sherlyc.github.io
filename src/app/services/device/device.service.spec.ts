import { TestBed } from "@angular/core/testing";
import { DeviceType } from "../../../../common/DeviceType";
import { mockService, ServiceMock } from "../mocks/MockService";
import { RuntimeService } from "../runtime/runtime.service";
import { WindowService } from "../window/window.service";

import { DeviceService } from "./device.service";

describe("DeviceService", () => {
  let deviceService: DeviceService;
  let runtimeService: ServiceMock<RuntimeService>;
  let windowService: ServiceMock<WindowService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        },
        {
          provide: WindowService,
          useClass: mockService(WindowService)
        }
      ]
    });

    runtimeService = TestBed.get(RuntimeService);
    windowService = TestBed.get(WindowService);
    deviceService = TestBed.get(DeviceService);
  });

  it("should be created", () => {
    expect(deviceService).toBeTruthy();
  });

  describe("getDevice", () => {
    it.each([
      [
        DeviceType.mobile,
        "Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H)"
      ],
      [
        DeviceType.tablet,
        "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) Safari/604.1"
      ],
      [
        DeviceType.desktop,
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) Chrome/78.0.3904.97 Safari/537.36"
      ],
      [DeviceType.unknown, "Invalid UserAgent"]
    ])(
      "should get %s device from user agent %s",
      (device: string, userAgent: string) => {
        windowService.getWindow.mockReturnValue({
          navigator: { userAgent }
        });

        const result = deviceService.getDevice();

        expect(result).toEqual(device);
      }
    );
  });

  describe("isGridSupported", () => {
    describe("when in browser", () => {
      beforeEach(() => {
        jest.spyOn(runtimeService, "isBrowser").mockReturnValueOnce(true);
      });

      it("returns true when CSS Grid is supported", () => {
        jest.spyOn(document, "createElement").mockReturnValueOnce({
          style: { gridTemplateColumns: "" }
        } as HTMLElement);
        expect(deviceService.isGridSupported()).toBe(true);
      });

      it("returns true when CSS Grid (IE) is supported", () => {
        jest.spyOn(document, "createElement").mockReturnValueOnce({
          style: { msGridColumns: "" }
        } as HTMLElement);
        expect(deviceService.isGridSupported()).toBe(true);
      });

      it("returns false when CSS Grid is not supported", () => {
        jest.spyOn(document, "createElement").mockReturnValueOnce({
          style: {}
        } as HTMLElement);
        expect(deviceService.isGridSupported()).toBe(false);
      });
    });

    describe("when in server", () => {
      beforeEach(() => {
        jest.spyOn(runtimeService, "isBrowser").mockReturnValueOnce(false);
      });

      it("returns true", () => {
        jest.spyOn(document, "createElement").mockImplementationOnce(() => {
          throw new Error(
            "document.createElement is not supposed to be called"
          );
        });
        expect(deviceService.isGridSupported()).toBe(true);
      });
    });
  });
});
