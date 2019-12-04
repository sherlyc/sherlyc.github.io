import recommendations from "./recommendations";
import { IRecommendationsHandlerInput } from "../__types__/IRecommendationsHandlerInput";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { IParams } from "../../__types__/IParams";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";

describe("Recommendations", () => {
  const handlerRunner = jest.fn();
  const params: IParams = { apiRequestId: "123123" };

  it("should return recommendations content block", async () => {
    const handlerInput: IRecommendationsHandlerInput = {
      type: HandlerInputType.Recommendations,
      displayName: "Recommended for You",
      displayNameColor: "darkblue",
      totalBasicArticlesUnit: 2,
      totalBasicArticleTitleUnit: 3
    };

    const result = await recommendations(handlerRunner, handlerInput, params);

    expect(result).toEqual([
      {
        type: ContentBlockType.Recommendations,
        displayName: handlerInput.displayName,
        displayNameColor: handlerInput.displayNameColor,
        totalBasicArticlesUnit: handlerInput.totalBasicArticlesUnit,
        totalBasicArticleTitleUnit: handlerInput.totalBasicArticleTitleUnit
      }
    ]);
  });
});
