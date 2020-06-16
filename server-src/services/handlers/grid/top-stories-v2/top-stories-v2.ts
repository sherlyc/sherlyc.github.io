import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { ITopStoriesV2HandlerInput } from "../../__types__/ITopStoriesV2HandlerInput";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { Strap } from "../../../strap";

export default async function (
  handlerRunner: handlerRunnerFunction,
  {
    strapName,
    color,
    midInsertContent,
    lowerRightContent,
  }: ITopStoriesV2HandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const defconArticles = await getRawArticles(Strap.LatestNews, 4, params); // Replace with correct data source
  const topStories = await getRawArticles(Strap.TopStories, 10, params);
  return [];
}
