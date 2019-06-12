import getBreakingNews from '../../adapters/breaking-news';
import { IBreakingNewsResponse } from '../../adapters/__types__/IBreakingNewsResponse';
import breakingNewsHandler from './breaking-news';
import { IBreakingNewsHandlerInput } from '../__types__/IBreakingNewsHandlerInput';
import { IParams } from '../../__types__/IParams';

jest.mock('../../adapters/breaking-news');

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


  it('should get an empty content block list when breaking news fails to be retrieved ', async () => {
    (getBreakingNews as jest.Mock).mockRejectedValue('Error retrieving breaking news');

    const contentBlocks = await breakingNewsHandler(
      handlerRunnerMock,
      {} as IBreakingNewsHandlerInput,
      params
    );
    expect(contentBlocks).toHaveLength(0);
  });
});
