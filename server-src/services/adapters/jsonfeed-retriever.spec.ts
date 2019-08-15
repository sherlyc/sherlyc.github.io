import { retrieveSectionList, retrieveListAsset } from './jsonfeed-retriever';
import * as jsonfeed from './__fixtures__/jsonfeed/jsonfeed.json';
import * as midStripData from './__fixtures__/mid-strip/mid-strip.json';
import http from '../utils/http';
import { Section } from '../section';
import { IParams } from '../__types__/IParams';

jest.mock('../utils/http');

describe('JsonFeed Retriever', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  beforeAll(() => {
    (http as jest.Mock).mockReturnValue({
      get: jest.fn(),
      post: jest.fn()
    });
  });

  it('should respond with the article list given a section', async () => {
    (http(params).get as jest.Mock).mockResolvedValue({ data: jsonfeed });
    expect(await retrieveSectionList(Section.Latest, 6, params)).toEqual(
      jsonfeed
    );
  });

  it('should throw error when jsonfeed request for article section list fails ', async () => {
    const error = new Error('AJAX error');
    (http(params).get as jest.Mock).mockRejectedValue(error);
    await expect(
      retrieveSectionList(Section.Latest, 6, params)
    ).rejects.toEqual(error);
  });

  it('should respond with a list data given a list id', async () => {
    (http(params).get as jest.Mock).mockResolvedValue({ data: midStripData });

    expect(
      await retrieveListAsset('34934820')(params, 2)
    ).toEqual(midStripData);
  });

  it('should throw error when jsonfeed request for a list  fails', async () => {
    const error = new Error('AJAX error');
    (http(params).get as jest.Mock).mockRejectedValue(error);

    await expect(
      retrieveListAsset('34934820')(params, 2)
    ).rejects.toEqual(error);
  });

  it('should retrieve specified number of articles', async () => {
    (http(params).get as jest.Mock).mockResolvedValue({ data: midStripData });

    const midStripJsonFeed = await retrieveListAsset(
      '34934820'
    )(params, 1);

    const articles = midStripJsonFeed.assets;
    expect(articles.length).toEqual(1);
  });

  it('should retrieve all articles if specifed total is more than number of articles received', async () => {
    (http(params).get as jest.Mock).mockResolvedValue({ data: midStripData });

    const midStripJsonFeed = await retrieveListAsset('34934820')(params, 5);

    const articles = midStripJsonFeed.assets;
    expect(articles.length).toEqual(2);
  });
});
