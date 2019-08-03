import { ErrorHandler, Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { BrowserClient, Hub } from '@sentry/browser';
import { RewriteFrames } from '@sentry/integrations';
import { CorrelationService } from '../correlation/correlation.service';
import { RuntimeService } from '../runtime/runtime.service';
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
    private correlationService: CorrelationService,
    private runtime: RuntimeService
  ) {
    this.client = new Hub(
      new BrowserClient({
        ...config.getConfig().sentryIO,
        integrations: [new RewriteFrames()]
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
    if (this.runtime.isServer() || loggingIndex >= currentLogLevelIndex) {
      (console as ISpadeConsole)[logLevel].call(
        console,
        JSON.stringify(this.correlationService.getCorrelation()),
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
