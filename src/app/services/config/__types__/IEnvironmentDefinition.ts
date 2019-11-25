import { ILoggerOptions } from '../../../../../common/__types__/ILoggerOptions';
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
    limitPerSegment: number;
  };
  loggerOptions: ILoggerOptions;
  aadSdkUrl: string;
  sentryIO: { dsn: string; sampleRate: number; environment: string };
  dtmUrl: string;
  loginLibrary: ILoginLibraryConfig;
  redirectUrl: string;
}
