import getRawArticleList from './jsonfeed';
import * as rawArticleList from './__fixtures__/raw-article-list.json';
import axios from 'axios';
import * as jsonfeed from './__fixtures__/jsonfeed.json';
import { Section } from '../section';

jest.mock('axios');

describe('raw article list service', () => {
  it('should provide a raw article list', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: jsonfeed });
    expect(await getRawArticleList(Section.Latest, 2)).toEqual(rawArticleList);
  });
});
