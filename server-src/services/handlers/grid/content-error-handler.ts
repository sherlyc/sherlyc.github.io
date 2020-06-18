import { Strap } from "../../strap";
import wrappedLogger from "../../utils/logger";
import { IParams } from "../../__types__/IParams";
import { HandlerInputType } from "../__types__/HandlerInputType";

export const contentErrorHandler = (
  contentConverterCallback: Function,
  handlerName: HandlerInputType,
  sourceName: Strap,
  params: IParams
) => {
  try {
    return contentConverterCallback();
  } catch (error) {
    const message = `${handlerName} - Potentially insufficient articles for source ${sourceName}`;
    wrappedLogger.error(params.apiRequestId, message, error);
  }
};
