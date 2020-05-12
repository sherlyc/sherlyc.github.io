import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { ITopStoriesV2HandlerInput } from "../../__types__/ITopStoriesV2HandlerInput";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { Strap } from "../../../strap";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { strapName, color }: ITopStoriesV2HandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = getRawArticles(Strap.TopStories, 10, params);
  return [];
}
