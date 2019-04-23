import retry from './retry';
import { IParams } from '../__types__/IParams';

describe('Retry', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  it('should succeed after retrying 3 times when the last one resolved', async () => {
    const input = jest.fn();
    input.mockRejectedValueOnce({ reject: 1 });
    input.mockRejectedValueOnce({ reject: 2 });
    input.mockRejectedValueOnce({ reject: 3 });
    input.mockResolvedValue({ resolve: 4 });

    await expect(
      retry(input, params, { minTimeout: 100, retries: 3 })
    ).resolves.toMatchObject({
      resolve: 4
    });
  });

  it('should fail after retry 3 times when last one is still not resolved', async () => {
    const input = jest.fn();
    input.mockRejectedValueOnce({ reject: 1 });
    input.mockRejectedValueOnce({ reject: 2 });
    input.mockRejectedValueOnce({ reject: 3 });
    input.mockRejectedValueOnce({ reject: 4 });

    await expect(
      retry(input, params, { minTimeout: 100, retries: 3 })
    ).rejects.toMatchObject({
      reject: 4
    });
  });
});
