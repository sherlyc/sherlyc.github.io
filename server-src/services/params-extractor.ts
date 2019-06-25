import { IParams } from './__types__/IParams';
import * as uuidv4 from 'uuid/v4';
import { Request } from 'express';

export default (req: Request): IParams => {
  return {
    apiRequestId: uuidv4(),
    authorization: req.header('Authorization')
  };
};
