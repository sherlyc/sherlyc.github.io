import * as brightcovePlaylist from "./__fixture__/brightcove-playlist.json";
import * as brightcoveVideos from "./__fixture__/brightcove-videos.json";
import { getBrightcovePlaylist } from "./brightcove";
import { playStuffConfig } from "../../handlers/play-stuff/play-stuff-config";
import { IParams } from "../../__types__/IParams";
import { retrieveBrightcovePlaylist } from "./brightcove-retriever";
import { mapBrightcovePlaylist } from "./brightcove-mapper";

jest.mock("./brightcove-retriever");
jest.mock("./brightcove-mapper");

describe("Brightcove", () => {
  const params: IParams = { apiRequestId: "request-id-for-testing" };

  it("should get brightcove videos for a playlist", async () => {
    const { playlist, account, policyKey } = playStuffConfig;
    const total = 9;
    (retrieveBrightcovePlaylist as jest.Mock).mockResolvedValue(
      brightcovePlaylist
    );
    (mapBrightcovePlaylist as jest.Mock).mockReturnValue(brightcoveVideos);

    const videos = await getBrightcovePlaylist(
      account,
      playlist,
      policyKey,
      total,
      params
    );

    expect(videos).toEqual(brightcoveVideos);
    expect(retrieveBrightcovePlaylist).toHaveBeenCalledWith(
      account,
      playlist,
      policyKey,
      total,
      params
    );
    expect(mapBrightcovePlaylist).toHaveBeenCalledWith(brightcovePlaylist);
  });
});
