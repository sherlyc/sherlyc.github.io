import orchestrate from '../orchestrator';
import * as homepage from './fixtures/homepage.json';
import * as standard from './fixtures/standard.json';
import getRawArticleList from '../content-source/jsonFeed';

jest.mock('../content-source/jsonFeed');

describe.only('Orchestrator', () => {
  it('should provide homepage content blocks', async () => {
    (getRawArticleList as jest.Mock).mockResolvedValue(standard);
    await expect(orchestrate()).resolves.toEqual(homepage);
  });

  it('should provide an error content block when jsonfeed retriever fails', async () => {
    (getRawArticleList as jest.Mock).mockRejectedValue(new Error('Http error'));
    await expect(orchestrate()).resolves.toEqual([
      { type: 'ErrorBlock', message: 'Http error' }
    ]);
  });
});
