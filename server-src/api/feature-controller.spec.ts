import { featureController } from './feature-controller';
import { Request } from 'express';

describe('Feature Controller', () => {
  it('should return false', () => {
    const req = {
      spadeParams: { apiRequestId: '33498' },
      params: { featureName: '', lotteryNumber: 1 },
      cookies: {}
    } as Request;
    const res = { send: jest.fn() } as any;

    featureController(req, res);

    expect(res.send).toHaveBeenCalledWith(false);
  });

  it('should return 400 and message in body when provided with negative lottery number', () => {
    const req = {
      spadeParams: { apiRequestId: '33498' },
      params: { featureName: '', lotteryNumber: -1 },
      cookies: {}
    } as Request;
    const res = { send: jest.fn(), status: jest.fn() } as any;
    res.status.mockReturnValue(res);

    featureController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(`Invalid feature data provided,
     featureName [], lotteryNumber [-1]`);
  });
});
