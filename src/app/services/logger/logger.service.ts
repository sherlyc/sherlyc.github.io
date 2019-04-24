import { ErrorHandler, Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import * as Sentry from '@sentry/browser';
import { CorrelationService } from '../correlation/correlation.service';
interface ISpadeConsole extends Console {
  [key: string]: Function;
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements ErrorHandler {
  constructor(
    private config: ConfigService,
    private correlationService: CorrelationService
  ) {}

  logLevels = ['debug', 'info', 'warn', 'error'];

  private async log(logLevel: string, ...rest: any[]) {
    let currentLogLevelIndex = this.logLevels.indexOf(
      this.config.getConfig().loggerOptions.level
    );

    if (currentLogLevelIndex < 0) {
      currentLogLevelIndex = 2;
    }

    const loggingIndex = this.logLevels.indexOf(logLevel);
    if (loggingIndex >= currentLogLevelIndex) {
      (console as ISpadeConsole)[logLevel].call(
        console,
        await this.correlationService.getCorrelation(),
        ...rest
      );
    }
  }

  async handleError(error: any) {
    await this.error(error);
  }

  async debug(...messages: any[]) {
    await this.log('debug', ...messages);
  }

  async info(...messages: any[]) {
    await this.log('info', ...messages);
  }

  async error(error: Error, ...rest: any[]) {
    const correlation = await this.correlationService.getCorrelation();
    Sentry.configureScope((scope) => {
      scope.setTags(correlation as any);
    });
    Sentry.captureException(error);
    await this.log('error', error, ...rest);
  }

  async warn(...messages: any[]) {
    await this.log('warn', ...messages);
  }
}
