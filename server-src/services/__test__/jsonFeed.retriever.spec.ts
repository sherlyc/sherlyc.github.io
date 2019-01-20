import retrieve from '../jsonFeed.retriever';
import * as jsonfeed from './fixtures/jsonfeed.json';
import axios, { AxiosError } from 'axios';
import { IHttpError } from '../../interfaces/HttpError';

jest.mock('axios');

describe('JsonFeed Retriever', () => {
  it('should respond with the article list', async () => {
    (axios.get as any).mockResolvedValue({ data: jsonfeed });
    expect(await retrieve(false)).toEqual(jsonfeed);
  });

  it('should not retrieve the article list when jsonfeed responds with 500', async () => {
    (axios.get as any).mockRejectedValue(
      toAXiosError(new Error('Internal Server Error'), '500')
    );
    await expect(retrieve(false)).rejects.toEqual(
      toIHttpError(new Error('Internal Server Error'), '500')
    );
  });

  it('should not retrieve the article list when jsonfeed request fails', async () => {
    (axios.get as any).mockRejectedValue(
      toAXiosError(new Error('AJAX error'), '400')
    );
    await expect(retrieve(false)).rejects.toEqual(
      toIHttpError(new Error('AJAX error'), '400')
    );
  });

  it('should retry the api call', async () => {
    (axios.get as any)
      .mockRejectedValueOnce(
        toAXiosError(new Error('Internal Server Error'), '500')
      )
      .mockResolvedValue({ data: jsonfeed });

    expect(await retrieve()).toEqual(jsonfeed);
  });
});

const toAXiosError = (error: Error, code: string): AxiosError => {
  const axiosError: AxiosError = error as AxiosError;
  axiosError.code = code;
  return axiosError;
};

const toIHttpError = (error: Error, code: string): IHttpError => {
  const httpError: IHttpError = error as IHttpError;
  httpError.code = code;
  return httpError;
};
