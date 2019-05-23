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

  it('should handle errors when provided with empty name and negative lottery number and return 400', () => {
    req.query.name = '';
    req.query.lotteryNumber = -1;

    experimentController(req, res);
    assertIs400Status(res, req);
  });

  it('should handle errors when provided with invalid number and return 400', () => {
    req.query.name = 'afjdjafia';
    req.query.lotteryNumber = -8;

    experimentController(req, res);
    assertIs400Status(res, req);
  });

  it('should respond with variant', () => {
    req.query.name = 'Users';
    req.query.lotteryNumber = 27;

    (getExperimentVariant as jest.Mock).mockReturnValue('A');

    experimentController(req, res);
    expect(res.send).toHaveBeenCalledWith('A');
  });
});

function assertIs400Status(res: Response, req: Request) {
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.send).toHaveBeenCalledWith(`bad experiment data provided,
     name [${req.query.name}], lotteryNumber [${req.query.lotteryNumber}]`);
}
