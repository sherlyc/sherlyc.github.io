import retrieve from '../jsonFeed.retriever';
import * as jsonfeed from './fixtures/jsonfeed.json';
import axios from 'axios';

jest.mock('axios');

describe('JsonFeed Retriever', () => {
  it('should respond with the article list', async () => {
    (axios.get as any).mockResolvedValue({ data: jsonfeed });
    expect(await retrieve(false)).toEqual(jsonfeed);
  });

  it('should not retrieve the article list when jsonfeed responds with 500', async () => {
    const error = new Error('Internal Server Error');
    (axios.get as any).mockRejectedValue(error);
    await expect(retrieve(false)).rejects.toEqual(error);
  });

  it('should not retrieve the article list when jsonfeed request fails', async () => {
    const error = new Error('AJAX error');
    (axios.get as any).mockRejectedValue(error);
    await expect(retrieve(false)).rejects.toEqual(error);
  });

  it('should retry the api call', async () => {
    (axios.get as any)
      .mockRejectedValueOnce(new Error('Internal Server Error'))
      .mockResolvedValue({ data: jsonfeed });

    expect(await retrieve()).toEqual(jsonfeed);
  });
});
