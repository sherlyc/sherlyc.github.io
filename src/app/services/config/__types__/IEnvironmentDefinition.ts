import { ILoggerOptions } from '../../../../../common/__types__/ILoggerOptions';
import { Omit } from 'utility-types';
import { IVideoConfig } from '../../../content-blocks/video-unit/__types__/IVideoConfig';

export interface IEnvironmentDefinition {
  retryTimeout: number;
  requestTimeout: number;
  spadeAPI: string;
  weatherAPI: string;
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
}
