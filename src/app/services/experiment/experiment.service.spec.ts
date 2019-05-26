import { ConfigService } from './../config/config.service';
import { TestBed } from '@angular/core/testing';

import { ExperimentService } from './experiment.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { mockService, ServiceMock } from '../mocks/MockService';

describe('ExperimentService', () => {
  const experimentAPI = '/spade/api/experiment';
  let httpMock: HttpTestingController;
  let configServiceMock: ServiceMock<ConfigService>;

  beforeEach(() =>  {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ConfigService,
          useClass: mockService(ConfigService)
        }
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    configServiceMock = TestBed.get(ConfigService);
    configServiceMock.getConfig.mockReturnValue({ experimentAPI });
  });

  it('should be created', () => {
    const service: ExperimentService = TestBed.get(ExperimentService);
    expect(service).toBeTruthy();
  });

  it('should call experiment endpoint', (done) => {
    const experiment = 'Toucan';
    const lotteryNumber = 50;
    const expectedVariant = 'redHighlight';

    const service: ExperimentService = TestBed.get(ExperimentService);

    service
      .getVariant(experiment, lotteryNumber)
      .subscribe((response) => {
        expect(response).toEqual(expectedVariant);
        done();
      });

    const req = httpMock.expectOne(
      `${experimentAPI}?name=${experiment}&lotteryNumber=${lotteryNumber}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(expectedVariant);
    });
});
