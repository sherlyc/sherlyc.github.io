import { Request } from 'express-serve-static-core';
import { IParams } from './__types__/IParams';
import { CookieNames } from '../../common/__types__/CookieNames';
import * as uuidv4 from 'uuid/v4';

export default (req: Request): IParams => {
  return {
    apiRequestId: uuidv4(),
    ignoreBreakingNews: req.cookies[CookieNames.IGNORE_BREAKING_NEWS]
  };
};
