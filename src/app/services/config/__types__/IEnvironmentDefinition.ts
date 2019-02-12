import { ILoggerOptions } from '../../../../../common/__types__/ILoggerOptions';

export interface IEnvironmentDefinition {
  retryTimeout: number;
  requestTimeout: number;
  spadeAPI: string;
  loggerOptions: ILoggerOptions;
}
