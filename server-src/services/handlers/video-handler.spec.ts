import VideoHandler from './video-handler';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';
import { IVideoUnit } from '../../../common/__types__/IVideoUnit';
import config from '../utils/config';

jest.mock('../utils/config');

describe('VideoHandler', () => {
  it('should return VideoUnit', async () => {
    const playlistId = '7484894';
    const accountId = '8394004';
    const playerId = 'isXOSnh';
    const videoAnalyticsPluginSrc = 'https://plugin.js';
    const videoPlayerSrc = 'https://player.js';

    config.videoConfig = {
      playlistId,
      accountId,
      playerId,
      videoPlayerSrc,
      videoAnalyticsPluginSrc
    };

    const videoUnit = await VideoHandler();

    const expectedResult: IVideoUnit[] = [
      {
        type: ContentBlockType.VideoUnit,
        videoConfig: {
          playlistId,
          accountId,
          playerId,
          videoAnalyticsPluginSrc,
          videoPlayerSrc
        }
      } as IVideoUnit
    ];

    expect(videoUnit).toEqual(expectedResult);
  });
});
