import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { parseVersion } from "../../utils/version";
import { IParams } from "../../__types__/IParams";
import { handlerRunnerFunction } from "../runner";
import { IVersionSwitcherHandlerInput } from "../__types__/IVersionSwitcherHandlerInput";

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
