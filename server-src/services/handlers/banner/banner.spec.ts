import getBanner from '../../adapters/banner';
import { IBannerResponse } from '../../adapters/__types__/IBannerResponse';
import bannerHandler from './banner';
import { IBreakingNewsHandlerInput } from '../__types__/IBreakingNewsHandlerInput';
import { IParams } from '../../__types__/IParams';
import logger from '../../utils/logger';
import { IBannerHandlerInput } from '../__types__/IBannerHandlerInput';

jest.mock('../../adapters/banner');

describe('BannerHandler', () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  beforeEach(() => {
    jest.resetModules();
  });

  it('should get a banner', async () => {
    const bannerResponse: IBannerResponse = {
      url: 'https://example.com/page.html',
      height: '60px'
    };
    (getBanner as jest.Mock).mockResolvedValue(bannerResponse);

    const contentBlocks = await bannerHandler(
      handlerRunnerMock,
      {} as IBannerHandlerInput,
      params
    );
    expect(contentBlocks).toHaveLength(1);
    expect(contentBlocks[0]).toEqual({
      type: 'ExternalContentUnit',
      height: '60px',
      margin: '0 0 10px 0',
      url: 'https://example.com/page.html',
      width: '100%'
    });
  });

  it('should get an empty content block list and log error when banner api fails', async () => {
    const error = new Error();
    const loggerSpy = jest.spyOn(logger, 'error');
    (getBanner as jest.Mock).mockRejectedValue(error);

    const contentBlocks = await bannerHandler(
      handlerRunnerMock,
      {} as IBannerHandlerInput,
      params
    );

    expect(contentBlocks).toHaveLength(0);
    expect(loggerSpy).toHaveBeenCalled();
  });
});
