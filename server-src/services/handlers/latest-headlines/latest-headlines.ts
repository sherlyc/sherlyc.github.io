import { handlerRunnerFunction } from "../runner";
import { IParams } from "../../__types__/IParams";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { ILatestHeadlinesHandlerInput } from "../__types__/ILatestHeadlinesHandlerInput";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { homepageArticleContent } from "../../adapters/article-converter/homepage-article-content.converter";

export default async function(
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
