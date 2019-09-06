import getBanner from '../../adapters/banner';
import { IBannerResponse } from '../../adapters/__types__/IBannerResponse';
import bannerHandler from './banner';
import { IParams } from '../../__types__/IParams';
import logger from '../../utils/logger';
import { IBannerHandlerInput } from '../__types__/IBannerHandlerInput';

jest.mock('../../adapters/banner');
const OriginalNow = global.Date.now;

describe('BannerHandler', () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    global.Date.now = OriginalNow;
  });

  it('should get currently active banner based on current time', async () => {
    const bannerResponse: IBannerResponse[] = [
      {
        startDateTimeUTC: '2019-08-01T00:00:00',
        endDateTimeUTC: '2019-09-08T16:59:59',
        banner: {
          height: '65px',
          url: 'https://uber1.html'
        }
      },
      {
        startDateTimeUTC: '2019-09-08T17:00:00',
        endDateTimeUTC: '2019-09-15T11:00:00',
        banner: {
          height: '50px',
          url: 'https://uber2.html'
        }
      }
    ];
    (global as any).Date.now = () =>
      new Date('2019-09-08T16:59:59+00:00').getTime();
    (getBanner as jest.Mock).mockResolvedValue(bannerResponse);

    const contentBlocks = await bannerHandler(
      handlerRunnerMock,
      {} as IBannerHandlerInput,
      params
    );

    expect(contentBlocks).toHaveLength(1);
    expect(contentBlocks[0]).toEqual({
      type: 'ExternalContentUnit',
      height: '65px',
      margin: '0 0 10px 0',
      url: 'https://uber1.html',
      width: '100%'
    });
  });

  it('should return an empty content block when there is no active banner', async () => {
    const bannerResponse: IBannerResponse[] = [
      {
        startDateTimeUTC: '2019-08-01T00:00:00',
        endDateTimeUTC: '2019-09-08T16:59:59',
        banner: {
          height: '65px',
          url: 'https://uber1.html'
        }
      },
      {
        startDateTimeUTC: '2019-09-08T17:00:00',
        endDateTimeUTC: '2019-09-15T11:00:00',
        banner: {
          height: '50px',
          url: 'https://uber2.html'
        }
      }
    ];
    (global as any).Date.now = () =>
      new Date('2019-09-15T11:00:01+00:00').getTime();
    (getBanner as jest.Mock).mockResolvedValue(bannerResponse);

    const contentBlocks = await bannerHandler(
      handlerRunnerMock,
      {} as IBannerHandlerInput,
      params
    );

    expect(contentBlocks).toHaveLength(0);
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
