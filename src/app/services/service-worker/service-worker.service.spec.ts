import { ApplicationRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { SwUpdate } from "@angular/service-worker";
import { of } from "rxjs";
import { mockService, ServiceMock } from "../mocks/MockService";
import { RuntimeService } from "../runtime/runtime.service";
import { ServiceWorkerService } from "./service-worker.service";

describe("ServiceWorkerService", () => {
  let serviceWorkerService: ServiceWorkerService;
  let applicationRef: ServiceMock<ApplicationRef>;
  let swUpdate: ServiceMock<SwUpdate>;
  let runtimeService: ServiceMock<RuntimeService>;

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
    serviceWorkerService = TestBed.inject(ServiceWorkerService) as ServiceMock<
      ServiceWorkerService
    >;
  });

  describe("When in browser", () => {
    beforeEach(() => {
      (runtimeService.isBrowser as jest.Mock).mockReturnValue(true);
    });

    it("should check for update when stable", () => {
      Object.defineProperty(applicationRef, "isStable", {
        get: () => of(true)
      });

      serviceWorkerService.checkForUpdate();

      expect(swUpdate.checkForUpdate).toHaveBeenCalledTimes(1);
    });

    it("should check for update again after 1 hour", () => {
      jest.useFakeTimers();
      Object.defineProperty(applicationRef, "isStable", {
        get: () => of(true)
      });

      serviceWorkerService.checkForUpdate();
      jest.advanceTimersByTime(60 * 60000);

      expect(swUpdate.checkForUpdate).toHaveBeenCalledTimes(2);
    });

    it("should not check for update when application is not stable", () => {
      Object.defineProperty(applicationRef, "isStable", {
        get: () => of(false)
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
