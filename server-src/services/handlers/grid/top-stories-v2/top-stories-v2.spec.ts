import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { ITopStoriesV2HandlerInput } from "../../__types__/ITopStoriesV2HandlerInput";
import { Strap } from "../../../strap";
import topStoriesV2 from "./top-stories-v2";

jest.mock("../../../adapters/article-retriever/article-retriever");

describe("Top Stories V2", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const strapName = "Top Stories V2";
  const color = "blue";

  const handlerInput: ITopStoriesV2HandlerInput = {
    type: HandlerInputType.TopStoriesV2,
    strapName,
    color
  };

  it("should retrieve articles", async () => {
    await topStoriesV2(handlerRunnerMock, handlerInput, params);

    expect(getRawArticles).toHaveBeenCalledWith(Strap.TopStories, 10, params);
  });
});
