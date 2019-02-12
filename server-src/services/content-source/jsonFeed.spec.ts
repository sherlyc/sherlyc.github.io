import getRawArticleList from './jsonFeed';
import * as standard from './__fixtures__/standard.json';
import axios from 'axios';
import * as jsonfeed from './__fixtures__/jsonfeed.json';

jest.mock('axios');

describe('raw article list service', () => {
  it('should provide a raw article list', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: jsonfeed });
    expect(await getRawArticleList()).toEqual(standard);
  });
});
