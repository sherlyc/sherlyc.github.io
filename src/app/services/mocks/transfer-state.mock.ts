import { StateKey } from '@angular/platform-browser';

type getType = <T>(key: StateKey<T>, defaultValue: T) => T;
type setType = <T>(key: StateKey<T>, value: T) => void;
type hasKeyType = <T>(key: StateKey<T>) => boolean;
type remove = <T>(key: StateKey<T>) => boolean;

export class TransferStateMock {
  get: jest.Mock<getType> = jest.fn();
  set: jest.Mock<setType> = jest.fn();
  hasKey: jest.Mock<hasKeyType> = jest.fn();
  remove: jest.Mock<remove> = jest.fn();
}
