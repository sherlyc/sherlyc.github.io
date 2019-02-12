import { Injectable } from '@angular/core';
import { IEnvironmentDefinition } from './__types__/IEnvironmentDefinition';

@Injectable()
export class ConfigServiceMock {
  constructor() {}
  getConfig: jest.Mock<() => Partial<IEnvironmentDefinition>> = jest.fn();
}
