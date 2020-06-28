import { IPage } from "../../common/__types__/IPage";
import handlerRunner from "./handlers/runner";
import { HandlerInput } from "./handlers/__types__/HandlerInput";
import { HandlerInputType } from "./handlers/__types__/HandlerInputType";
import { pageV0 } from "./pages/page-v0";
import { pageV1 } from "./pages/page-v1";
import { pageV2 } from "./pages/page-v2";
import logger from "./utils/logger";
import { formatVersion, parseVersion } from "./utils/version";
import { IParams } from "./__types__/IParams";

function getCompatibleComponents(params: IParams): HandlerInput[] {
  const isV1Compatible =
    params.version && parseVersion(params.version) >= parseVersion("1.649");
  const isV2Compatible =
    params.version && parseVersion(params.version) >= parseVersion("1.881");

  if (isV2Compatible) {
    return pageV2();
  } else {
    return isV1Compatible ? pageV1() : pageV0();
  }
}

export default async (params: IParams): Promise<IPage> => {
  const components = getCompatibleComponents(params);
  const currentVersion = process.env.SPADE_VERSION || "SNAPSHOT";

  try {
    return {
      apiRequestId: params.apiRequestId,
      title: "Latest breaking news NZ | Stuff.co.nz | New Zealand",
      version: currentVersion,
      content: await handlerRunner(
        {
          type: HandlerInputType.Page,
          items: [
            {
              type: HandlerInputType.ForceUpdate,
              forceUpdateOnVersionsBefore: formatVersion(
                parseVersion(currentVersion) - parseVersion("0.100")
              )
            },
            ...components
          ]
        },
        params
      )
    };
  } catch (error) {
    logger.error(params.apiRequestId, `Orchestrator level error `, error);
    throw error;
  }
};
