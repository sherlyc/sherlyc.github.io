import { getStrapArticles } from './strap-list-service';
import { Strap } from '../strap';
import { IParams } from '../__types__/IParams';
import { getListAssetById } from './jsonfeed';
import * as rawList from './__fixtures__/strap-list-service/raw-article-list.json';
import * as rawSecondList from './__fixtures__/strap-list-service/raw-second-article-list.json';
import config from '../utils/config';
import { IStrapConfigDefinition } from '../utils/__types__/IStrapConfigDefinition';

jest.mock('./jsonfeed');

describe('The strap list service', () => {
  const parameters: IParams = {
    apiRequestId: 'request-id-for-testing'
  };

  beforeEach(() => {
    config.strapConfig = {
      dedupeList: ['strapEditorPicks'],
      homepageStraps: {
        strapEditorPicks: {
          ids: ['63868237'],
          shouldDedupe: false
        },
        strapDailyFix: {
          ids: ['63868237', '63768623'],
          shouldDedupe: false
        },
        strapTopStories: {
          ids: ['63868237', '63784884'],
          shouldDedupe: true
        }
      }
    } as IStrapConfigDefinition;
  });

  it('should return strap articles when strap composed by one list', async () => {
    (getListAssetById as jest.Mock).mockResolvedValue(rawList);

    const result = await getStrapArticles(parameters, Strap.EditorPicks);
    expect(result).toMatchObject(rawList);
  });

  it('should return strap articles when strap composed by multiple lists', async () => {
    (getListAssetById as jest.Mock)
      .mockResolvedValueOnce(rawList)
      .mockResolvedValueOnce(rawSecondList);

    const result = await getStrapArticles(parameters, Strap.DailyFix);
    expect(result).toMatchObject([...rawList, ...rawSecondList]);
  });

  it('should return strap articles when strap composed by multiple lists and respect limit', async () => {
    (getListAssetById as jest.Mock)
      .mockResolvedValueOnce(rawList)
      .mockResolvedValueOnce(rawSecondList);

    const result = await getStrapArticles(parameters, Strap.DailyFix, 8);
    expect(result).toMatchObject([...rawList, ...rawSecondList].slice(0, 8));
  });

  it('should deduplicate list from configured deduplication lists', async () => {
    (getListAssetById as jest.Mock)
      .mockResolvedValueOnce(rawList)
      .mockResolvedValueOnce(rawSecondList)
      .mockResolvedValueOnce(rawList);

    const result = await getStrapArticles(parameters, Strap.TopStories);

    expect(result).toMatchObject(rawSecondList);
  });

  it('should dedupe against dedupeList while respecting totalArticlesWithImages as limit', async () => {
    const limit = 2;
    config.strapConfig = {
      dedupeList: ['strapEditorPicks'],
      homepageStraps: {
        strapEditorPicks: {
          ids: ['60000000'],
          totalArticlesWithImages: limit,
          shouldDedupe: false
        },
        strapDailyFix: {
          ids: ['90000000'],
          totalArticlesWithImages: limit,
          shouldDedupe: true
        }
      }
    } as IStrapConfigDefinition;

    const dailyFixArticles = [{ id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];
    const editorPicksArticles = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const expectedArticles = [{ id: 3 }, { id: 4 }];

    (getListAssetById as jest.Mock)
      .mockResolvedValueOnce(dailyFixArticles)
      .mockResolvedValueOnce(editorPicksArticles);

    const result = await getStrapArticles(parameters, Strap.DailyFix, limit);

    expect(result).toMatchObject(expectedArticles);
  });

  it('should dedupe against dedupeList while respecting totalArticlesWithImages and totalTitleArticles as limit', async () => {
    config.strapConfig = {
      dedupeList: ['strapEditorPicks'],
      homepageStraps: {
        strapEditorPicks: {
          ids: ['60000000'],
          totalArticlesWithImages: 2,
          totalTitleArticles: 1,
          shouldDedupe: false
        },
        strapDailyFix: {
          ids: ['90000000'],
          totalArticlesWithImages: 2,
          totalTitleArticles: 1,
          shouldDedupe: true
        }
      }
    } as IStrapConfigDefinition;

    const dailyFixArticles = [{ id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];
    const editorPicksArticles = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const expectedArticles = [{ id: 4 }, { id: 5 }, { id: 6 }];

    (getListAssetById as jest.Mock)
      .mockResolvedValueOnce(dailyFixArticles)
      .mockResolvedValueOnce(editorPicksArticles);

    const result = await getStrapArticles(parameters, Strap.DailyFix, 3);

    expect(result).toMatchObject(expectedArticles);
  });
});
