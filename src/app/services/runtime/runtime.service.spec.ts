import { PLATFORM_ID } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { TransferState } from "@angular/platform-browser";
import { mockService, ServiceMock } from "../mocks/MockService";
import { WindowService } from "../window/window.service";
import { RuntimeService } from "./runtime.service";

describe("RuntimeService", () => {
  let runtimeService: ServiceMock<RuntimeService>;
  let transferState: TransferState;
  let windowService: ServiceMock<WindowService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TransferState,
          useClass: mockService(TransferState)
        },
        {
          provide: WindowService,
          useClass: mockService(WindowService)
        },
        {
          provide: PLATFORM_ID,
          useValue: {}
        }
      ]
    });

    runtimeService = TestBed.inject(RuntimeService) as ServiceMock<
      RuntimeService
    >;
    transferState = TestBed.inject(TransferState) as ServiceMock<TransferState>;
    windowService = TestBed.inject(WindowService) as ServiceMock<WindowService>;
  });

  afterEach(() => {
    process.env = {};
  });

  describe("when in server", function () {
    beforeEach(() => {
      const isServerSpy = jest.spyOn(runtimeService, "isServer");
      isServerSpy.mockReturnValue(true);
    });

    it("should get env variable in server when env var is set", () => {
      process.env = { SPADE_ENV: "whatever" };

      const envVar = runtimeService.getEnvironmentVariable(
        "SPADE_ENV",
        "defaultValue"
      );

      expect(envVar).toEqual("whatever");
    });

    it("should get default env variable in server when env var is not set", () => {
      const envVar = runtimeService.getEnvironmentVariable(
        "SPADE_ENV",
        "defaultValue"
      );

      expect(envVar).toEqual("defaultValue");
    });
  });

  describe("when in browser", () => {
    beforeEach(() => {
      const isServerSpy = jest.spyOn(runtimeService, "isServer");
      isServerSpy.mockReturnValue(false);
    });

    it("should return defaultValue for env in browser when the domain does not match any environment", () => {
      windowService.getWindow.mockReturnValue({
        location: {
          hostname: "example.com"
        }
      });

      const envVar = runtimeService.getEnvironmentVariable(
        "SPADE_ENV",
        "defaultValue"
      );

      expect(envVar).toEqual("defaultValue");
    });

    it.each([
      ["production", "i.stuff.co.nz"],
      ["production", "www.stuff.co.nz"],
      ["production", "experience.expproduction.shift21.ffx.nz"],
      ["staging", "i-preprod.stuff.co.nz"],
      ["staging", "experience.expstaging.shift21.ffx.nz"],
      ["staging", "www-preprod.stuff.co.nz"],
      ["development", "experience.expdevint.shift21.ffx.nz"]
    ])(
      "should return environment as %s when hostname is %s",
      (expectedEnv: string, hostname: string) => {
        windowService.getWindow.mockReturnValue({
          location: {
            hostname
          }
        });

        const envVar = runtimeService.getEnvironmentVariable(
          "SPADE_ENV",
          "defaultValue"
        );

        expect(envVar).toEqual(expectedEnv);
      }
    );
  });
});
