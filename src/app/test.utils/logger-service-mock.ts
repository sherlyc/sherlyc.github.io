import { Injectable } from '@angular/core';

@Injectable()
export class LoggerServiceMock {
  constructor() {}

  debug = jest.fn();

  info = jest.fn();

  error = jest.fn();

  warn = jest.fn();
}
