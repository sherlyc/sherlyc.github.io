import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { BigImageArticleUnitLayout } from "../../../../../common/__types__/IBigImageArticleUnit";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { bigImageArticleUnit } from "../../../adapters/article-converter/big-image-article.converter";
import { featuredArticle } from "../../../adapters/article-converter/featured-article.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { StripsGridPositions } from "../../__types__/IStripsGridHandlerInput";
import { IStripsHandlerInput } from "../../__types__/IStripsHandlerInput";
import { handlerRunnerFunction } from "../../runner";
import { contentErrorHandler } from "../content-error-handler";

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    displayName,
    displayNameColor,
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
      bigImageArticleUnit(article, strapName, BigImageArticleUnitLayout.module),
    [ContentBlockType.FeaturedArticle]: (article: IRawArticle) => () =>
      featuredArticle(article, strapName, "white", "black", false)
  };

  const content: { [key in StripsGridPositions]: IContentBlock[] } = {
    [StripsGridPositions.ModuleTitle]: [
      {
        type: ContentBlockType.ModuleTitle,
        displayName,
        displayNameColor
      }
    ],
    [StripsGridPositions.FirstRow1]: await handlerRunner(
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
