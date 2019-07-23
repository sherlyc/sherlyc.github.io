import { ILoggerOptions } from '../../../../common/__types__/ILoggerOptions';
import { IVideoConfig } from '../../../../src/app/content-blocks/video-unit/__types__/IVideoConfig';
import { IStrapDefinition } from './IStrapDefinition';
import { Strap } from '../../strap';

export interface IEnvironmentDefinition {
  retryTimeout: number;
  requestTimeout: number;
  jsonFeedAPI: string;
  midStripListAssetId: string;
  miniMidStripListAssetId: string;
  editorsPickAssetId: string;
  topStoriesListAssetId: string;
  dailyFixAssetId: string;
  weatherAPI: string;
  breakingNewsApi: string;
  layoutAPI: string;
  maxArticlesToRetrieve: number;
  loggerOptions: ILoggerOptions;
  videoConfig: IVideoConfig;
  homepageStraps: { [key in Strap]: IStrapDefinition };
}
