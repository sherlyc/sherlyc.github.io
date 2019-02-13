import { ErrorHandler, Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

interface ISpadeConsole extends Console {
  [key: string]: Function;
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements ErrorHandler {
  constructor(private config: ConfigService) {}

  logLevels = ['debug', 'info', 'warn', 'error'];

  private log(logLevel: string, ...rest: any[]) {
    let currentLogLevelIndex = this.logLevels.indexOf(
      this.config.getConfig().loggerOptions.level
    );

    if (currentLogLevelIndex < 0) {
      currentLogLevelIndex = 2;
    }

    const loggingIndex = this.logLevels.indexOf(logLevel);
    if (loggingIndex >= currentLogLevelIndex) {
      (console as ISpadeConsole)[logLevel].call(console, ...rest);
    }
  }

  handleError(error: any) {
    this.error(error);
    throw error;
  }

  debug(...messages: any[]) {
    this.log('debug', ...messages);
  }

  info(...messages: any[]) {
    this.log('info', ...messages);
  }

  error(error: Error, ...rest: any[]) {
    this.log('error', error, ...rest);
  }

  warn(...messages: any[]) {
    this.log('warn', ...messages);
  }
}
