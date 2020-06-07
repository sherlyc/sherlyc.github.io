import { handlerRunnerFunction } from "../runner";
import { IParams } from "../../__types__/IParams";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IPlayStuffHandlerInput } from "../__types__/IPlayStuffHandlerInput";
import { IPlayStuff } from "../../../../common/__types__/IPlayStuff";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { getBrightcovePlaylist } from "../../adapters/brightcove/brightcove";
import logger from "../../utils/logger";
import { playStuffConfig } from "./play-stuff-config";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { total }: IPlayStuffHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const { account, playlist, policyKey } = playStuffConfig;

  try {
    const videos = await getBrightcovePlaylist(
      account,
      playlist,
      policyKey,
      total,
      params
    );

    return [
      {
        type: ContentBlockType.PlayStuff,
        videos
      } as IPlayStuff
    ];
  } catch (error) {
    logger.error(params.apiRequestId, `Play Stuff handler error`, error);
    return [];
  }
}
