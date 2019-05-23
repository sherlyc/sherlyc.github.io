import { Request, Response } from 'express';

export const experimentController = function(req: Request, res: Response){
  const { name, lotteryNumber } = req.query;
  if(!name && !lotteryNumber || lotteryNumber > 100 || lotteryNumber < 0 ) {
    res.sendStatus(400)
  }
}
