import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { getMostPopular } from "../../../adapters/most-popular/most-popular.service";
import { Strap } from "../../../strap";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  IRelevantStoriesGridHandlerInput,
  RelevantStoriesGridPositions
} from "../../__types__/IRelevantStoriesGridHandlerInput";
import { IRelevantStoriesHandlerInput } from "../../__types__/IRelevantStoriesHandlerInput";
import relevantStories from "./relevant-stories";
import { createRelevantStoriesColumn } from "./relevant-stories-column";

jest.mock("../../../adapters/article-retriever/article-retriever");
jest.mock("../../../adapters/most-popular/most-popular.service");
jest.mock("./relevant-stories-column");

describe("Relevant Stories", () => {
  const handlerRunner = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const totalArticles = 7;
  const input: IRelevantStoriesHandlerInput = {
    type: HandlerInputType.RelevantStories
  };

  const fakeContentBlock = (id: number) => ({ id: `${id}` } as IContentBlock);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should create three relevant stories columns", async () => {
    const articlesPromise = Promise.resolve([]);
    (createRelevantStoriesColumn as jest.Mock).mockResolvedValue([]);
    (getRawArticles as jest.Mock).mockImplementation(() => articlesPromise);
    (getMostPopular as jest.Mock).mockImplementation(() => articlesPromise);

    await relevantStories(handlerRunner, input, params);

    expect(createRelevantStoriesColumn).toHaveBeenCalledTimes(3);
    expect(createRelevantStoriesColumn).toHaveBeenCalledWith(
      articlesPromise,
      "latest news",
      "#E9520E",
      true,
      false,
      handlerRunner,
      params
    );
    expect(createRelevantStoriesColumn).toHaveBeenCalledWith(
      articlesPromise,
      "editors' picks",
      "#E9520E",
      false,
      false,
      handlerRunner,
      params
    );
    expect(createRelevantStoriesColumn).toHaveBeenCalledWith(
      articlesPromise,
      "most popular",
      "#E9520E",
      false,
      true,
      handlerRunner,
      params
    );
  });

  it("should get articles from Latest News, Editors' Picks and Most Popular", async () => {
    (createRelevantStoriesColumn as jest.Mock).mockResolvedValue([]);
    (getRawArticles as jest.Mock).mockResolvedValue([]);
    (getMostPopular as jest.Mock).mockResolvedValue([]);

    await relevantStories(handlerRunner, input, params);

    expect(getRawArticles).toHaveBeenCalledWith(
      Strap.LatestNews,
      totalArticles,
      params
    );
    expect(getRawArticles).toHaveBeenCalledWith(
      Strap.EditorPicks,
      totalArticles,
      params
    );
    expect(getMostPopular).toHaveBeenCalledWith(totalArticles, params);
  });

  it("should pass 3 columns and ad to relevant stories grid", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue([]);
    (getMostPopular as jest.Mock).mockResolvedValue([]);
    const columnOne = [fakeContentBlock(1)];
    const columnTwo = [fakeContentBlock(2)];
    const columnThree = [fakeContentBlock(3)];
    (createRelevantStoriesColumn as jest.Mock).mockResolvedValueOnce(columnOne);
    (createRelevantStoriesColumn as jest.Mock).mockResolvedValueOnce(columnTwo);
    (createRelevantStoriesColumn as jest.Mock).mockResolvedValueOnce(
      columnThree
    );

    await relevantStories(handlerRunner, input, params);

    const expectedGridInput: IRelevantStoriesGridHandlerInput = {
      type: HandlerInputType.RelevantStoriesGrid,
      content: {
        [RelevantStoriesGridPositions.FirstColumn]: columnOne,
        [RelevantStoriesGridPositions.SecondColumn]: columnTwo,
        [RelevantStoriesGridPositions.ThirdColumn]: columnThree,
        [RelevantStoriesGridPositions.Right]: [
          basicAdUnit("homepageEditorsPicks")
        ]
      }
    };
    expect(handlerRunner).toHaveBeenCalledWith(expectedGridInput, params);
  });
});
