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
  const {
    account,
    playlist,
    policyKey,
    thumbnailSize,
    posterSize
  } = playStuffConfig;

  try {
    const videos = await getBrightcovePlaylist(
      account,
      playlist,
      policyKey,
      total,
      params
    );

    const resizedVideos = videos.map((video) => ({
      ...video,
      thumbnail: resize(video.thumbnail, thumbnailSize),
      poster: resize(video.poster, posterSize)
    }));

    return resizedVideos.length
      ? [
          {
            type: ContentBlockType.PlayStuff,
            videos: resizedVideos
          } as IPlayStuff
        ]
      : [];
  } catch (error) {
    logger.error(params.apiRequestId, `Play Stuff handler error`, error);
    return [];
  }
}

const resize = (imageSrc: string, size: string) =>
  imageSrc.replace(/\/[0-9]+x[0-9]+\//, `/${size}/`);
