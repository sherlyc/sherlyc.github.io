import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { basicArticleTitleUnit } from "../../../adapters/article-converter/basic-article-title.converter";
import { halfWidthImageArticleUnit } from "../../../adapters/article-converter/half-width-image-article-unit.converter";
import { responsiveBigImageArticleUnit } from "../../../adapters/article-converter/responsive-big-image-article.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { BiggieSmallsGridPositions } from "../../__types__/IBiggieSmallsGridHandlerInput";
import { IBiggieSmallsHandlerInput } from "../../__types__/IBiggieSmallsHandlerInput";
import { contentErrorHandler } from "../content-error-handler";

export const ARTICLE_CAPACITY_BIGGIE_SMALLS = 7;

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    displayName,
    color,
    linkUrl,
    sourceId,
    strapName
  }: IBiggieSmallsHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(
    sourceId,
    ARTICLE_CAPACITY_BIGGIE_SMALLS,
    params
  );

  const content: { [key in BiggieSmallsGridPositions]: IContentBlock[] } = {
    [BiggieSmallsGridPositions.ModuleTitle]: [
      {
        type: ContentBlockType.ModuleTitle,
        displayName,
        displayNameColor: color,
        linkUrl
      }
    ],
    [BiggieSmallsGridPositions.Highlight]: [
      contentErrorHandler(
        () =>
          responsiveBigImageArticleUnit(
            articles.shift() as IRawArticle,
            strapName,
            color
          ),
        HandlerInputType.BiggieSmalls,
        sourceId,
        params
      )
    ],
    [BiggieSmallsGridPositions.Right]: [basicAdUnit(strapName)],
    [BiggieSmallsGridPositions.FirstRow1]: [
      contentErrorHandler(
        () =>
          halfWidthImageArticleUnit(
            articles.shift() as IRawArticle,
            strapName,
            color
          ),
        HandlerInputType.BiggieSmalls,
        sourceId,
        params
      )
    ],
    [BiggieSmallsGridPositions.FirstRow2]: await handlerRunner(
      {
        type: HandlerInputType.ListGrid,
        content: articles
          .splice(0, 5)
          .map((article) =>
            contentErrorHandler(
              () =>
                basicArticleTitleUnit(article as IRawArticle, strapName, color),
              HandlerInputType.BiggieSmalls,
              sourceId,
              params
            )
          )
      },
      params
    ),
    [BiggieSmallsGridPositions.FirstRow3]: [basicAdUnit(strapName)]
  };

  return await handlerRunner(
    {
      type: HandlerInputType.BiggieSmallsGrid,
      content
    },
    params
  );
}
