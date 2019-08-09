import { ILoggerOptions } from '../../../../common/__types__/ILoggerOptions';
import { IVideoConfig } from '../../../../src/app/content-blocks/video-unit/__types__/IVideoConfig';
import { IStrapConfigDefinition } from './IStrapConfigDefinition';

export interface IEnvironmentDefinition {
  retryTimeout: number;
  requestTimeout: number;
  jsonFeedAPI: string;
  weatherAPI: string;
  breakingNewsApi: string;
  layoutAPI: string;
  maxArticlesToRetrieve: number;
  loggerOptions: ILoggerOptions;
  videoConfig: IVideoConfig;
  strapConfig: IStrapConfigDefinition;
}
