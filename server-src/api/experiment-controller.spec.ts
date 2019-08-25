import { Request, Response } from 'express';
import { experimentController } from './experiment-controller';
import { getExperimentVariant } from '../services/experiment';
import { Experiments } from '../../common/Experiments';

jest.mock('../services/experiment');

describe('Experiment controller', () => {
  const req = {
    spadeParams: { apiRequestId: '33498' },
    params: { experimentName: '', lotteryNumber: 1 },
    cookies: {}
  } as Request;
  const res = { send: jest.fn(), status: jest.fn(), end: jest.fn() } as any;

  beforeEach(() => {
    res.status.mockReturnValue(res);
  });

  it('should return 400 and message in body when provided with empty name and negative lottery number', () => {
    req.params.experimentName = '';
    req.params.lotteryNumber = -1;

    experimentController(req, res);

    assert400StatusAndMessage(res, req);
  });

  it('should return 400 and message in body when provided with invalid experiment and lottery number', () => {
    req.params.experimentName = 'afjdjafia';
    req.params.lotteryNumber = -8;

    experimentController(req, res);

    assert400StatusAndMessage(res, req);
  });

  it('should return 400 and message in body when provided with valid experiment and empty lottery number', () => {
    req.params.experimentName = Experiments.Users;
    req.params.lotteryNumber = '';

    experimentController(req, res);

    assert400StatusAndMessage(res, req);
  });

  it('should respond with variant', () => {
    req.params.experimentName = Experiments.Users;
    req.params.lotteryNumber = 27;
    const variant = 'Variant A';
    (getExperimentVariant as jest.Mock).mockReturnValue(variant);

    experimentController(req, res);

    expect(res.send).toHaveBeenCalledWith(variant);
  });

  it('should respond with control variant when experiment does not exist', () => {
    req.params.experimentName = 'Random';
    req.params.lotteryNumber = 27;
    const variant = 'control';
    (getExperimentVariant as jest.Mock).mockReturnValue(variant);

    experimentController(req, res);

    expect(res.send).toHaveBeenCalledWith(variant);
  });
});

function assert400StatusAndMessage(res: Response, req: Request) {
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.send).toHaveBeenCalledWith(`Invalid experiment data provided,
     name [${req.params.experimentName}], lotteryNumber [${req.params.lotteryNumber}]`);
}
