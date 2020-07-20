import { mockService, ServiceMock } from "../mocks/MockService";
import { ServiceWorkerService } from "./service-worker.service";
import { TestBed } from "@angular/core/testing";
import { ApplicationRef } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { RuntimeService } from "../runtime/runtime.service";
import { of } from "rxjs";

describe("ServiceWorkerService", () => {
  let serviceWorkerService: ServiceWorkerService;
  let applicationRef: ServiceMock<ApplicationRef>;
  let swUpdate: ServiceMock<SwUpdate>;
  let runtimeService: ServiceMock<RuntimeService>;
  let isStableMock = of(true);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApplicationRef,
          useClass: class {
            isStable = isStableMock;
          }
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

  it("should check for update", () => {
    (runtimeService.isBrowser as jest.Mock).mockReturnValue(true);
    (swUpdate.checkForUpdate as jest.Mock).mockResolvedValue({});

    serviceWorkerService.checkForUpdate();

    expect(swUpdate.checkForUpdate).toHaveBeenCalledTimes(1);
  });

  it("should do nothing when running in server side", () => {
    (runtimeService.isBrowser as jest.Mock).mockReturnValue(false);

    serviceWorkerService.checkForUpdate();
    expect(swUpdate.checkForUpdate).not.toHaveBeenCalled();
  });
});
