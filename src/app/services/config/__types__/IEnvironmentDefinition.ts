import { ILoggerOptions } from '../../../../../common/__types__/ILoggerOptions';
import { Omit } from 'utility-types';
import { ILoginLibraryConfig } from '../../authentication/__types__/ILoginLibraryConfig';

export interface IEnvironmentDefinition {
  retryTimeout: number;
  requestTimeout: number;
  spadeAPI: string;
  weatherAPI: string;
  experimentAPI: string;
  featureAPI: string;
  recommendationsAPI: string;
  recommendationsCookie: {
    name: string;
    segments: string[];
    maxCount: number;
  };
  loggerOptions: ILoggerOptions;
  aadSdkUrl: string;
  sentryIO: { dsn: string; sampleRate: number; environment: string };
  serverOverrides?: Partial<
    Omit<IEnvironmentDefinition, 'serverOverrides' | 'browserOverrides'>
  >;
  browserOverrides?: Partial<
    Omit<IEnvironmentDefinition, 'serverOverrides' | 'browserOverrides'>
  >;
  dtmUrl: string;
  loginLibrary: ILoginLibraryConfig;
}
