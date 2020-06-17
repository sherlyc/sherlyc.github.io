import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IBrightcoveVideo } from "../../../../common/__types__/IBrightcoveVideo";
import { getBrightcovePlaylist } from "../../adapters/brightcove/brightcove";
import logger from "../../utils/logger";
import { IParams } from "../../__types__/IParams";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { IPlayStuffHandlerInput } from "../__types__/IPlayStuffHandlerInput";
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

  it("should return play stuff with videos retrieved and resized images", async () => {
    const videos: IBrightcoveVideo[] = [
      {
        id: "1",
        name: "Video 1",
        description: "Description 1",
        poster:
          "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/6005208634001/096243ac-82b6-4a28-bbce-21caa1932da8/247799ae-9ace-46c4-aa3b-4becf50d2af9/1024x576/match/image.jpg",
        thumbnail:
          "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/6005208634001/096243ac-82b6-4a28-bbce-21caa1932da8/247799ae-9ace-46c4-aa3b-4becf50d2af9/360x180/match/image.jpg"
      },
      {
        id: "2",
        name: "Video 2",
        description: "Description 2",
        poster:
          "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/6005208634001/096243ac-82b6-4a28-bbce-21caa1932da8/247799ae-9ace-46c4-aa3b-4becf50d2af9/960x576/match/image.jpg",
        thumbnail:
          "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/6005208634001/096243ac-82b6-4a28-bbce-21caa1932da8/247799ae-9ace-46c4-aa3b-4becf50d2af9/320x160/match/image.jpg"
      }
    ];
    const expectedVideos: IBrightcoveVideo[] = [
      {
        id: "1",
        name: "Video 1",
        description: "Description 1",
        poster:
          "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/6005208634001/096243ac-82b6-4a28-bbce-21caa1932da8/247799ae-9ace-46c4-aa3b-4becf50d2af9/640x360/match/image.jpg",
        thumbnail:
          "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/6005208634001/096243ac-82b6-4a28-bbce-21caa1932da8/247799ae-9ace-46c4-aa3b-4becf50d2af9/320x180/match/image.jpg"
      },
      {
        id: "2",
        name: "Video 2",
        description: "Description 2",
        poster:
          "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/6005208634001/096243ac-82b6-4a28-bbce-21caa1932da8/247799ae-9ace-46c4-aa3b-4becf50d2af9/640x360/match/image.jpg",
        thumbnail:
          "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/6005208634001/096243ac-82b6-4a28-bbce-21caa1932da8/247799ae-9ace-46c4-aa3b-4becf50d2af9/320x180/match/image.jpg"
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
        videos: expectedVideos
      }
    ]);
  });

  it("should return empty when no videos are returned", async () => {
    const input: IPlayStuffHandlerInput = {
      type: HandlerInputType.PlayStuff,
      total: 8
    };
    (getBrightcovePlaylist as jest.Mock).mockResolvedValue([]);

    const result = await playStuff(handlerRunnerMock, input, params);

    expect(result).toEqual([]);
    expect(logger.error).toHaveBeenCalledWith(
      params.apiRequestId,
      "Insufficient videos retrieved from Brightcove"
    );
  });

  it("should log error and return empty content block when failing to retrieve videos", async () => {
    const input: IPlayStuffHandlerInput = {
      type: HandlerInputType.PlayStuff,
      total: 8
    };
    const error = new Error("Failed to retrieve videos");
    (getBrightcovePlaylist as jest.Mock).mockRejectedValue(error);

    const result = await playStuff(handlerRunnerMock, input, params);

    expect(logger.error).toHaveBeenCalledWith(
      params.apiRequestId,
      expect.any(String),
      error
    );
    expect(result).toEqual([]);
  });
});
