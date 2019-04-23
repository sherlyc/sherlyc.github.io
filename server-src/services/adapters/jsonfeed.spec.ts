import getRawArticleList from './jsonfeed';
import * as rawArticleList from './__fixtures__/raw-article-list.json';
import http from '../utils/http';
import * as jsonfeed from './__fixtures__/jsonfeed.json';
import { Section } from '../section';
import { IParams } from '../__types__/IParams';

jest.mock('../utils/http');

describe('raw article list service', () => {
  beforeAll(() => {
    (http as jest.Mock).mockReturnValue({
      get: jest.fn(),
      post: jest.fn()
    });
  });
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  it('should provide a raw article list', async () => {
    (http(params).get as jest.Mock).mockResolvedValue({ data: jsonfeed });
    expect(await getRawArticleList(Section.Latest, 2, params)).toEqual(
      rawArticleList
    );
  });
});
