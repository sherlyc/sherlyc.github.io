import { HandlerInputType } from "../__types__/HandlerInputType";
import { IParams } from "../../__types__/IParams";
import { isFeatureEnabled } from "../../adapters/feature/feature";
import { FeatureName } from "../../../../common/FeatureName";
import { DeviceType } from "../../../../common/DeviceType";
import wrappedLogger from "../../utils/logger";

export const gridBlockErrorHandler = async (
  contentConverterCallback: Function,
  handlerName: HandlerInputType,
  positionInModule: string,
  params: IParams
) => {
  try {
    return await contentConverterCallback();
  } catch (error) {
    const isFeatureRolledOut = await isFeatureEnabled(
      FeatureName.ModuleLayout,
      1,
      DeviceType.unknown
    );
    const message = `${handlerName} - Potentially insufficient articles for position ${positionInModule}`;

    if (isFeatureRolledOut) {
      wrappedLogger.error(params.apiRequestId, message, error);
      throw new Error(message);
    } else {
      wrappedLogger.info(params.apiRequestId, message, error);
      return [];
    }
  }
};
