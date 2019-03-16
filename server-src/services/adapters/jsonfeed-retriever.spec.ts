import retrieve from './jsonfeed-retriever';
import * as jsonfeed from './__fixtures__/jsonfeed.json';
import http from '../utils/http';
import { Section } from '../section';

jest.mock('../utils/http');

describe('JsonFeed Retriever', () => {
  it('should respond with the article list', async () => {
    (http.get as jest.Mock).mockResolvedValue({ data: jsonfeed });
    expect(await retrieve(Section.Latest, 6)).toEqual(jsonfeed);
  });

  it('should not retrieve the article list when jsonfeed request fails', async () => {
    const error = new Error('AJAX error');
    (http.get as jest.Mock).mockRejectedValue(error);
    await expect(retrieve(Section.Latest, 6)).rejects.toEqual(error);
  });
});
