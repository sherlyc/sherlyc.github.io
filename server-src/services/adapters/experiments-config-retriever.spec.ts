import { IParams } from '../__types__/IParams';
import { retrieveExperimentsConfig } from './experiments-config-retriever';
import cacheHttp from '../utils/cache-http';
import config from '../utils/config';
import logger from '../utils/logger';

jest.mock('../utils/cache-http');
jest.mock('../utils/logger');

describe('Experiments Config Retriever', () => {
  const params: IParams = { apiRequestId: '123123' };

  it('should call http with experiments config url', async () => {
    (cacheHttp as jest.Mock).mockReturnValue({ data: {} });

    await retrieveExperimentsConfig(params);

    expect(cacheHttp).toHaveBeenCalledWith(params, config.experimentsConfigUrl);
  });

  it('should return empty config and log error when config fails to load', async () => {
    (cacheHttp as jest.Mock).mockRejectedValue(new Error());

    const configData = await retrieveExperimentsConfig(params);

    expect(configData).toEqual({});
    expect(logger.error).toHaveBeenCalled();
  });
});
