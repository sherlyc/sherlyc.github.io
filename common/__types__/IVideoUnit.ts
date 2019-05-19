import { ContentBlockType } from './ContentBlockType';

export interface IVideoUnit {
  type: ContentBlockType.VideoUnit;
  playlistId: string;
  account: string;
  player: string;
}
