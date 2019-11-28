import getBreakingNews from '../../adapters/breaking-news/breaking-news';
import { IBreakingNewsResponse } from '../../adapters/__types__/IBreakingNewsResponse';
import breakingNewsHandler from './breaking-news';
import { IBreakingNewsHandlerInput } from '../__types__/IBreakingNewsHandlerInput';
import { IParams } from '../../__types__/IParams';
import logger from '../../utils/logger';

jest.mock('../../adapters/breaking-news/breaking-news');

describe('BreakingNewsHandler', () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  beforeEach(() => {
    jest.resetModules();
  });

  it('should get a content block when breaking news is enabled', async () => {
    const breakingNewsResponse: IBreakingNewsResponse = {
      enabled: true,
      id: 'whatever',
      text: 'breaking_news_text',
      link: 'http://example.com'
    };
    (getBreakingNews as jest.Mock).mockResolvedValue(breakingNewsResponse);

    const contentBlocks = await breakingNewsHandler(
      handlerRunnerMock,
      {} as IBreakingNewsHandlerInput,
      params
    );
    expect(contentBlocks).toHaveLength(1);
    expect(contentBlocks[0]).toEqual({
      type: 'BreakingNews',
      id: breakingNewsResponse.id,
      text: breakingNewsResponse.text,
      link: breakingNewsResponse.link
    });
  });

  it('should get an empty content block list when breaking news is not enabled', async () => {
    const breakingNewsResponse: IBreakingNewsResponse = {
      enabled: false
    };
    (getBreakingNews as jest.Mock).mockResolvedValue(breakingNewsResponse);

    const contentBlocks = await breakingNewsHandler(
      handlerRunnerMock,
      {} as IBreakingNewsHandlerInput,
      params
    );
    expect(contentBlocks).toHaveLength(0);
  });

  it('should get an empty content block list when breaking news is null', async () => {
    const breakingNewsResponse = null;
    (getBreakingNews as jest.Mock).mockResolvedValue(breakingNewsResponse);

    const contentBlocks = await breakingNewsHandler(
      handlerRunnerMock,
      {} as IBreakingNewsHandlerInput,
      params
    );
    expect(contentBlocks).toHaveLength(0);
  });

  it('should get an empty content block list and log error when breaking news api fails', async () => {
    const error = new Error();
    const loggerSpy = jest.spyOn(logger, 'error');
    (getBreakingNews as jest.Mock).mockRejectedValue(error);

    const contentBlocks = await breakingNewsHandler(
      handlerRunnerMock,
      {} as IBreakingNewsHandlerInput,
      params
    );

    expect(contentBlocks).toHaveLength(0);
    expect(loggerSpy).toHaveBeenCalled();
  });
});
