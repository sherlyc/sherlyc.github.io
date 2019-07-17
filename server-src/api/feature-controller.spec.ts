import { featureController } from './feature-controller';
import { Request } from 'express';
import { experimentController } from './experiment-controller';

describe('Feature Controller', () => {
  const params = { apiRequestId: '33498' };

  it('should return false', () => {
    const req = {
      params: { featureName: '', lotteryNumber: 1 },
      cookies: {}
    } as Request;
    const res = { send: jest.fn() } as any;

    featureController(req, res, params);

    expect(res.send).toHaveBeenCalledWith(false);
  });

  it('should return 400 and message in body when provided with negative lottery number', () => {
    const req = {
      params: { featureName: '', lotteryNumber: -1 },
      cookies: {}
    } as Request;
    const res = { send: jest.fn(), status: jest.fn() } as any;
    res.status.mockReturnValue(res);

    featureController(req, res, params);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(`Invalid feature data provided,
     featureName [], lotteryNumber [-1]`);
  });
});
