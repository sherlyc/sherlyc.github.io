import getRawArticleList from '../jsonFeed';
import * as standard from './fixtures/standard.json';
import axios from 'axios';
import * as jsonfeed from './fixtures/jsonfeed.json';

jest.mock('axios');

describe('raw article list service', () => {
  it('should provide a raw article list', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: jsonfeed });
    expect(await getRawArticleList()).toEqual(standard);
  });
});
