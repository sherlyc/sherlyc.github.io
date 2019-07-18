import { TestBed } from '@angular/core/testing';

import { FeatureSwitchService } from './feature-switch.service';
import { ConfigService } from '../config/config.service';
import { mockService, ServiceMock } from '../mocks/MockService';
import { StoreService } from '../store/store.service';
import { HttpClient } from '@angular/common/http';
import { RuntimeService } from '../runtime/runtime.service';
import { LottoService } from '../lotto/lotto.service';
import { of } from 'rxjs/internal/observable/of';
import { FeatureNames } from '../../../../common/FeatureNames';
import { throwError } from 'rxjs';
import { LoggerService } from '../logger/logger.service';

describe('FeatureSwitchService', () => {
  const experimentAPI = '/spade/api/experiment';
  let service: FeatureSwitchService;

  let configServiceMock: ServiceMock<ConfigService>;
  let storeService: ServiceMock<StoreService>;
  let httpClient: ServiceMock<HttpClient>;
  let runtimeService: ServiceMock<RuntimeService>;
  let lottoService: ServiceMock<LottoService>;
  let loggerService: ServiceMock<LoggerService>;

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
        }
      ]
    });

    configServiceMock = TestBed.get(ConfigService);
    configServiceMock.getConfig.mockReturnValue({ experimentAPI });
    storeService = TestBed.get(StoreService);
    httpClient = TestBed.get(HttpClient);
    runtimeService = TestBed.get(RuntimeService);
    lottoService = TestBed.get(LottoService);
    loggerService = TestBed.get(LoggerService);

    service = TestBed.get(FeatureSwitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not setup when running in server', async () => {
    runtimeService.isServer.mockReturnValue(true);

    await service.setup();

    expect(lottoService.getLotteryNumber).not.toHaveBeenCalled();
    expect(httpClient.get).not.toHaveBeenCalled();
  });

  it('should return features as enabled when all features are on', async () => {
    runtimeService.isServer.mockReturnValue(false);
    lottoService.getLotteryNumber.mockReturnValue(1);
    httpClient.get.mockReturnValue(of(true));

    await service.setup();

    Object.keys(FeatureNames).forEach(async (feature) => {
      const featureValue = await service.getFeature(feature as FeatureNames);
      expect(featureValue).toEqual(true);
    });
  });

  it('should return features as disabled when api fails', async () => {
    runtimeService.isServer.mockReturnValue(false);
    lottoService.getLotteryNumber.mockReturnValue(1);
    httpClient.get.mockReturnValue(throwError('Internal Server Error'));

    await service.setup();

    Object.keys(FeatureNames).forEach(async (feature) => {
      const featureValue = await service.getFeature(feature as FeatureNames);
      expect(featureValue).toEqual(false);
    });
  });

  it('should return false for all features while running in server', async () => {
    runtimeService.isServer.mockReturnValue(true);

    Object.keys(FeatureNames).forEach(async (feature) => {
      const featureValue = await service.getFeature(feature as FeatureNames);
      expect(featureValue).toEqual(false);
    });
  });
});
