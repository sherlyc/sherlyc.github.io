import http from "../../utils/http";
import { IParams } from "../../__types__/IParams";
import { IBrightcovePlaylist } from "../__types__/IBrightcovePlaylist";
import { retrieveBrightcovePlaylist } from "./brightcove-retriever";

jest.mock("../../utils/http");

describe("Brightcove retriever", () => {
  const params: IParams = { apiRequestId: "request-id-for-testing" };
  const httpGet: jest.Mock = jest.fn();

  const playlist = "playlist-id";
  const account = "brightcove-account";
  const policyKey = "brightcove-policy-key";
  const total = 9;

  beforeAll(() => {
    (http as jest.Mock).mockReturnValue({
      get: httpGet
    });
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
    httpGet.mockResolvedValue({ data: brightcovePlaylist });

    const list = await retrieveBrightcovePlaylist(
      account,
      playlist,
      policyKey,
      total,
      params
    );
    expect(list).toEqual(brightcovePlaylist);
    expect(httpGet).toHaveBeenCalledWith(
      `https://edge.api.brightcove.com/playback/v1/accounts/${account}/playlists/${playlist}?limit=${total}`,
      {
        headers: {
          Authorization: `BCOV-Policy ${policyKey}`
        }
      }
    );
  });

  it("should throw error when failed to retrieve", async () => {
    const error = new Error("Http Error");
    httpGet.mockRejectedValue(error);
    try {
      await retrieveBrightcovePlaylist(account, playlist, policyKey, 9, params);
    } catch (e) {
      expect(e.message).toEqual(error.message);
    }
  });
});
