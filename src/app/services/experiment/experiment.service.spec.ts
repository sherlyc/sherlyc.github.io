import { ConfigService } from '../config/config.service';
import { TestBed } from '@angular/core/testing';

import { ExperimentService } from './experiment.service';
import { mockService, ServiceMock } from '../mocks/MockService';
import { of } from 'rxjs';
import { RuntimeService } from '../runtime/runtime.service';
import { LottoService } from '../lotto/lotto.service';
import { HttpClient } from '@angular/common/http';

jest.mock('math-random');

describe('ExperimentService', () => {
  const experimentAPI = '/spade/api/experiment';
  let configServiceMock: ServiceMock<ConfigService>;
  let service: ExperimentService;
  let runtimeService: ServiceMock<RuntimeService>;
  let lottoService: ServiceMock<LottoService>;
  let http: ServiceMock<HttpClient>;

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: ConfigService,
          useClass: mockService(ConfigService)
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
          provide: HttpClient,
          useClass: mockService(HttpClient)
        }
      ]
    });
    configServiceMock = TestBed.get(ConfigService);
    configServiceMock.getConfig.mockReturnValue({ experimentAPI });
    service = TestBed.get(ExperimentService);
    runtimeService = TestBed.get(RuntimeService);
    lottoService = TestBed.get(LottoService);
    http = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not setup when running in server', async () => {
    runtimeService.isServer.mockReturnValue(true);

    await service.setup();

    expect(lottoService.getLotteryNumber).not.toHaveBeenCalled();
    expect(http.get).not.toHaveBeenCalled();
  });

  it('should set up experiment information when not in control group', async () => {
    runtimeService.isServer.mockReturnValue(false);
    const experimentName = 'FakeExperiment';
    const variant = 'A';
    lottoService.getLotteryNumber.mockReturnValue(1);
    http.get.mockReturnValueOnce(of(experimentName));
    http.get.mockReturnValueOnce(of(variant));

    await service.setup();

    const experiment = await service.getExperiment();
    expect(experiment.name).toEqual(experimentName);
    expect(experiment.variant).toEqual(variant);
  });

  it('should set up experiment information when in control group', async () => {
    runtimeService.isServer.mockReturnValue(false);
    const experimentName = 'control';
    lottoService.getLotteryNumber.mockReturnValue(1);
    http.get.mockReturnValueOnce(of(experimentName));

    await service.setup();

    const experiment = await service.getExperiment();
    expect(experiment.name).toEqual(experimentName);
    expect(experiment.variant).toEqual('control');
  });

  it('should get a variant when the experiment is not in control group', async () => {
    const experimentName = 'FakeExperiment';
    const getExperiment = jest.fn();
    getExperiment.mockResolvedValue({
      name: 'FakeExperiment',
      variant: 'A'
    });
    service.getExperiment = getExperiment;

    const variant = await service.getVariant(experimentName);

    expect(variant).toEqual('A');
  });

  it('should get a control variant when the experiment is in control group', async () => {
    const experimentName = 'AnotherFakeExperiment';
    const getExperiment = jest.fn();
    getExperiment.mockResolvedValue({
      name: 'FakeExperiment',
      variant: 'A'
    });
    service.getExperiment = getExperiment;

    const variant = await service.getVariant(experimentName);

    expect(variant).toEqual('control');
  });

  it('should get a control variant when experiment does not exist', async () => {
    const experimentName = 'AnotherFakeExperiment';

    const variant = await service.getVariant(experimentName);

    expect(variant).toEqual('control');
  });
});
