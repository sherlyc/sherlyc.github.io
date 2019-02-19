import retrieve from './jsonfeed-retriever';
import * as jsonfeed from './__fixtures__/jsonfeed.json';
import axios from 'axios';
import { Section } from './section';

jest.mock('axios');

describe('JsonFeed Retriever', () => {
  it('should respond with the article list', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: jsonfeed });
    expect(await retrieve(Section.latest, 6)).toEqual(jsonfeed);
  });

  it('should not retrieve the article list when jsonfeed request fails', async () => {
    const error = new Error('AJAX error');
    (axios.get as jest.Mock).mockRejectedValue(error);
    await expect(retrieve(Section.latest, 6)).rejects.toEqual(error);
  });

  it('should retry the api call', async () => {
    (axios.get as jest.Mock)
      .mockRejectedValueOnce(new Error('Internal Server Error'))
      .mockReturnValue(Promise.resolve({ data: jsonfeed }));
    expect(await retrieve(Section.latest, 6)).toEqual(jsonfeed);
  });
});
