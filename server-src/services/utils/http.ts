import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';
import { performance } from 'perf_hooks';
import config from './config';
import logger from './logger';

const httpClient: AxiosInstance = axios.create();

httpClient.defaults.timeout = config.requestTimeout;
httpClient.defaults.validateStatus = (status: number) => {
  return status >= 200 && status < 400;
};
httpClient.interceptors.request.use((request: AxiosRequestConfig & any) => {
  request.ts = performance.now();
  return request;
});
httpClient.interceptors.response.use(
  (response: AxiosResponse & { config: any }) => {
    const elapsedTime = Number(performance.now() - response.config.ts);
    logger.debug(
      `${response.config.method!.toUpperCase()} ${response.config.url} ==> ${
        response.status
      } in ${elapsedTime.toFixed(2)}ms`
    );
    return response;
  },
  (error: AxiosError) => {
    logger.warn(
      `${error.config.method!.toUpperCase()} ${
        error.config.url
      } ==> Failed with error: ${error.message}`
    );
    return Promise.reject(error);
  }
);

export default httpClient;
