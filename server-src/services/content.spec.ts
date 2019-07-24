import { getContent } from './content';
import { Request } from 'express';
import { IParams } from './__types__/IParams';
import * as orchestrate from './orchestrator';

describe('Content Controller', () => {
  it('should send 500 status when orchestrator throws error', async () => {
    const req = {} as Request;
    const res = { json: jest.fn(), sendStatus: jest.fn() } as any;
    const params = {} as IParams;
    jest.spyOn(orchestrate, 'default').mockRejectedValue(new Error());

    await getContent(req, res, params);

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });

  it('should return result and end request when orchestrator successfully returns', async () => {
    const req = {} as Request;
    const res = { json: jest.fn(), end: jest.fn() } as any;
    const params = {} as IParams;

    const result = { apiRequestId: '123', title: 'Title', content: [] };
    jest.spyOn(orchestrate, 'default').mockResolvedValue(result);

    await getContent(req, res, params);

    expect(res.json).toHaveBeenCalledWith(result);
    expect(res.end).toHaveBeenCalled();
  });
});
