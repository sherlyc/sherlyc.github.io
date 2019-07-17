import { TestBed } from '@angular/core/testing';

import { FeatureSwitchService } from './feature-switch.service';
import { ConfigService } from '../config/config.service';
import { mockService, ServiceMock } from '../mocks/MockService';
import { StoreService } from '../store/store.service';
import { HttpClient } from '@angular/common/http';
import { RuntimeService } from '../runtime/runtime.service';
import { LottoService } from '../lotto/lotto.service';
import { of } from 'rxjs/internal/observable/of';
import { Features } from '../../../../common/Features';
import { throwError } from 'rxjs';

describe('FeatureSwitchService', () => {
  const experimentAPI = '/spade/api/experiment';
  let service: FeatureSwitchService;

  let configServiceMock: ServiceMock<ConfigService>;
  let storeService: ServiceMock<StoreService>;
  let httpClient: ServiceMock<HttpClient>;
  let runtimeService: ServiceMock<RuntimeService>;
  let lottoService: ServiceMock<LottoService>;

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
        }
      ]
    });

    configServiceMock = TestBed.get(ConfigService);
    configServiceMock.getConfig.mockReturnValue({ experimentAPI });
    storeService = TestBed.get(StoreService);
    httpClient = TestBed.get(HttpClient);
    runtimeService = TestBed.get(RuntimeService);
    lottoService = TestBed.get(LottoService);

    service = TestBed.get(FeatureSwitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not setup when running in server', async () => {
    runtimeService.isServer.mockReturnValue(true);

    await service.setup();

    expect(lottoService.getLotteryNumber).not.toHaveBeenCalled();
    expect(lottoService.retrieveVariant).not.toHaveBeenCalled();
  });

  it('should return features as enabled when all features are on', async () => {
    runtimeService.isServer.mockReturnValue(false);
    lottoService.getLotteryNumber.mockReturnValue(1);
    lottoService.retrieveVariant.mockReturnValue(of('true'));

    await service.setup();

    Object.keys(Features).forEach(async (feature) => {
      const featureValue = await service.getFeature(feature as Features);
      expect(featureValue).toEqual(true);
    });
  });

  it('should return false for all features while running in server', async () => {
    runtimeService.isServer.mockReturnValue(true);

    Object.keys(Features).forEach(async (feature) => {
      const featureValue = await service.getFeature(feature as Features);
      expect(featureValue).toEqual(false);
    });
  });

  it('should return false when api fails', async () => {
    runtimeService.isServer.mockReturnValue(false);
    lottoService.getLotteryNumber.mockReturnValue(1);
    lottoService.retrieveVariant.mockReturnValue(
      throwError({ status: 500, statusText: 'Internal Server error' })
    );

    await service.setup();

    Object.keys(Features).forEach(async (feature) => {
      const featureValue = await service.getFeature(feature as Features);
      expect(featureValue).toEqual(false);
    });
  });

  it('should return false when api return non-boolean value', async () => {
    runtimeService.isServer.mockReturnValue(false);
    lottoService.getLotteryNumber.mockReturnValue(1);
    lottoService.retrieveVariant.mockReturnValue(of('control'));

    await service.setup();

    Object.keys(Features).forEach(async (feature) => {
      const featureValue = await service.getFeature(feature as Features);
      expect(featureValue).toEqual(false);
    });
  });
});
