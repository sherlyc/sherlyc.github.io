import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { handlerRunnerFunction } from "../runner";
import { IParams } from "../../__types__/IParams";
import { IForceUpdateHandlerInput } from "../__types__/IForceUpdateHandlerInput";
import { parseVersion } from "../../utils/version";

export default async function(
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
        url: "/spade/assets/pwa/uninstall_pwa.html",
        mobile: {
          height: "0",
          width: "100%",
          margin: "0",
          scrollable: false
        }
      }
    ];
  } else {
    return [];
  }
}
