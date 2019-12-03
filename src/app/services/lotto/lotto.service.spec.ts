import { TestBed } from "@angular/core/testing";

import { LottoService } from "./lotto.service";
import * as random from "math-random";
import { StoreService } from "../store/store.service";
import { mockService, ServiceMock } from "../mocks/MockService";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "../config/config.service";
import { of } from "rxjs";

jest.mock("math-random");

describe("LottoService", () => {
  const experimentAPI = "/spade/api/experiment";
  let service: LottoService;
  let storeService: ServiceMock<StoreService>;
  let httpClient: ServiceMock<HttpClient>;
  let configService: ServiceMock<ConfigService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StoreService,
          useClass: mockService(StoreService)
        },
        {
          provide: HttpClient,
          useClass: mockService(HttpClient)
        },
        {
          provide: ConfigService,
          useClass: mockService(ConfigService)
        }
      ]
    });
    storeService = TestBed.get(StoreService);
    httpClient = TestBed.get(HttpClient);
    configService = TestBed.get(ConfigService);
    configService.getConfig.mockReturnValue({ experimentAPI });

    service = TestBed.get(LottoService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return a new lottery number if it does not exist in storage service", () => {
    (random as jest.Mock).mockReturnValue(0.38);
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
