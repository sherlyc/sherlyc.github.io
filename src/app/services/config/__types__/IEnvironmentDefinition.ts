import { ILoggerOptions } from '../../../../../common/__types__/ILoggerOptions';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export interface IEnvironmentDefinition {
  retryTimeout: number;
  requestTimeout: number;
  spadeAPI: string;
  loggerOptions: ILoggerOptions;
  aadSdkUrl: string;
  serverOverrides?: Partial<
    Omit<IEnvironmentDefinition, 'serverOverrides' | 'browserOverrides'>
  >;
  browserOverrides?: Partial<
    Omit<IEnvironmentDefinition, 'serverOverrides' | 'browserOverrides'>
  >;
}
