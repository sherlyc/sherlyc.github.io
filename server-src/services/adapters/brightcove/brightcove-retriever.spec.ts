import cacheHttp from "../../utils/cache-http";
import { IParams } from "../../__types__/IParams";
import { IBrightcovePlaylist } from "../__types__/IBrightcovePlaylist";
import { retrieveBrightcovePlaylist } from "./brightcove-retriever";

jest.mock("../../utils/cache-http");

describe("Brightcove retriever", () => {
  const params: IParams = { apiRequestId: "request-id-for-testing" };

  const playlist = "playlist-id";
  const account = "brightcove-account";
  const policyKey = "brightcove-policy-key";
  const total = 9;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve", async () => {
    const brightcovePlaylist: IBrightcovePlaylist = {
      updated_at: "2020-06-07T05:09:57.705Z",
      type: "EXPLICIT",
      reference_id: null,
      name: "Widget 1 (Web Version)",
      id: "6041675177001",
      description: null,
      created_at: "2019-05-28T00:17:24.969Z",
      account_id: "6005208634001",
      videos: []
    };
    (cacheHttp as jest.Mock).mockResolvedValue({ data: brightcovePlaylist });

    const list = await retrieveBrightcovePlaylist(
      account,
      playlist,
      policyKey,
      total,
      params
    );
    expect(list).toEqual(brightcovePlaylist);
    expect(cacheHttp).toHaveBeenCalledWith(
      params,
      `https://edge.api.brightcove.com/playback/v1/accounts/${account}/playlists/${playlist}?limit=${total}`,
      expect.objectContaining({
        headers: {
          Authorization: `BCOV-Policy ${policyKey}`,
          "X-Forwards-For": expect.stringContaining("119.15.65.")
        }
      })
    );
  });

  it("should throw error when failed to retrieve", async () => {
    const error = new Error("Http Error");
    (cacheHttp as jest.Mock).mockRejectedValue(error);
    try {
      await retrieveBrightcovePlaylist(account, playlist, policyKey, 9, params);
    } catch (e) {
      expect(e.message).toEqual(error.message);
    }
  });
});
