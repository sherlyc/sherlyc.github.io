import getBreakingNews from '../adapters/breaking-news';
import { IRawBreakingNews } from '../adapters/__types__/IRawBreakingNews';
import breakingNewsHandler from './breaking-news';
import { IBreakingNewsHandlerInput } from './__types__/IBreakingNewsHandlerInput';

jest.mock('../adapters/breaking-news');

describe('BreakingNewsHandler', () => {
  const handlerRunnerMock = jest.fn();

  beforeEach(() => {
    jest.resetModules();
  });

  it('should get a content block when breaking news is enabled', async () => {
    const rawBreakingNews: IRawBreakingNews = {
      enabled: true,
      id: 'whatever',
      text: 'breaking_news_text',
      link: 'http://example.com'
    };
    (getBreakingNews as jest.Mock).mockResolvedValue(rawBreakingNews);

    const contentBlocks = await breakingNewsHandler(
      handlerRunnerMock,
      {} as IBreakingNewsHandlerInput
    );
    expect(contentBlocks).toHaveLength(1);
    expect(contentBlocks[0]).toEqual({
      type: 'BreakingNews',
      id: rawBreakingNews.id,
      text: rawBreakingNews.text,
      link: rawBreakingNews.link
    });
  });

  it('should get an empty content block list when breaking news is not enabled', async () => {
    const rawBreakingNews: IRawBreakingNews = {
      enabled: false
    };
    (getBreakingNews as jest.Mock).mockResolvedValue(rawBreakingNews);

    const contentBlocks = await breakingNewsHandler(
      handlerRunnerMock,
      {} as IBreakingNewsHandlerInput
    );
    expect(contentBlocks).toHaveLength(0);
  });
});
