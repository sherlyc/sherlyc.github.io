import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { ITopStoriesHandlerInput } from "../../__types__/ITopStoriesHandlerInput";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { Strap } from "../../../strap";
import { layoutRetriever } from "../../../adapters/layout/layout-retriever";
import { LayoutType } from "../../../adapters/__types__/LayoutType";
import { ITopStoriesDefaultOneHandlerInput } from "../../__types__/ITopStoriesDefaultOneHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  ITopStoriesGridHandlerInput,
  TopStoriesGridPositions
} from "../../__types__/ITopStoriesGridHandlerInput";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { strapName }: ITopStoriesHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const layout = await layoutRetriever(params);
  const maxRequiredArticles = 11;
  const articles = await getRawArticles(
    Strap.TopStories,
    maxRequiredArticles,
    params
  );
  if (layout === LayoutType.DEFAULT) {
    const topStoriesDefaultOneHandlerInput: ITopStoriesDefaultOneHandlerInput = {
      type: HandlerInputType.TopStoriesDefaultOne,
      strapName,
      articles: articles.splice(0, 2)
    };
    const bigTopLeftContent = await handlerRunner(
      topStoriesDefaultOneHandlerInput,
      params
    );
    const topStoriesGridInput: ITopStoriesGridHandlerInput = {
      type: HandlerInputType.TopStoriesGrid,
      content: {
        [TopStoriesGridPositions.BigTopLeft]: bigTopLeftContent,
        [TopStoriesGridPositions.Right]: [basicAdUnit(strapName)],
        [TopStoriesGridPositions.FirstRow1]: [basicAdUnit(strapName)],
        [TopStoriesGridPositions.FirstRow2]: [basicAdUnit(strapName)],
        [TopStoriesGridPositions.FirstRow3]: [basicAdUnit(strapName)],
        [TopStoriesGridPositions.FirstRow4]: [basicAdUnit(strapName)],
        [TopStoriesGridPositions.SecondRow1]: [basicAdUnit(strapName)],
        [TopStoriesGridPositions.SecondRow2]: [basicAdUnit(strapName)],
        [TopStoriesGridPositions.SecondRow3]: [basicAdUnit(strapName)],
        [TopStoriesGridPositions.SecondRow4]: [basicAdUnit(strapName)]
      }
    };
    return await handlerRunner(topStoriesGridInput, params);
  }

  return [];
}
