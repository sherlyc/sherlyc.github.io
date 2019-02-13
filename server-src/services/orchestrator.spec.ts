import orchestrate from './orchestrator';
import * as homepage from './__fixtures__/homepage.json';
import getRawArticleList from './content-source/jsonfeed';
import contentLogic from './content-logic/content-logic';
import generate from './layout/layout-generator';

jest.mock('./content-source/jsonfeed');
jest.mock('./content-logic/content-logic');
jest.mock('./layout/layout-generator');

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
