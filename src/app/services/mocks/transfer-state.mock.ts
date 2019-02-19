import { StateKey } from '@angular/platform-browser';

export class TransferStateMock {
  get: jest.Mock<any, [StateKey<string>, any]> = jest.fn();
  set: jest.Mock<any, [StateKey<string>]> = jest.fn();
  hasKey: jest.Mock<any, [StateKey<string>]> = jest.fn();
  remove: jest.Mock<any, [StateKey<string>]> = jest.fn();
}
