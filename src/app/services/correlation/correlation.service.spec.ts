import { TestBed } from "@angular/core/testing";
import { mockService, ServiceMock } from "../mocks/MockService";
import { RuntimeService } from "../runtime/runtime.service";
import { StoreService } from "../store/store.service";
import { CorrelationService } from "./correlation.service";

describe("CorrelationService should", () => {
  let correlationIdService: ServiceMock<CorrelationService>;
  let storeService: ServiceMock<StoreService>;
  let runtimeService: ServiceMock<RuntimeService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StoreService,
          useClass: mockService(StoreService)
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        }
      ]
    });
    correlationIdService = TestBed.inject(CorrelationService) as ServiceMock<
      CorrelationService
    >;
    storeService = TestBed.inject(StoreService) as ServiceMock<StoreService>;
    runtimeService = TestBed.inject(RuntimeService) as ServiceMock<
      RuntimeService
    >;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("be created", () => {
    expect(correlationIdService).toBeTruthy();
  });

  it("generate page scoped id", () => {
    correlationIdService.generatePageScopedId();
    expect(correlationIdService.getPageScopedId()).toBeTruthy();
  });

  it("set api request id", () => {
    const apiRequestId = "apiRequestId";
    correlationIdService.setApiRequestId(apiRequestId);

    expect(correlationIdService.getApiRequestId()).toEqual(apiRequestId);
  });

  it("should create and set deviceId to local storage if not yet exist", () => {
    runtimeService.isServer.mockReturnValue(false);
    (storeService.get as jest.Mock).mockReturnValue(null);

    const deviceId = correlationIdService.getDeviceId();

    expect(typeof deviceId).toBe("string");
  });

  it("should not create and set deviceId to local storage if already exists", () => {
    runtimeService.isServer.mockReturnValue(false);
    (storeService.get as jest.Mock).mockReturnValue("deviceId");

    correlationIdService.getDeviceId();

    expect(storeService.set).not.toHaveBeenCalled();
  });

  it("should return warning message if running getDeviceId in server", () => {
    runtimeService.isServer.mockReturnValue(true);

    const result = correlationIdService.getDeviceId();

    expect(result).toContain("not supported");
  });
});
