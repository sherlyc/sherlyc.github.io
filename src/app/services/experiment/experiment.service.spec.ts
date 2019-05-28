import { ConfigService } from '../config/config.service';
import { TestBed } from '@angular/core/testing';

import { ExperimentService } from './experiment.service';
import { mockService, ServiceMock } from '../mocks/MockService';
import { StoreService } from '../store/store.service';
import * as random from 'math-random';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

jest.mock('math-random');

describe('ExperimentService', () => {
  const experimentAPI = '/spade/api/experiment';
  let configServiceMock: ServiceMock<ConfigService>;
  let service: ExperimentService;
  let storeService: ServiceMock<StoreService>;
  let httpClient: ServiceMock<HttpClient>;

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
          provide: StoreService,
          useClass: mockService(StoreService)
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
    storeService = TestBed.get(StoreService);
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call experiment endpoint', (done) => {
    const experiment = 'Toucan';
    const lotteryNumber = 50;
    const expectedVariant = 'redHighlight';

    httpClient.get.mockReturnValue(of(expectedVariant));

    service.retrieveVariant(experiment, lotteryNumber).subscribe((response) => {
      expect(response).toEqual(expectedVariant);
      done();
    });
  });

  it('should return a new lottery number if it does not exist in storage service', () => {
    (random as jest.Mock).mockReturnValue(0.38);
    storeService.get.mockReturnValue(undefined);

    const experimentName = 'experimentName';
    const randomNumber = service.getLotteryNumber(experimentName);

    expect(randomNumber).toEqual(38);
    expect(storeService.set).toHaveBeenCalledWith(
      `${experimentName}ExperimentLottery`,
      randomNumber
    );
  });

  it('should return existing lottery number if it exists in storage service', () => {
    storeService.get.mockReturnValue(55);

    const randomNumber = service.getLotteryNumber('FakeExperiment');

    expect(randomNumber).toEqual(55);
  });

  it('should set up experiment information when not in control group', async () => {
    storeService.get.mockReturnValue(undefined);
    const experimentName = 'FakeExperiment';
    const variant = 'A';
    (random as jest.Mock).mockReturnValue(0.38);
    httpClient.get.mockReturnValueOnce(of(experimentName));
    httpClient.get.mockReturnValueOnce(of(variant));

    await service.setup();

    const experiment = await service.getExperiment();
    expect(experiment.name).toEqual(experimentName);
    expect(experiment.variant).toEqual(variant);
  });

  it('should set up experiment information when in control group', async () => {
    storeService.get.mockReturnValue(undefined);
    const experimentName = 'control';
    (random as jest.Mock).mockReturnValue(0.38);
    httpClient.get.mockReturnValueOnce(of(experimentName));

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
});
