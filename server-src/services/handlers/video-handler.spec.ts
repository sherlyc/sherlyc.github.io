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

    config.video = { playlistId, accountId, playerId };

    const videoUnit = await VideoHandler();

    const expectedResult: IVideoUnit[] = [
      {
        type: ContentBlockType.VideoUnit,
        playlistId,
        accountId,
        playerId
      } as IVideoUnit
    ];

    expect(videoUnit).toEqual(expectedResult);
  });
});
