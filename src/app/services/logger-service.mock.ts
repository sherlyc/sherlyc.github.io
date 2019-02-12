import { Injectable } from '@angular/core';
import { IEnvironmentDefinition } from './__types__/IEnvironmentDefinition';

@Injectable()
export class LoggerServiceMock {
  constructor() {}

  debug: jest.Mock<() => Partial<IEnvironmentDefinition>> = jest.fn();

  info: jest.Mock<() => void> = jest.fn();

  error: jest.Mock<() => void> = jest.fn();

  warn: jest.Mock<() => void> = jest.fn();
}
