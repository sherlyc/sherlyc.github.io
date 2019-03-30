import { LoggerService } from './logger.service';
import { AutoMock, AutoMocked } from '../../../../common/__types__/types';

export class LoggerServiceMock implements AutoMock<LoggerService> {
  debug: AutoMocked<LoggerService['debug']> = jest.fn();
  error: AutoMocked<LoggerService['error']> = jest.fn();
  handleError: AutoMocked<LoggerService['handleError']> = jest.fn();
  info: AutoMocked<LoggerService['info']> = jest.fn();
  warn: AutoMocked<LoggerService['warn']> = jest.fn();
}
