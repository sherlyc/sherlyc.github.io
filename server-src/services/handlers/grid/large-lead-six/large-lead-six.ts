import { handlerRunnerFunction } from "../../runner";
import { ISixImageHandlerInput } from "../../__types__/ISixImageHandlerInput";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { sourceId, strapName, displayName, displayNameColor }: ISixImageHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(sourceId, 6, params);
  return [];
}
