import { retrieveBrightcovePlaylist } from "./brightcove-retriever";
import { IParams } from "../../__types__/IParams";

describe("Brightcove retriever", () => {
  const params: IParams = { apiRequestId: "request-id-for-testing" };
  it("should retrieve", async () => {
    const playStuffConfig = {
      account: "6005208634001",
      playlist: "6041675177001",
      policyKey:
        "BCpkADawqM3XbgNT2rxILaX_0Gmok75p2ZBntZDaN-bQXO7Qatbxuf0ECXO0Xjf-Z4muB0XoFYvXKDHe6zeoTpxsPxi6PrDo9vdWqYpUPArEXZ4YqCW8NI4-UdcAChh-2Hr9nhYI9vf-9X0a"
    };
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
