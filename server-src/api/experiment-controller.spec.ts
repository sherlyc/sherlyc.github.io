import { Request, Response } from 'express';
import { experimentController } from './experiment-controller';
import { getExperimentVariant } from '../services/experiment';
jest.mock('../services/experiment');

describe('Experiment controller', () => {
  const req = {
    query: { name: '', lotteryNumber: '' },
    cookies: {}
  } as Request;
  const res = { send: jest.fn(), status: jest.fn(), end: jest.fn() } as any;

  beforeEach(() => {
    res.status.mockReturnValue(res);
  });

  it('should return 400 and message in body when provided with empty name and negative lottery number', () => {
    req.query.name = '';
    req.query.lotteryNumber = -1;

    experimentController(req, res);

    assert400StatusAndMessage(res, req);
  });

  it('should return 400 and message in body when provided with invalid experiment and lottery number', () => {
    req.query.name = 'afjdjafia';
    req.query.lotteryNumber = -8;

    experimentController(req, res);

    assert400StatusAndMessage(res, req);
  });

  it('should return 400 and message in body when provided with valid experiment and empty lottery number', () => {
    req.query.name = 'Users';
    req.query.lotteryNumber = '';

    experimentController(req, res);

    assert400StatusAndMessage(res, req);
  });

  it('should respond with variant', () => {
    req.query.name = 'Users';
    req.query.lotteryNumber = 27;
    const variant = 'Variant A';
    (getExperimentVariant as jest.Mock).mockReturnValue(variant);

    experimentController(req, res);

    expect(res.send).toHaveBeenCalledWith(variant);
  });

  it('should respond with 404 when experiment does not exist', () => {
    req.query.name = 'Experiment A';
    req.query.lotteryNumber = 19;
    (getExperimentVariant as jest.Mock).mockImplementation(() => {
      throw new Error();
    });

    experimentController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith(`Experiment does not exist,
     name [${req.query.name}]`);
  });
});

function assert400StatusAndMessage(res: Response, req: Request) {
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.send).toHaveBeenCalledWith(`Invalid experiment data provided,
     name [${req.query.name}], lotteryNumber [${req.query.lotteryNumber}]`);
}
