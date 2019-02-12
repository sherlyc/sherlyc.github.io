import { Injectable } from '@angular/core';

@Injectable()
export class ConfigServiceMock {
  constructor() {}
  public getConfig = jest.fn();
}
