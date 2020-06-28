import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";
import { featuredArticle } from "../../../adapters/article-converter/featured-article.converter";
import { homepageArticle } from "../../../adapters/article-converter/homepage-article.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { StripsGridPositions } from "../../__types__/IStripsGridHandlerInput";
import { IStripsV2HandlerInput } from "../../__types__/IStripsV2HandlerInput";
import { contentErrorHandler } from "../content-error-handler";

export default async function (
  handlerRunner: handlerRunnerFunction,
  {
    displayName,
    color,
    linkUrl,
    sourceId,
    strapName,
    articleCount,
    articleFormat
  }: IStripsV2HandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articleFormatDelegate = {
    [ContentBlockType.HomepageArticle]: (article: IRawArticle) => () =>
      homepageArticle(
        article,
        strapName,
        color,
        {
          mobile: Orientation.Portrait,
          tablet: Orientation.Portrait,
          desktop: Orientation.Portrait
        },
        true,
        true
      ),
    [ContentBlockType.FeaturedArticle]: (article: IRawArticle) => () =>
      featuredArticle(article, strapName, "white", "black", false)
  };

  const articles = await getRawArticles(sourceId, articleCount, params);
  const moduleContent = await handlerRunner(
    {
      type: HandlerInputType.ColumnGrid,
      border: false,
      columnGap: 20,
      rowGap: 20,
      content: articles.map((article: IRawArticle) =>
        contentErrorHandler(
          articleFormatDelegate[articleFormat](article),
          HandlerInputType.StripsV2,
          strapName,
          params
        )
      )
    },
    params
  );

  const input: { [key in StripsGridPositions]: IContentBlock[] } = {
    [StripsGridPositions.ModuleTitle]: [
      {
        type: ContentBlockType.ModuleHeader,
        title: displayName,
        color,
        url: linkUrl
      }
    ],
    [StripsGridPositions.ModuleContent]: moduleContent
  };

  return await handlerRunner(
    {
      type: HandlerInputType.StripsGrid,
      content: input
    },
    params
  );
}
