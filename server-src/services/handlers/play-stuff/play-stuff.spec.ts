import { IParams } from "../../__types__/IParams";
import { IPlayStuffHandlerInput } from "../__types__/IPlayStuffHandlerInput";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { getBrightcovePlaylist } from "../../adapters/brightcove/brightcove";

import playStuff from "./play-stuff";

jest.mock("../../adapters/brightcove/brightcove");

describe("Play Stuff", () => {
  const params: IParams = { apiRequestId: "123" };
  const handlerRunnerMock = jest.fn();
  const playStuffConfig = {
    account: "6005208634001",
    playlist: "6041675177001",
    policyKey:
      "BCpkADawqM3XbgNT2rxILaX_0Gmok75p2ZBntZDaN-bQXO7Qatbxuf0ECXO0Xjf-Z4muB0XoFYvXKDHe6zeoTpxsPxi6PrDo9vdWqYpUPArEXZ4YqCW8NI4-UdcAChh-2Hr9nhYI9vf-9X0a"
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve Brightcove video playlist", async () => {
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
});
