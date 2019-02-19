import { ILoggerOptions } from '../../../../../common/__types__/ILoggerOptions';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export interface IEnvironmentDefinition {
  retryTimeout: number;
  requestTimeout: number;
  spadeAPI: string;
  loggerOptions: ILoggerOptions;
  aadSdkUrl: string;
  serverOverrides?: Omit<
    IEnvironmentDefinition,
    'serverOverrides' | 'browserOverrides'
  >;
  browserOverrides?: Omit<
    IEnvironmentDefinition,
    'serverOverrides' | 'browserOverrides'
  >;
}
