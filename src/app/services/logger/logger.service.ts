import { ErrorHandler, Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { BrowserClient, Hub } from '@sentry/browser';
import { CorrelationService } from '../correlation/correlation.service';
interface ISpadeConsole extends Console {
  [key: string]: Function;
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements ErrorHandler {
  client: Hub;

  constructor(
    private config: ConfigService,
    private correlationService: CorrelationService
  ) {
    this.client = new Hub(
      new BrowserClient({
        ...config.getConfig().sentryIO,
        integrations: []
      })
    );
  }

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
      (console as ISpadeConsole)[logLevel].call(
        console,
        this.correlationService.getCorrelation(),
        ...rest
      );
    }
  }

  handleError(error: any) {
    this.error(error);
  }

  debug(...messages: any[]) {
    this.log('debug', ...messages);
  }

  info(...messages: any[]) {
    this.log('info', ...messages);
  }

  error(error: Error, ...rest: any[]) {
    const correlation = this.correlationService.getCorrelation();
    this.client.configureScope((scope) => {
      scope.setTags(correlation as any);
    });
    this.client.captureException(error);
    this.log('error', error, ...rest);
  }

  warn(...messages: any[]) {
    this.log('warn', ...messages);
  }
}
