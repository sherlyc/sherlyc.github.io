import { ContentBlockType } from './ContentBlockType';
import { IVideoConfig } from '../../src/app/content-blocks/video-unit/__types__/IVideoConfig';

export interface IVideoUnit {
  type: ContentBlockType.VideoUnit;
  videoConfig: IVideoConfig;
}
