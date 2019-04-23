import { Request } from 'express-serve-static-core';
import { IParams } from './__types__/IParams';
import { CookieNames } from '../../common/__types__/CookieNames';

export default (req: Request & any): IParams => {
  return {
    apiRequestId: req.apiRequestId,
    ignoreBreakingNews: req.cookies[CookieNames.IGNORE_BREAKING_NEWS]
  };
};
