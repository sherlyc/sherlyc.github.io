import { getBrightcovePlaylist } from "./brightcove";
import { playStuffConfig } from "../../handlers/play-stuff/play-stuff-config";
import { IParams } from "../../__types__/IParams";
import { retrieveBrightcovePlaylist } from "./brightcove-retriever";
import { mapBrightcovePlaylist } from "./brightcove-mapper";
import { IBrightcovePlaylist } from "../__types__/IBrightcovePlaylist";
import { IBrightcoveVideo } from "../../../../common/__types__/IBrightcoveVideo";

jest.mock("./brightcove-retriever");
jest.mock("./brightcove-mapper");

describe("Brightcove", () => {
  const params: IParams = { apiRequestId: "request-id-for-testing" };

  it("should get brightcove videos for a playlist", async () => {
    const brightcovePlaylist: IBrightcovePlaylist = {
      id: "6041675177001",
      videos: []
    };
    const brightcoveVideos: IBrightcoveVideo[] = [];
    (retrieveBrightcovePlaylist as jest.Mock).mockResolvedValue(
      brightcovePlaylist
    );
    (mapBrightcovePlaylist as jest.Mock).mockReturnValue(brightcoveVideos);

    const { playlist, account, policyKey } = playStuffConfig;
    const total = 9;
    const videos = await getBrightcovePlaylist(
      account,
      playlist,
      policyKey,
      total,
      params
    );

    expect(retrieveBrightcovePlaylist).toHaveBeenCalledWith(
      account,
      playlist,
      policyKey,
      total,
      params
    );
    expect(mapBrightcovePlaylist).toHaveBeenCalledWith(brightcovePlaylist);
    expect(videos).toEqual(brightcoveVideos);
  });
});
