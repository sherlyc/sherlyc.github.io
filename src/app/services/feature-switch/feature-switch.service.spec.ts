import { TestBed } from "@angular/core/testing";

import { FeatureSwitchService } from "./feature-switch.service";
import { ConfigService } from "../config/config.service";
import { mockService, ServiceMock } from "../mocks/MockService";
import { StoreService } from "../store/store.service";
import { HttpClient } from "@angular/common/http";
import { RuntimeService } from "../runtime/runtime.service";
import { LottoService } from "../lotto/lotto.service";
import { of } from "rxjs/internal/observable/of";
import * as features from "../../../../common/FeatureName";
import { throwError } from "rxjs";
import { LoggerService } from "../logger/logger.service";
import { FeatureName } from "../../../../common/FeatureName";
import { DeviceService } from "../device/device.service";
import { DeviceType } from "../../../../common/DeviceType";

describe("FeatureSwitchService", () => {
  const featureAPI = "/spade/api/feature";
  let service: FeatureSwitchService;

  let configServiceMock: ServiceMock<ConfigService>;
  let storeService: ServiceMock<StoreService>;
  let httpClient: ServiceMock<HttpClient>;
  let runtimeService: ServiceMock<RuntimeService>;
  let lottoService: ServiceMock<LottoService>;
  let loggerService: ServiceMock<LoggerService>;
  let deviceService: ServiceMock<DeviceService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: ConfigService,
          useClass: mockService(ConfigService)
        },
        {
          provide: StoreService,
          useClass: mockService(StoreService)
        },
        {
          provide: HttpClient,
          useClass: mockService(HttpClient)
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        },
        {
          provide: LottoService,
          useClass: mockService(LottoService)
        },
        {
          provide: LoggerService,
          useClass: mockService(LoggerService)
        },
        {
          provide: DeviceService,
          useClass: mockService(DeviceService)
        }
      ]
    });

    configServiceMock = TestBed.get(ConfigService);
    storeService = TestBed.get(StoreService);
    httpClient = TestBed.get(HttpClient);
    runtimeService = TestBed.get(RuntimeService);
    lottoService = TestBed.get(LottoService);
    loggerService = TestBed.get(LoggerService);
    deviceService = TestBed.get(DeviceService);
    configServiceMock.getConfig.mockReturnValue({ featureAPI });

    service = TestBed.get(FeatureSwitchService);
    (features as any).FeatureName = {
      TEST: "TEST"
    };
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should not setup when running in server", async () => {
    runtimeService.isServer.mockReturnValue(true);

    await service.setup();

    expect(lottoService.getLotteryNumber).not.toHaveBeenCalled();
    expect(httpClient.get).not.toHaveBeenCalled();
  });

  it("should not fetch Placeholder feature", async () => {
    (features as any).FeatureName = {
      Placeholder: "Placeholder"
    };

    await service.setup();

    expect(lottoService.getLotteryNumber).not.toHaveBeenCalled();
    expect(httpClient.get).not.toHaveBeenCalled();
  });

  it("should make call to feature API with featureName, lotteryNumber and deviceType", async () => {
    const lotteryNumber = 123;

    runtimeService.isServer.mockReturnValue(false);
    lottoService.getLotteryNumber.mockReturnValue(lotteryNumber);
    httpClient.get.mockReturnValue(of(true));
    deviceService.getDevice.mockReturnValue(DeviceType.mobile);

    await service.setup();

    await Promise.all(
      Object.keys(features.FeatureName).map(async (feature) => {
        expect(httpClient.get).toHaveBeenCalledWith(
          `${featureAPI}/${feature}/${lotteryNumber}/mobile`
        );
      })
    );
  });

  it("should return features as enabled when all features are on", async () => {
    runtimeService.isServer.mockReturnValue(false);
    lottoService.getLotteryNumber.mockReturnValue(1);
    httpClient.get.mockReturnValue(of(true));

    await service.setup();

    await Promise.all(
      Object.keys(features.FeatureName).map(async (feature) => {
        const featureValue = await service.getFeature(feature as FeatureName);
        expect(featureValue).toEqual(true);
      })
    );
  });

  it("should return features as disabled when api fails", async () => {
    runtimeService.isServer.mockReturnValue(false);
    lottoService.getLotteryNumber.mockReturnValue(1);
    httpClient.get.mockReturnValue(throwError("Internal Server Error"));

    await service.setup();

    await Promise.all(
      Object.keys(features.FeatureName).map(async (feature) => {
        const featureValue = await service.getFeature(feature as FeatureName);
        expect(featureValue).toEqual(false);
      })
    );
  });

  it("should return false for all features while running in server", async () => {
    runtimeService.isServer.mockReturnValue(true);

    await Promise.all(
      Object.keys(features.FeatureName).map(async (feature) => {
        const featureValue = await service.getFeature(feature as FeatureName);
        expect(featureValue).toEqual(false);
      })
    );
  });

  it("should get feature value from existing cache", async () => {
    storeService.get.mockReturnValue(true);
    httpClient.get.mockReturnValue(of(false));

    await service.setup();

    await Promise.all(
      Object.keys(features.FeatureName).map(async (feature) => {
        const featureValue = await service.getFeature(feature as FeatureName);
        expect(featureValue).toEqual(true);
      })
    );
  });

  it("should wait for feature value if there is not existing cache", async () => {
    storeService.get.mockReturnValue(undefined);
    httpClient.get.mockReturnValue(of(true));

    await service.setup();

    await Promise.all(
      Object.keys(features.FeatureName).map(async (feature) => {
        const featureValue = await service.getFeature(feature as FeatureName);
        expect(featureValue).toEqual(true);
      })
    );
  });
});
