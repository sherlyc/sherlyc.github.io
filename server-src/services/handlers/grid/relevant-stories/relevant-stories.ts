import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { getMostPopular } from "../../../adapters/most-popular/most-popular.service";
import { Strap } from "../../../strap";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  IRelevantStoriesGridHandlerInput,
  RelevantStoriesGridPositions
} from "../../__types__/IRelevantStoriesGridHandlerInput";
import { IRelevantStoriesHandlerInput } from "../../__types__/IRelevantStoriesHandlerInput";
import { createRelevantStoriesColumn } from "./relevant-stories-column";

export default async function (
  handlerRunner: handlerRunnerFunction,
  {}: IRelevantStoriesHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const totalArticles = 7;

  const [
    firstColumnContent,
    secondColumnContent,
    thirdColumnContent
  ] = await Promise.all([
    createRelevantStoriesColumn(
      getRawArticles(Strap.LatestNews, totalArticles, params),
      "latest news",
      "#E9520E",
      true,
      false,
      handlerRunner,
      params
    ),
    createRelevantStoriesColumn(
      getRawArticles(Strap.EditorPicks, totalArticles, params),
      "editors' picks",
      "#E9520E",
      false,
      false,
      handlerRunner,
      params
    ),
    createRelevantStoriesColumn(
      getMostPopular(totalArticles, params),
      "most popular",
      "#E9520E",
      false,
      true,
      handlerRunner,
      params
    )
  ]);

  const relevantStoriesGrid: IRelevantStoriesGridHandlerInput = {
    type: HandlerInputType.RelevantStoriesGrid,
    content: {
      [RelevantStoriesGridPositions.FirstColumn]: firstColumnContent,
      [RelevantStoriesGridPositions.SecondColumn]: secondColumnContent,
      [RelevantStoriesGridPositions.ThirdColumn]: thirdColumnContent,
      [RelevantStoriesGridPositions.Right]: [
        basicAdUnit("homepageEditorsPicks")
      ]
    }
  };

  return await handlerRunner(relevantStoriesGrid, params);
}
