import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';
import { ConfigService } from '../config/config.service';
import { mockService, ServiceMock } from '../mocks/MockService';
import { CorrelationService } from '../correlation/correlation.service';
import { ICorrelation } from '../correlation/__types__/ICorrelation';

describe('LoggerService', () => {
  let configService: ServiceMock<ConfigService>;
  let correlationIdService: ServiceMock<CorrelationService>;
  const correlationInfo: ICorrelation = {
    deviceId: 'deviceId',
    apiRequestId: 'apiRequestId',
    pageScopedId: 'pageScopedId'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ConfigService, useClass: mockService(ConfigService) },
        {
          provide: CorrelationService,
          useClass: mockService(CorrelationService)
        }
      ]
    });
    configService = TestBed.get(ConfigService);
    correlationIdService = TestBed.get(CorrelationService);

    correlationIdService.getCorrelation.mockResolvedValue(correlationInfo);
  });

  it('should log debug when configured log level is debug', async () => {
    configService.getConfig.mockReturnValue({
      loggerOptions: { level: 'debug', format: 'json' }
    });

    const service: LoggerService = TestBed.get(LoggerService);
    spyOn(console, 'debug');

    await service.debug('This should be logged as debug');

    expect(console['debug']).toHaveBeenCalledWith(
      correlationInfo,
      'This should be logged as debug'
    );
  });

  it('should not log debug when configured log level is higher than debug', async () => {
    configService.getConfig.mockReturnValue({
      loggerOptions: { level: 'info', format: 'json' }
    });

    const service: LoggerService = TestBed.get(LoggerService);
    spyOn(console, 'debug');

    await service.debug('This should not be logged as debug');

    expect(console['debug']).not.toHaveBeenCalled();
  });

  it('should log error when configured log level is error', async () => {
    configService.getConfig.mockReturnValue({
      loggerOptions: { level: 'error', format: 'json' }
    });

    const service: LoggerService = TestBed.get(LoggerService);
    spyOn(console, 'error');

    await service.error(new Error('This should be logged as an error'));

    expect(console.error).toHaveBeenCalledWith(
      correlationInfo,
      new Error('This should be logged as an error')
    );
  });

  it('should log warn when configured log level does not exist', async () => {
    configService.getConfig.mockReturnValue({
      loggerOptions: { level: 'non-existing-level', format: 'json' }
    });

    const service: LoggerService = TestBed.get(LoggerService);
    spyOn(console, 'warn');

    await service.warn('This should be logged as a warn');

    expect(console.warn).toHaveBeenCalledWith(
      correlationInfo,
      'This should be logged as a warn'
    );
  });
});
