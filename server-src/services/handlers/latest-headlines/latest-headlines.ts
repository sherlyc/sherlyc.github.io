import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { homepageArticleContent } from "../../adapters/article-converter/homepage-article-content.converter";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import { IParams } from "../../__types__/IParams";
import { handlerRunnerFunction } from "../runner";
import { ILatestHeadlinesHandlerInput } from "../__types__/ILatestHeadlinesHandlerInput";

export default async function (
  handlerRunner: handlerRunnerFunction,
  {
    sourceId,
    totalArticles,
    displayName,
    strapName,
    color
  }: ILatestHeadlinesHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(sourceId, totalArticles, params);

  return [
    {
      type: ContentBlockType.VerticalArticleList,
      articles: articles.map(homepageArticleContent),
      displayName,
      color,
      strapName
    }
  ];
}
