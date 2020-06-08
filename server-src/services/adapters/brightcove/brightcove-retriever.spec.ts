import { retrieveBrightcovePlaylist } from "./brightcove-retriever";
import { IParams } from "../../__types__/IParams";
import { playStuffConfig } from "../../handlers/play-stuff/play-stuff-config";

describe("Brightcove retriever", () => {
  const params: IParams = { apiRequestId: "request-id-for-testing" };
  it("should retrieve", async () => {
    const { playlist, account, policyKey } = playStuffConfig;
    const list = await retrieveBrightcovePlaylist(
      account,
      playlist,
      policyKey,
      9,
      params
    );
    console.log(list);
  });
});
