import getRawArticleList from './jsonfeed';
import * as rawArticleList from './__fixtures__/raw-article-list.json';
import http from '../utils/http';
import * as jsonfeed from './__fixtures__/jsonfeed.json';
import { Section } from '../section';

jest.mock('../utils/http');

describe('raw article list service', () => {
  it('should provide a raw article list', async () => {
    (http.get as jest.Mock).mockResolvedValue({ data: jsonfeed });
    expect(await getRawArticleList(Section.Latest, 2)).toEqual(rawArticleList);
  });
});
