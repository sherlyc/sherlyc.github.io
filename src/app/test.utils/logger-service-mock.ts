import { Injectable } from '@angular/core';

@Injectable()
export class LoggerServiceMock {
  constructor() {}

  debug(...messages: any[]) {}

  info(...messages: any[]) {}

  error(error: Error, ...rest: any[]) {}

  warn(...messages: any[]) {}
}
