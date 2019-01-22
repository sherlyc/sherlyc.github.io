import retrieve from '../jsonFeed.retriever';
import * as jsonfeed from './fixtures/jsonfeed.json';
import axios from 'axios';

jest.mock('axios');

describe('JsonFeed Retriever', () => {
  it('should respond with the article list', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: jsonfeed });
    expect(await retrieve()).toEqual(jsonfeed);
  });

  it('should not retrieve the article list when jsonfeed request fails', async () => {
    const error = new Error('AJAX error');
    (axios.get as jest.Mock).mockRejectedValue(error);
    await expect(retrieve()).rejects.toEqual(error);
  });

  it('should retry the api call', async () => {
    (axios.get as jest.Mock)
      .mockRejectedValueOnce(new Error('Internal Server Error'))
      .mockResolvedValue({ data: jsonfeed });
    expect(await retrieve()).toEqual(jsonfeed);
  });
});
