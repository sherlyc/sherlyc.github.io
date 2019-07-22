import { getStrapArticles } from './strap-list-service';
import { Strap } from '../strap';
import { IParams } from '../__types__/IParams';
import { getListAssetById } from './jsonfeed';
import * as rawList from './__fixtures__/strap-list-service/raw-article-list.json';
import * as rawSecondList from './__fixtures__/strap-list-service/raw-second-article-list.json';
import config from '../utils/config';

jest.mock('./jsonfeed');

describe('The strap list service', () => {
  const parameters: IParams = {apiRequestId: 'request-id-for-testing'};

  beforeAll(() => {
    config.homepageStraps = {
      strapEditorPicks: {
        ids: ['63868237']
      },
      strapDailyFix: {
        ids: ['63868237', '63768623']
      }
    };
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
    config.homepageStraps = {
      strapEditorPicks: {
        ids: ['63868237']
      },
      strapTopStories: {
        ids: ['63868237', '63784884'],
        deduplicateFrom: ['strapEditorPicks']
      }
    };

    (getListAssetById as jest.Mock)
      .mockResolvedValueOnce(rawList)
      .mockResolvedValueOnce(rawSecondList)
      .mockResolvedValueOnce(rawList);

    const result = await getStrapArticles(parameters, Strap.TopStories);

    expect(result).toMatchObject(rawSecondList);
  });
});
