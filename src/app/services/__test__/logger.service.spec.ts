import { TestBed } from '@angular/core/testing';

import { LoggerService } from '../logger.service';
import { ConfigService } from '../config.service';
import { ConfigServiceMock } from '../config-service.mock';

let configService: ConfigServiceMock;

describe('LoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ConfigService, useClass: ConfigServiceMock }]
    });
    configService = TestBed.get(ConfigService);
  });

  it('should log debug when configured log level is debug', () => {
    configService.getConfig.mockReturnValue({
      loggerOptions: { level: 'debug' }
    });

    const service: LoggerService = TestBed.get(LoggerService);
    spyOn(console, 'debug');

    service.debug('This should be logged as debug');

    expect(console.debug).toHaveBeenCalledWith(
      'This should be logged as debug'
    );
  });

  it('should not log debug when configured log level is higher than debug', () => {
    configService.getConfig.mockReturnValue({
      loggerOptions: { level: 'info' }
    });

    const service: LoggerService = TestBed.get(LoggerService);
    spyOn(console, 'debug');

    service.debug('This should not be logged as debug');

    expect(console.debug).not.toHaveBeenCalledWith(
      'This should not be logged as debug'
    );
  });

  it('should log error when configured log level is error', () => {
    configService.getConfig.mockReturnValue({
      loggerOptions: { level: 'error' }
    });

    const service: LoggerService = TestBed.get(LoggerService);
    spyOn(console, 'error');

    service.error(new Error('This should be logged as an error'));

    expect(console.error).toHaveBeenCalledWith(
      new Error('This should be logged as an error')
    );
  });

  it('should log warn when configured log level does not exist', () => {
    configService.getConfig.mockReturnValue({
      loggerOptions: { level: 'non-existing-level' }
    });

    const service: LoggerService = TestBed.get(LoggerService);
    spyOn(console, 'warn');

    service.warn('This should be logged as a warn');

    expect(console.warn).toHaveBeenCalledWith(
      'This should be logged as a warn'
    );
  });
});
