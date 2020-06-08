import { retrieveBrightcovePlaylist } from "./brightcove-retriever";
import { IParams } from "../../__types__/IParams";
import { playStuffConfig } from "../../handlers/play-stuff/play-stuff-config";
import http from "../../utils/http";
import * as brightcovePlaylist from "./__fixture__/brightcove-playlist.json";

jest.mock("../../utils/http");

describe("Brightcove retriever", () => {
  const params: IParams = { apiRequestId: "request-id-for-testing" };
  const httpGet: jest.Mock = jest.fn();

  beforeAll(() => {
    (http as jest.Mock).mockReturnValue({
      get: httpGet
    });
  });

  it("should retrieve", async () => {
    const { playlist, account, policyKey } = playStuffConfig;
    httpGet.mockResolvedValue({ data: brightcovePlaylist });
    const list = await retrieveBrightcovePlaylist(
      account,
      playlist,
      policyKey,
      9,
      params
    );
    expect(list).toEqual(brightcovePlaylist);
  });

  it("should throw error when failed to retrieve", async () => {
    const { playlist, account, policyKey } = playStuffConfig;
    const error = new Error("Http Error");
    httpGet.mockRejectedValue(error);
    try {
      await retrieveBrightcovePlaylist(account, playlist, policyKey, 9, params);
    } catch (e) {
      expect(e.message).toEqual(error.message);
    }
  });
});
