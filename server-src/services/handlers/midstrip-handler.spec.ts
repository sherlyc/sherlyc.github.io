import midstripHandler from './midstrip-handler';
import { Section } from '../section';
import * as rawArticleList from './__fixtures__/raw-article-list.json';
import * as midstripHandlerOutput from './__fixtures__/midstrip-handler-output.json';
import jsonfeed from '../adapters/jsonfeed';
import { IColumnContainer } from 'common/__types__/IColumnContainer';

jest.mock('../adapters/jsonfeed');

describe('MidStripHandler', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should get a list of Image Links', async () => {
    const sectionId = Section.Business;
    const totalArticles = 2;

    (jsonfeed as jest.Mock).mockResolvedValue(rawArticleList);

    const handlerRunnerMock = jest.fn();

    const columnContainer = (await midstripHandler(handlerRunnerMock, {
      type: 'MidStrip',
      sectionId,
      totalArticles
    })) as IColumnContainer[];

    const imageLinkUnits = columnContainer[0].items;

    expect(imageLinkUnits.length).toBe(2);
    expect(columnContainer).toEqual(midstripHandlerOutput.TwoImageLink);
  });

  it('should get a list of Image links not exceeding number of requested item', async () => {
    const sectionId = Section.Business;
    const totalArticles = 1;
    (jsonfeed as jest.Mock).mockResolvedValue(rawArticleList);

    const handlerRunnerMock = jest.fn();

    const columnContainer = (await midstripHandler(handlerRunnerMock, {
      type: 'MidStrip',
      sectionId,
      totalArticles
    })) as IColumnContainer[];

    const imageLinkUnits = columnContainer[0].items;

    expect(imageLinkUnits.length).toBe(1);

    expect(columnContainer).toEqual(midstripHandlerOutput.OneImageLink);
  });
});
