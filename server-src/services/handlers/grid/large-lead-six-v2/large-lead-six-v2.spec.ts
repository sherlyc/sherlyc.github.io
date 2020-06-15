import { IParams } from "../../../__types__/IParams";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { ILargeLeadSixV2HandlerInput } from "../../__types__/ILargeLeadSixV2HandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { AccentColor } from "../../../../../common/__types__/AccentColor";
import { Strap } from "../../../strap";
import largeLeadSixV2 from "./large-lead-six-v2";

jest.mock("../../../adapters/article-retriever/article-retriever");

describe("Large Lead Six V2", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve articles", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue([]);
    const input: ILargeLeadSixV2HandlerInput = {
      type: HandlerInputType.LargeLeadSixV2,
      displayName: "climate change",
      color: AccentColor.AppleGreen,
      linkUrl: "/games",
      strapName: "strapName",
      sourceId: Strap.ClimateChange,
    };

    await largeLeadSixV2(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledWith(input.sourceId, 6, params);
  });
});
