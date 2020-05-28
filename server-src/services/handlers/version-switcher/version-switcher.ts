import { handlerRunnerFunction } from "../runner";
import { IParams } from "../../__types__/IParams";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IVersionSwitcherHandlerInput } from "../__types__/IVersionSwitcherHandlerInput";
import { parseVersion } from "../../utils/version";

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    compatibleVersion,
    compatibleHandler,
    fallbackHandler
  }: IVersionSwitcherHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const feVersionIsCompatible =
    params.version &&
    parseVersion(params.version) >= parseVersion(compatibleVersion);
  return feVersionIsCompatible
    ? handlerRunner(compatibleHandler, params)
    : handlerRunner(fallbackHandler, params);
}
