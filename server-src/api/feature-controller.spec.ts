import { featureController } from './feature-controller';
import { isFeatureEnabled } from '../services/feature';
import { Request } from 'express';

jest.mock('../services/feature');

describe('Feature Controller', () => {
  it('should return value from feature service', async () => {
    const req = {
      spadeParams: { apiRequestId: '33498' },
      params: {
        featureName: 'someFeature',
        lotteryNumber: 1,
        deviceType: 'mobile'
      },
      cookies: {}
    } as Request;
    const res = { send: jest.fn() } as any;

    (isFeatureEnabled as jest.Mock).mockReturnValue(false);

    await featureController(req, res);

    expect(res.send).toHaveBeenCalledWith(false);
  });

  it('should return 400 and message in body when provided with negative lottery number', async () => {
    const req = {
      spadeParams: { apiRequestId: '33498' },
      params: { featureName: '', lotteryNumber: '-1', deviceType: 'mobile' },
      cookies: {}
    } as Request;
    const res = { send: jest.fn(), status: jest.fn() } as any;
    res.status.mockReturnValue(res);

    await featureController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(`Invalid feature data provided,
     featureName [], lotteryNumber [-1], deviceType [mobile]`);
  });

  it('should return 400 and message in body when provided with invalid lottery number', async () => {
    const req = {
      spadeParams: { apiRequestId: '33498' },
      params: {
        featureName: '',
        lotteryNumber: 'abcd',
        deviceType: 'mobile'
      },
      cookies: {}
    } as Request;
    const res = { send: jest.fn(), status: jest.fn() } as any;
    res.status.mockReturnValue(res);

    await featureController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(`Invalid feature data provided,
     featureName [], lotteryNumber [abcd], deviceType [mobile]`);
  });

  it('should return 400 and message in body when provided with invalid device', async () => {
    const req = {
      spadeParams: { apiRequestId: '33498' },
      params: { featureName: '', lotteryNumber: '1', deviceType: 'blahblah' },
      cookies: {}
    } as Request;
    const res = { send: jest.fn(), status: jest.fn() } as any;
    res.status.mockReturnValue(res);

    await featureController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(`Invalid feature data provided,
     featureName [], lotteryNumber [1], deviceType [blahblah]`);
  });
});
