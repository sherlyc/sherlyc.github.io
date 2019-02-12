import { IEnvironmentDefinition } from './__types__/IEnvironmentDefinition';

export class LoggerServiceMock {
  constructor() {}

  debug: jest.Mock<() => Partial<IEnvironmentDefinition>> = jest.fn();

  info: jest.Mock<() => void> = jest.fn();

  error: jest.Mock<() => void> = jest.fn();

  warn: jest.Mock<() => void> = jest.fn();
}
