import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IRelevantStoriesHandlerInput } from "../../__types__/IRelevantStoriesHandlerInput";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { Strap } from "../../../strap";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { getMostPopular } from "../../../adapters/most-popular/most-popular.service";
import {
  IRelevantStoriesGridHandlerInput,
  RelevantStoriesGridPositions
} from "../../__types__/IRelevantStoriesGridHandlerInput";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { createRelevantStoriesColumn } from "./relevant-stories-column";

export default async function(
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
      handlerRunner,
      params
    ),
    createRelevantStoriesColumn(
      getRawArticles(Strap.EditorPicks, totalArticles, params),
      "editors' picks",
      "#E9520E",
      handlerRunner,
      params
    ),
    createRelevantStoriesColumn(
      getMostPopular(totalArticles, params),
      "most popular",
      "#E9520E",
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
        {
          type: ContentBlockType.StickyContainer,
          items: [basicAdUnit("homepageEditorsPicks")]
        }
      ]
    }
  };

  return await handlerRunner(relevantStoriesGrid, params);
}
