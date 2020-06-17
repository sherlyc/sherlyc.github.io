import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { ImageLayoutType } from "../../../../../common/__types__/ImageLayoutType";
import { bigImageArticleUnit } from "../../../adapters/article-converter/big-image-article.converter";
import { featuredArticle } from "../../../adapters/article-converter/featured-article.converter";
import { halfWidthImageArticleUnit } from "../../../adapters/article-converter/half-width-image-article-unit.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { StripsGridPositions } from "../../__types__/IStripsGridHandlerInput";
import { IStripsHandlerInput } from "../../__types__/IStripsHandlerInput";
import { contentErrorHandler } from "../content-error-handler";

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    displayName,
    color,
    linkUrl,
    sourceId,
    strapName,
    articleCount,
    articleFormat
  }: IStripsHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(sourceId, articleCount, params);

  const articleFormatDelegate = {
    [ContentBlockType.BigImageArticleUnit]: (article: IRawArticle) => () =>
      bigImageArticleUnit(
        article,
        strapName,
        ImageLayoutType.module,
        false,
        color
      ),
    [ContentBlockType.FeaturedArticle]: (article: IRawArticle) => () =>
      featuredArticle(article, strapName, "white", "black", false),
    [ContentBlockType.HalfWidthImageArticleUnit]: (
      article: IRawArticle
    ) => () => halfWidthImageArticleUnit(article, strapName, color)
  };

  const content: { [key in StripsGridPositions]: IContentBlock[] } = {
    [StripsGridPositions.ModuleTitle]: [
      {
        type: ContentBlockType.ModuleTitle,
        displayName,
        displayNameColor: color,
        linkUrl
      }
    ],
    [StripsGridPositions.ModuleContent]: await handlerRunner(
      {
        type: HandlerInputType.ColumnGrid,
        border: false,
        columnGap: 20,
        rowGap: 20,
        content: articles.map((article: IRawArticle) =>
          contentErrorHandler(
            articleFormatDelegate[articleFormat](article),
            HandlerInputType.Strips,
            strapName,
            params
          )
        )
      },
      params
    )
  };

  return await handlerRunner(
    {
      type: HandlerInputType.StripsGrid,
      content
    },
    params
  );
}
