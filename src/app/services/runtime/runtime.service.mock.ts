import { EnvironmentName, RuntimeService } from './runtime.service';

export class RuntimeServiceMock {
  isBrowser: jest.Mock<() => boolean> = jest.fn();

  isServer: jest.Mock<() => boolean> = jest.fn();

  getTransferState: jest.Mock<
    Pick<RuntimeService, 'getTransferState'>
  > = jest.fn();

  getEnvironmentVariable: jest.Mock<
    (name: EnvironmentName, defaultValue: string) => void
  > = jest.fn();
}