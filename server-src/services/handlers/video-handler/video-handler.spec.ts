import VideoHandler from './video-handler';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import config from '../../utils/config';
import * as FeatureService from '../../feature';
import { IBasicArticleSection } from '../../../../common/__types__/IBasicArticleSection';

jest.mock('../../utils/config');

describe('VideoHandler', () => {
  beforeEach(() => {
    (FeatureService as any).isFeatureEnabled = jest.fn();
  });

  it('should return new widget when feature switch in on', async () => {
    (FeatureService as any).isFeatureEnabled.mockReturnValue(true);

    const videoUnit = await VideoHandler();

    const expectedResult: IBasicArticleSection[] = [
      {
        type: ContentBlockType.BasicArticleSection,
        displayName: 'Video',
        displayNameColor: 'teal',
        linkUrl: '/video',
        items: [
          {
            type: ContentBlockType.ExternalContentUnit,
            height: 'calc(56% + 215px)',
            width: '100%',
            url:
              'https://www.playwidget.stuff.co.nz/hshelf/5d3a9a3fa0e845001c7c998a'
          }
        ]
      }
    ];

    expect(videoUnit).toEqual(expectedResult);
  });

  it('should return VideoUnit inside a basic section strap', async () => {
    (FeatureService as any).isFeatureEnabled.mockReturnValue(false);

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
