import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { parseVersion } from "../../utils/version";
import { IParams } from "../../__types__/IParams";
import { handlerRunnerFunction } from "../runner";
import { IForceUpdateHandlerInput } from "../__types__/IForceUpdateHandlerInput";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { forceUpdateOnVersionsBefore }: IForceUpdateHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  if (
    !params.version ||
    parseVersion(params.version) <= parseVersion(forceUpdateOnVersionsBefore)
  ) {
    return [
      {
        type: ContentBlockType.ExternalContentUnit,
        url: `/spade/assets/pwa/uninstall_pwa.html?fe=${params.version}&be=${process.env.SPADE_VERSION}`,
        width: "100%",
        height: "0",
        margin: "0",
        scrollable: false
      }
    ];
  } else {
    return [];
  }
}
