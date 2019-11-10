import getBanner from '../../adapters/banner';
import { IBannerResponse } from '../../adapters/__types__/IBannerResponse';
import bannerHandler from './banner';
import { IParams } from '../../__types__/IParams';
import logger from '../../utils/logger';
import { IBannerHandlerInput } from '../__types__/IBannerHandlerInput';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IExternalContentUnit } from '../../../../common/__types__/IExternalContentUnit';
import { HandlerInputType } from '../__types__/HandlerInputType';

jest.mock('../../adapters/banner');
const OriginalNow = global.Date.now;

describe('BannerHandler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  const bannerOne = {
    startDateTimeUTC: '2019-08-01T00:00:00',
    endDateTimeUTC: '2019-09-08T16:59:59',
    banner: {
      height: '65px',
      url: 'https://uber1.html'
    }
  };
  const bannerTwo = {
    startDateTimeUTC: '2019-09-08T17:00:00',
    endDateTimeUTC: '2019-09-15T11:00:00',
    banner: {
      height: '50px',
      url: 'https://uber2.html'
    }
  };
  const defaultExternalContentHandlerInput: Partial<IExternalContentUnit> = {
    type: ContentBlockType.ExternalContentUnit,
    height: '50px',
    width: '100%',
    margin: '0 0 10px 0'
  };

  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    global.Date.now = OriginalNow;
  });

  it('should get currently active banner based on current time', async () => {
    const handlerRunnerMock = jest.fn();
    const bannerResponse: IBannerResponse[] = [bannerOne, bannerTwo];
    const withinBannerOneDateRange = '2019-09-08T16:59:59+00:00';
    (global as any).Date.now = () =>
      new Date(withinBannerOneDateRange).getTime();
    (getBanner as jest.Mock).mockResolvedValue(bannerResponse);
    handlerRunnerMock.mockResolvedValue([
      {
        ...defaultExternalContentHandlerInput,
        url: bannerOne.banner.url,
        height: bannerOne.banner.height
      }
    ]);

    const contentBlocks = await bannerHandler(
      handlerRunnerMock,
      {} as IBannerHandlerInput,
      params
    );

    expect(contentBlocks).toHaveLength(1);
    expect(contentBlocks[0]).toEqual({
      type: 'ExternalContentUnit',
      height: bannerOne.banner.height,
      margin: '0 0 10px 0',
      url: bannerOne.banner.url,
      width: '100%'
    });
  });

  it('should return an empty content block when there is no active banner', async () => {
    const handlerRunnerMock = jest.fn();
    const bannerResponse: IBannerResponse[] = [bannerOne, bannerTwo];
    const withinBannerTwoDateRange = '2019-09-15T11:00:01+00:00';
    (global as any).Date.now = () =>
      new Date(withinBannerTwoDateRange).getTime();
    (getBanner as jest.Mock).mockResolvedValue(bannerResponse);
    handlerRunnerMock.mockResolvedValue([
      {
        ...defaultExternalContentHandlerInput,
        url: bannerTwo.banner.url,
        height: bannerTwo.banner.height
      }
    ]);

    const contentBlocks = await bannerHandler(
      handlerRunnerMock,
      {} as IBannerHandlerInput,
      params
    );

    expect(contentBlocks).toHaveLength(0);
  });

  it('should get an empty content block list and log error when banner api fails', async () => {
    const handlerRunnerMock = jest.fn();
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

  it('should delegate creation of ExternalContentUnit', async () => {
    const handlerRunnerMock = jest.fn();
    const bannerResponse: IBannerResponse[] = [bannerOne];
    const withinBannerOneDateRange = '2019-09-08T16:59:59+00:00';
    (global as any).Date.now = () =>
      new Date(withinBannerOneDateRange).getTime();
    (getBanner as jest.Mock).mockResolvedValue(bannerResponse);

    const externalContentBlocks = [
      {
        ...defaultExternalContentHandlerInput,
        url: bannerOne.banner.url,
        height: bannerOne.banner.height
      }
    ];
    handlerRunnerMock.mockResolvedValue(externalContentBlocks);

    const contentBlocks = await bannerHandler(
      handlerRunnerMock,
      {} as IBannerHandlerInput,
      params
    );

    expect(handlerRunnerMock).toHaveBeenCalledTimes(1);
    expect(handlerRunnerMock).toHaveBeenCalledWith(
      {
        type: HandlerInputType.ExternalContent,
        width: '100%',
        margin: '0 0 10px 0',
        height: bannerOne.banner.height,
        url: bannerOne.banner.url
      },
      params
    );
    expect(contentBlocks).toEqual(externalContentBlocks);
  });
});
