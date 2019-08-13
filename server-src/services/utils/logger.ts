import * as winston from 'winston';
import { Logger } from 'winston';
import * as logform from 'logform';
import config from './config';
import { ILogger } from './__types__/ILogger';
import { logger } from 'express-winston';
import * as extension from './__types__/express-winston-extension';

function getFormat(name: string): logform.Format {
  return name === 'json'
    ? winston.format.combine(winston.format.timestamp(), winston.format.json())
    : winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      );
}

export const winstonLogger: Logger = winston.createLogger({
  level: config.loggerOptions.level,
  format: getFormat(config.loggerOptions.format),
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      stderrLevels: ['error']
    })
  ],
  exitOnError: false
});

export const requestLogger = logger({
  winstonInstance: winstonLogger,
  headerBlacklist: ['authorization', 'cookie']
});

const wrappedLogger: ILogger = {
  info: (requestId: string, message: string, ...args: any[]) => {
    winstonLogger.info(`${requestId} / ${message}`, ...args);
  },

  debug: (requestId: string, message: string, ...args: any[]) => {
    winstonLogger.debug(`${requestId} / ${message}`, ...args);
  },

  warn: (requestId: string, message: string, ...args: any[]) => {
    winstonLogger.warn(`${requestId} / ${message}`, ...args);
  },

  error: (requestId: string, message: string, ...args: any[]) => {
    winstonLogger.error(`${requestId} / ${message}`, ...args);
  }
};

export default wrappedLogger;
