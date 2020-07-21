import { TestBed } from "@angular/core/testing";
import * as random from "math-random";
import { mockService, ServiceMock } from "../mocks/MockService";
import { StoreService } from "../store/store.service";
import { LottoService } from "./lotto.service";

jest.mock("math-random");

describe("LottoService", () => {
  const experimentAPI = "/spade/api/experiment";
  let service: LottoService;
  let storeService: ServiceMock<StoreService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StoreService,
          useClass: mockService(StoreService)
        }
      ]
    });
    storeService = TestBed.inject(StoreService) as ServiceMock<StoreService>;
    service = TestBed.inject(LottoService) as ServiceMock<LottoService>;
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return a new lottery number if it does not exist in storage service", () => {
    ((random as any) as jest.Mock).mockReturnValue(0.38);
    storeService.get.mockReturnValue(undefined);

    const experimentName = "experimentName";
    const randomNumber = service.getLotteryNumber(experimentName);

    expect(randomNumber).toEqual(39);
    expect(storeService.set).toHaveBeenCalledWith(
      `${experimentName}ExperimentLottery`,
      randomNumber
    );
  });

  it("should return existing lottery number if it exists in storage service", () => {
    storeService.get.mockReturnValue(55);

    const randomNumber = service.getLotteryNumber("FakeExperiment");

    expect(randomNumber).toEqual(55);
    expect(storeService.set).not.toHaveBeenCalled();
  });
});
