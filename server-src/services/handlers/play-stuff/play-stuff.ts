import { handlerRunnerFunction } from "../runner";
import { IParams } from "../../__types__/IParams";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IPlayStuffHandlerInput } from "../__types__/IPlayStuffHandlerInput";
import { IPlayStuff } from "../../../../common/__types__/IPlayStuff";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { getBrightcovePlaylist } from "../../adapters/brightcove/brightcove";
import logger from "../../utils/logger";

const playStuffConfig = {
  account: "6005208634001",
  playlist: "6041675177001",
  policyKey:
    "BCpkADawqM3XbgNT2rxILaX_0Gmok75p2ZBntZDaN-bQXO7Qatbxuf0ECXO0Xjf-Z4muB0XoFYvXKDHe6zeoTpxsPxi6PrDo9vdWqYpUPArEXZ4YqCW8NI4-UdcAChh-2Hr9nhYI9vf-9X0a"
};

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
