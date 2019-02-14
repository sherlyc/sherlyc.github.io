import { EnvironmentName, RuntimeService } from './runtime.service';

export class RuntimeServiceMock {
  isRunInBrowser: jest.Mock<() => boolean> = jest.fn();

  isRunInServer: jest.Mock<() => boolean> = jest.fn();

  runInServerOnly: jest.Mock<
    Pick<RuntimeService, 'runInServerOnly'>
  > = jest.fn();

  runInBrowserOnly: jest.Mock<
    Pick<RuntimeService, 'runInBrowserOnly'>
  > = jest.fn();

  getTransferState: jest.Mock<
    Pick<RuntimeService, 'getTransferState'>
  > = jest.fn();

  getEnvironmentVariable: jest.Mock<
    (name: EnvironmentName, defaultValue: string) => void
  > = jest.fn();
}
