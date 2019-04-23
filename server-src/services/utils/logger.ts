import * as winston from 'winston';
import { Logger, format } from 'winston';
import * as logform from 'logform';
import config from './config';

const correlationFormat = format((info, opts) => {
  info.message = `${Zone.current.get('apiRequestId')} / ${info.message}`;
  return info;
});

function getFormat(name: string): logform.Format {
  return name === 'json'
    ? winston.format.combine(
        correlationFormat(),
        winston.format.timestamp(),
        winston.format.json()
      )
    : winston.format.combine(
        correlationFormat(),
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
