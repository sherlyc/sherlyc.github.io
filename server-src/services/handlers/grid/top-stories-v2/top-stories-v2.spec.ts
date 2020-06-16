import { ITopStoriesV2HandlerInput } from "../../__types__/ITopStoriesV2HandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { AccentColor } from "../../../../../common/__types__/AccentColor";
import { Strap } from "../../../strap";
import topStoriesV2 from "./top-stories-v2";
import { IParams } from "../../../__types__/IParams";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";

jest.mock("../../../adapters/article-retriever/article-retriever");

describe("Top Stories V2", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const input: ITopStoriesV2HandlerInput = {
    type: HandlerInputType.TopStoriesV2,
    color: AccentColor.CuriousBlue,
    strapName: "topStoriesV2",
    midInsertContent: {
      type: HandlerInputType.ExternalContent,
      url:
        "https://interactives.stuff.co.nz/live/homepage/uber/corona/320-200.html",
      width: "100%",
      height: "43px",
      margin: "0",
    },
    lowerRightContent: {
      type: HandlerInputType.LatestHeadlines,
      sourceId: Strap.LatestNews,
      totalArticles: 7,
      displayName: "latest headlines",
      strapName: `homepageLatestHeadlines`,
      color: "#ff433d",
    },
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve defcon articles and top stories articles", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue([]);
    await topStoriesV2(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledTimes(2);
    expect(getRawArticles).toHaveBeenNthCalledWith(
      1,
      Strap.LatestNews,
      4,
      params
    ); // Replace with correct data source
    expect(getRawArticles).toHaveBeenNthCalledWith(
      2,
      Strap.TopStories,
      10,
      params
    );
  });
});
