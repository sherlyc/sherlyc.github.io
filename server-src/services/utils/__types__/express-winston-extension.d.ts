import * as expressWinston from 'express-winston';
import { Handler } from 'express';

interface ILoggerExtraOptions {
  headerBlacklist: string[];
}

declare module 'express-winston' {
  export function logger(
    options: expressWinston.LoggerOptions & ILoggerExtraOptions
  ): Handler;
}
