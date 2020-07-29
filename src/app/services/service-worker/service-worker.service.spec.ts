import { ApplicationRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { SwUpdate } from "@angular/service-worker";
import { of } from "rxjs";
import { ConfigService } from "../config/config.service";
import { mockService, ServiceMock } from "../mocks/MockService";
import { RuntimeService } from "../runtime/runtime.service";
import { ServiceWorkerService } from "./service-worker.service";

describe("ServiceWorkerService", () => {
  const swUpdateCheckInterval = 10000;
  let serviceWorkerService: ServiceWorkerService;
  let applicationRef: ServiceMock<ApplicationRef>;
  let swUpdate: ServiceMock<SwUpdate>;
  let runtimeService: ServiceMock<RuntimeService>;
  let configService: ServiceMock<ConfigService>;

  beforeEach(() => {
    jest.resetAllMocks();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApplicationRef,
          useClass: mockService(ApplicationRef)
        },
        {
          provide: SwUpdate,
          useClass: mockService(SwUpdate)
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        },
        {
          provide: ConfigService,
          useClass: mockService(ConfigService)
        }
      ]
    });
    applicationRef = TestBed.inject(ApplicationRef) as ServiceMock<
      ApplicationRef
    >;
    swUpdate = TestBed.inject(SwUpdate) as ServiceMock<SwUpdate>;
    runtimeService = TestBed.inject(RuntimeService) as ServiceMock<
      RuntimeService
    >;
    configService = TestBed.inject(ConfigService) as ServiceMock<ConfigService>;
    serviceWorkerService = TestBed.inject(ServiceWorkerService) as ServiceMock<
      ServiceWorkerService
    >;
  });
  describe("When in browser", () => {
    beforeEach(() => {
      configService.getConfig.mockReturnValue({ swUpdateCheckInterval });
      (runtimeService.isBrowser as jest.Mock).mockReturnValue(true);
      Object.defineProperty(swUpdate, "isEnabled", {
        get: () => true
      });
      swUpdate.checkForUpdate.mockResolvedValue({} as any);
    });

    it("should check for update when stable", () => {
      Object.defineProperty(applicationRef, "isStable", {
        get: () => of(true)
      });

      serviceWorkerService.checkForUpdate();

      expect(swUpdate.checkForUpdate).toHaveBeenCalledTimes(1);
    });

    it("should check for update again after update check interval", () => {
      jest.useFakeTimers();
      Object.defineProperty(applicationRef, "isStable", {
        get: () => of(true)
      });

      serviceWorkerService.checkForUpdate();
      jest.advanceTimersByTime(swUpdateCheckInterval);

      expect(swUpdate.checkForUpdate).toHaveBeenCalledTimes(2);
    });

    it("should not check for update when application is not stable", () => {
      Object.defineProperty(applicationRef, "isStable", {
        get: () => of(false)
      });

      serviceWorkerService.checkForUpdate();

      expect(swUpdate.checkForUpdate).not.toHaveBeenCalled();
    });

    it("should not check for update when service worker is disable", () => {
      Object.defineProperty(swUpdate, "isEnabled", {
        get: () => false
      });

      serviceWorkerService.checkForUpdate();

      expect(swUpdate.checkForUpdate).not.toHaveBeenCalled();
    });
  });

  describe("When in server", () => {
    it("should do nothing when running in server side", () => {
      (runtimeService.isBrowser as jest.Mock).mockReturnValue(false);

      serviceWorkerService.checkForUpdate();
      expect(swUpdate.checkForUpdate).not.toHaveBeenCalled();
    });
  });
});
