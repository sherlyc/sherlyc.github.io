import { IEnvironmentDefinition } from './__types__/IEnvironmentDefinition';

export class ConfigServiceMock {
  constructor() {}
  getConfig: jest.Mock<() => Partial<IEnvironmentDefinition>> = jest.fn();
}
