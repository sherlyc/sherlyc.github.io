import { ILoggerOptions } from './ILoggerOptions';

export interface IEnvironmentDefinition {
  retryTimeout: number;
  requestTimeout: number;
  jsonFeedAPI: string;
  loggerOptions: ILoggerOptions;
}
