import midstripHandler from './midstrip-handler';
import { Section } from '../section';
import * as rawArticleList from './__fixtures__/raw-article-list.json';
import * as midstripHandlerOutput from './__fixtures__/midstrip-handler-output.json';
import jsonfeed from '../adapters/jsonfeed';

jest.mock('../adapters/jsonfeed');

describe('BasicArticleListHandler', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should get a list of Image Links', async () => {
    const sectionId = Section.Business;
    const totalArticles = 5;
    (jsonfeed as jest.Mock).mockResolvedValue(rawArticleList);

    const handlerRunnerMock = jest.fn();

    const contentBlocks = await midstripHandler(handlerRunnerMock, {
      type: 'MidStrip',
      sectionId,
      totalArticles
    });

    expect(contentBlocks.length).toBeLessThanOrEqual(totalArticles);
    expect(contentBlocks).toEqual(midstripHandlerOutput);
  });

  it('should get a list of Image links exceeding the maximum length', async () => {
    const sectionId = Section.Business;
    const totalArticles = 2;
    (jsonfeed as jest.Mock).mockResolvedValue(rawArticleList);

    const handlerRunnerMock = jest.fn();

    const contentBlocks = await midstripHandler(handlerRunnerMock, {
      type: 'MidStrip',
      sectionId,
      totalArticles
    });

    expect(contentBlocks.length).toBeLessThanOrEqual(totalArticles * 2 + 1);
    expect(contentBlocks).toEqual(
      midstripHandlerOutput.slice(0, totalArticles * 2 + 1)
    );
  });
});
