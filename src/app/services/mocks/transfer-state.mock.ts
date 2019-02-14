import { StateKey } from '@angular/platform-browser';

type getType = <T>(key: StateKey<T>, defaultValue: T) => T;
type setType = <T>(key: StateKey<T>, value: T) => void;

export class TransferStateMock {
  get: jest.Mock<getType> = jest.fn();
  set: jest.Mock<setType> = jest.fn();
}
