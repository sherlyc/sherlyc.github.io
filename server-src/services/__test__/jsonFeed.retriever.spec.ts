import retrieve from '../jsonFeed.retriever';
import * as jsonfeed from './fixtures/jsonfeed.json';
import axios from 'axios';
import { HttpError } from '../../interfaces/HttpError';

jest.mock('axios');

describe('JsonFeed Retriever', () => {
  it('should respond with the article list', async () => {
    (axios.get as any).mockResolvedValue({ data: jsonfeed });
    expect(await retrieve()).toEqual(jsonfeed);
  });

  it('should not retrieve the article list when jsonfeed responds with 500', async () => {
    (axios.get as any).mockRejectedValue(
      new HttpError('Internal Server Error', '500')
    );
    await expect(retrieve()).rejects.toMatchObject(
      new HttpError('Internal Server Error', '500')
    );
  });

  it('should not retrieve the article list when jsonfeed request fails', async () => {
    (axios.get as any).mockRejectedValue(new HttpError('AJAX error', '400'));
    await expect(retrieve()).rejects.toEqual(
      new HttpError('AJAX error', '400')
    );
  });

  it('should retry the api call', async () => {
    (axios.get as any)
      .mockRejectedValueOnce(new HttpError('Internal Server Error', '500'))
      .mockResolvedValue({ data: jsonfeed });

    expect(await retrieve()).toEqual(jsonfeed);
  });
});
