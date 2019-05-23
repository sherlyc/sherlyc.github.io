import {Request, Response} from "express";
import {experimentController} from "../api/experiment";

describe('Experiment controller', () => {
  const req = { query: { name: '', lotteryNumber: ''}, cookies: {} } as Request;
  const res = { sendStatus: jest.fn(), end: jest.fn()} as any;

  it('should handle errors when provided with bad data', () => {
    req.query.name = '';
    req.query.lotteryNumber = -1;

    expect(() => {
      experimentController(req, res);
    }).toThrowError(
      `bad experiment data provided, name[${req.query.name}], lotteryNumber[${req.query.lotteryNumber}]`
    );

    req.query.name = 'afjdjafia';
    req.query.lotteryNumber = 8;

    expect(() => {
      experimentController(req, res);
    }).toThrowError(
      `bad experiment data provided, name[${req.query.name}], lotteryNumber[${req.query.lotteryNumber}]`
    );

    req.query.name = 'backgroundColor';
    req.query.lotteryNumber = -8;

    expect(() => {
      experimentController(req, res)
    }).toThrowError(
      `bad experiment data provided, name[${req.query.name}], lotteryNumber[${req.query.lotteryNumber}]`
    );
  });
})
