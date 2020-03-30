import { utcToZonedTime } from "date-fns-tz";
import { logger } from "express-winston";
import * as logform from "logform";
import { TransformableInfo } from "logform";
import * as winston from "winston";
import { Logger } from "winston";
import { ILogger } from "./__types__/ILogger";
import config from "./config";

export const formatStackTrace = winston.format((info: TransformableInfo) => {
  if (info.error && info.error instanceof Error) {
    info.trace = info.error.stack;
  }
  return info;
});

export const formatWorkHours = winston.format((info: TransformableInfo) => {
  if (info.timestamp && info.level === "error") {
    const hours = utcToZonedTime(info.timestamp, "+12:00").getHours();
    info.workHours = hours >= 7 && hours < 23;
  }
  return info;
});

function getFormat(name: string): logform.Format {
  return name === "json"
    ? winston.format.combine(
        formatStackTrace(),
        winston.format.timestamp(),
        formatWorkHours(),
        winston.format.json()
      )
    : winston.format.combine(
        formatStackTrace(),
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
      stderrLevels: ["error"]
    })
  ],
  exitOnError: false
});

export const requestLogger = logger({
  winstonInstance: winstonLogger,
  headerBlacklist: ["authorization", "cookie"]
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
