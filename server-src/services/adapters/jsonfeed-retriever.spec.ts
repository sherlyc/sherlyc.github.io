import retrieve from './jsonfeed-retriever';
import * as jsonfeed from './__fixtures__/jsonfeed.json';
import http from '../utils/http';
import { Section } from '../section';
import { IParams } from '../__types__/IParams';

jest.mock('../utils/http');

describe('JsonFeed Retriever', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  beforeAll(() => {
    (http as jest.Mock).mockReturnValue({
      get: jest.fn(),
      post: jest.fn()
    });
  });

  it('should respond with the article list', async () => {
    (http(params).get as jest.Mock).mockResolvedValue({ data: jsonfeed });
    expect(await retrieve(Section.Latest, 6, params)).toEqual(jsonfeed);
  });

  it('should not retrieve the article list when jsonfeed request fails', async () => {
    const error = new Error('AJAX error');
    (http(params).get as jest.Mock).mockRejectedValue(error);
    await expect(retrieve(Section.Latest, 6, params)).rejects.toEqual(error);
  });
});
