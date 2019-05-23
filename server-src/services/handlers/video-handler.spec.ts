import VideoHandler from './video-handler';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';
import config from '../utils/config';
import { IBasicArticleSection } from '../../../common/__types__/IBasicArticleSection';

jest.mock('../utils/config');

describe('VideoHandler', () => {
  it('should return VideoUnit inside a basic section strap', async () => {
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

    const expectedResult: IBasicArticleSection[] = [
      {
        type: ContentBlockType.BasicArticleSection,
        displayName: 'Video',
        displayNameColor: 'teal',
        linkUrl: '/video',
        items: [
          {
            type: ContentBlockType.VideoUnit,
            videoConfig: {
              playlistId,
              accountId,
              playerId,
              videoAnalyticsPluginSrc,
              videoPlayerSrc
            }
          }
        ]
      }
    ];

    expect(videoUnit).toEqual(expectedResult);
  });
});
