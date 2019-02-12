import orchestrate from './orchestrator';
import * as homepage from './__fixtures__/homepage.json';
import getRawArticleList from './content-source/jsonFeed';
import contentLogic from './content-logic/contentLogic';
import generate from './layout/layoutGenerator';

jest.mock('./content-source/jsonFeed');
jest.mock('./content-logic/contentLogic');
jest.mock('./layout/layoutGenerator');

describe.only('Orchestrator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide homepage content blocks', async () => {
    (generate as jest.Mock).mockReturnValue(homepage);
    await expect(orchestrate()).resolves.toEqual(homepage);
    expect(getRawArticleList as jest.Mock).toHaveBeenCalledTimes(1);
    expect(contentLogic as jest.Mock).toBeCalledTimes(1);
    expect(generate as jest.Mock).toBeCalledTimes(1);
  });

  it('should provide an error content block when jsonfeed retriever fails', async () => {
    (getRawArticleList as jest.Mock).mockRejectedValue(new Error('Http error'));
    await expect(orchestrate()).resolves.toEqual([
      { type: 'ErrorBlock', message: 'Http error' }
    ]);
    expect(contentLogic as jest.Mock).not.toHaveBeenCalled();
    expect(generate as jest.Mock).not.toHaveBeenCalled();
  });
});
