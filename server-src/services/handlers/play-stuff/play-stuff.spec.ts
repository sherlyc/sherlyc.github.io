import { IParams } from "../../__types__/IParams";
import { IPlayStuffHandlerInput } from "../__types__/IPlayStuffHandlerInput";
import { IBrightcoveVideo } from "../../../../common/__types__/IBrightcoveVideo";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { getBrightcovePlaylist } from "../../adapters/brightcove/brightcove";
import logger from "../../utils/logger";
import playStuff from "./play-stuff";
import { playStuffConfig } from "./play-stuff-config";

jest.mock("../../adapters/brightcove/brightcove");
jest.mock("../../utils/logger");

describe("Play Stuff", () => {
  const params: IParams = { apiRequestId: "123" };
  const handlerRunnerMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve Brightcove videos with correct config", async () => {
    const input: IPlayStuffHandlerInput = {
      type: HandlerInputType.PlayStuff,
      total: 8
    };

    await playStuff(handlerRunnerMock, input, params);

    expect(getBrightcovePlaylist).toHaveBeenCalledWith(
      playStuffConfig.account,
      playStuffConfig.playlist,
      playStuffConfig.policyKey,
      input.total,
      params
    );
  });

  it("should return play stuff with videos retrieved", async () => {
    const videos: IBrightcoveVideo[] = [
      {
        id: "1",
        name: "Video 1",
        description: "Description 1",
        thumbnail: "Thumbnail 1",
        updatedAt: "Updated 1"
      },
      {
        id: "2",
        name: "Video 2",
        description: "Description 2",
        thumbnail: "Thumbnail 2",
        updatedAt: "Updated 2"
      }
    ];
    (getBrightcovePlaylist as jest.Mock).mockResolvedValue(videos);

    const input: IPlayStuffHandlerInput = {
      type: HandlerInputType.PlayStuff,
      total: 2
    };
    const result = await playStuff(handlerRunnerMock, input, params);

    expect(result).toEqual([
      {
        type: ContentBlockType.PlayStuff,
        videos
      }
    ]);
  });

  it("should log error and return empty content block when failing to retrieve videos", async () => {
    const input: IPlayStuffHandlerInput = {
      type: HandlerInputType.PlayStuff,
      total: 8
    };
    const error = new Error("Failed to retrieve videos");
    (getBrightcovePlaylist as jest.Mock).mockRejectedValue(error);

    const result = await playStuff(handlerRunnerMock, input, params);

    expect(logger.error).toHaveBeenCalledWith(params.apiRequestId, expect.any(String), error);
    expect(result).toEqual([]);
  });
});
