import { ILoggerOptions } from '../../../../common/__types__/ILoggerOptions';
import { IVideoConfig } from '../../../../src/app/content-blocks/video-unit/__types__/IVideoConfig';

export interface IEnvironmentDefinition {
  retryTimeout: number;
  requestTimeout: number;
  jsonFeedAPI: string;
  midStripListAssetId: string;
  miniMidStripListAssetId: string;
  editorsPickAssetId: string;
  weatherAPI: string;
  contentAPI: string;
  maxArticlesToRetrieve: number;
  loggerOptions: ILoggerOptions;
  videoConfig: IVideoConfig;
}
