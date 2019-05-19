import VideoHandler from './video-handler';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';
import { IVideoUnit } from '../../../common/__types__/IVideoUnit';

describe('VideoHandler', () => {

  it('should return VideoUnit', async () => {
    const videoUnit = await VideoHandler();

    const expectedResult: IVideoUnit[] = [
      {
        type: ContentBlockType.VideoUnit
      } as IVideoUnit
    ];

    expect(videoUnit).toEqual(expectedResult);
  });
});
