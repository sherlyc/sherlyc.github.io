import retrieve from './jsonfeed.retriever';
import * as jsonfeed from './fixtures/jsonfeed.json';
import axios from 'axios';

jest.mock('axios');

describe('JsonFeed Retriever', () => {
  it('should respond with the article list', async () => {
    (axios.get as any).mockResolvedValue({ data: jsonfeed });
    expect(await retrieve()).toEqual(jsonfeed);
  });

  it('should not retrieve the article list when jsonfeed responds with 500', async () => {
    (axios.get as any).mockResolvedValue({ status: 500 });
    await expect(retrieve()).rejects.toThrow('500');
  });

  it('should not retrieve the article list when jsonfeed request fails', async () => {
    (axios.get as any).mockRejectedValue(new Error('AJAX error'));
    await expect(retrieve()).rejects.toThrow('AJAX error');
  });
});
