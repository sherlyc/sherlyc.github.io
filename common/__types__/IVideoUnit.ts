import { ContentBlockType } from './ContentBlockType';

export interface IVideoUnit {
  type: ContentBlockType.VideoUnit;
  playlistId: string;
  accountId: string;
  playerId: string;
}
