import { retrieveBrightcovePlaylist } from "./brightcove-retriever";
import { IParams } from "../../__types__/IParams";
import http from "../../utils/http";
import * as brightcovePlaylist from "./__fixture__/brightcove-playlist.json";

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
