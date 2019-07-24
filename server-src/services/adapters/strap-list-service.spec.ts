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
  let parameters: IParams;

  beforeEach(() => {
    parameters = {
      apiRequestId: 'request-id-for-testing',
      cache: {}
    };
  });

  beforeAll(() => {
    config.strapConfig = {
      dedupeList: ['strapEditorPicks'],
      homepageStraps: {
        strapEditorPicks: {
          ids: ['63868237'],
          toDedupe: false
        },
        strapDailyFix: {
          ids: ['63868237', '63768623'],
          toDedupe: false
        },
        strapTopStories: {
          ids: ['63868237', '63784884'],
          toDedupe: true
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

  it('should save strapArticles to cache', async () => {
    (getListAssetById as jest.Mock)
      .mockResolvedValueOnce(rawList)
      .mockResolvedValueOnce(rawSecondList)
      .mockResolvedValueOnce(rawList);

    await getStrapArticles(parameters, Strap.TopStories);
    const topStoriesCache = parameters.cache!['strapTopStories'];

    expect(topStoriesCache).toMatchObject(rawSecondList);
  });

  it('should read strapArticles from cache', async () => {
    parameters.cache!['strapTopStories'] = rawSecondList;
    const topStoriesCache = parameters.cache!['strapTopStories'];
    const result = await getStrapArticles(parameters, Strap.TopStories);

    expect(result).toBe(topStoriesCache);
  });
});
