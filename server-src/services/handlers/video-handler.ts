import { ContentBlockType } from '../../../common/__types__/ContentBlockType';
import { IVideoUnit } from '../../../common/__types__/IVideoUnit';
import config from '../utils/config';

export default async function(): Promise<IVideoUnit[]> {
  return [
    {
      type: ContentBlockType.VideoUnit,
      videoConfig: config.videoConfig
    }
  ];
}
