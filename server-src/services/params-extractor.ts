import { IParams } from "./__types__/IParams";
import { v4 } from "uuid";
import { Request } from "express";

export default (req: Request): IParams => {
  return {
    apiRequestId: v4(),
    authorization: req.header("Authorization"),
  };
};
