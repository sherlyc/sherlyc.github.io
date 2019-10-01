import { IParams } from '../__types__/IParams';
import { retrieveConfig } from './switches-config-retriever';
import cacheHttp from '../utils/cache-http';
import logger from '../utils/logger';

jest.mock('../utils/cache-http');
jest.mock('../utils/logger');

describe('Experiments Config Retriever', () => {
  const params: IParams = { apiRequestId: '123123' };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call http with experiments config url', async () => {
    (cacheHttp as jest.Mock).mockReturnValue({ data: {} });
    const url = 'www.example.com';

    const configData = await retrieveConfig(url, params);
    expect(configData).toEqual({});
    expect(cacheHttp).toHaveBeenCalledWith(params, url);
  });

  it('should return empty config and log error when config fails to load and previous valid data is not available', async () => {
    (cacheHttp as jest.Mock).mockRejectedValue(new Error());
    const url = 'www.example.com';

    const configData = await retrieveConfig(url, params);
    expect(configData).toEqual({});
    expect(logger.error).toHaveBeenCalled();
  });

  it('should return last valid config and log error when config fails to load', async () => {
    (cacheHttp as jest.Mock).mockReturnValueOnce({ data: { a: 1 } });
    (cacheHttp as jest.Mock).mockRejectedValue(new Error());
    const url = 'www.example.com';

    const configData1 = await retrieveConfig(url, params);
    expect(configData1).toEqual({ a: 1 });
    expect(logger.error).not.toHaveBeenCalled();

    const configData2 = await retrieveConfig(url, params);
    expect(configData2).toEqual({ a: 1 });
    expect(logger.error).toHaveBeenCalled();
  });
});
