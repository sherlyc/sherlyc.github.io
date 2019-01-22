import * as winston from 'winston';
import { Logger } from 'winston';
import * as logform from 'logform';
import config from './config';

function getFormat(format: string): logform.Format {
  return format === 'json'
    ? winston.format.combine(winston.format.timestamp(), winston.format.json())
    : winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      );
}

const logger: Logger = winston.createLogger({
  level: config.loggerOptions.level,
  format: getFormat(config.loggerOptions.format),
  transports: [
    new winston.transports.Console({
      handleExceptions: true
    })
  ],
  exitOnError: false
});

export default logger;
