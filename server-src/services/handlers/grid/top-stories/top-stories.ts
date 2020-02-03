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

export default async function(
  handlerRunner: handlerRunnerFunction,
  { strapName }: ITopStoriesHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const layout = await layoutRetriever(params);
  const articles = await getRawArticles(Strap.TopStories, 11, params);
  if (layout === LayoutType.DEFAULT) {
    const topStoriesDefaultOneHandlerInput: ITopStoriesDefaultOneHandlerInput = {
      type: HandlerInputType.TopStoriesDefaultOne,
      strapName,
      articles: articles.slice(0, 2)
    };
    return handlerRunner(topStoriesDefaultOneHandlerInput, params);
  }
  return [];
}
