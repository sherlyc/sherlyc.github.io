import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { BigImageArticleUnitLayout } from "../../../../../common/__types__/IBigImageArticleUnit";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { basicArticleTitleUnit } from "../../../adapters/article-converter/basic-article-title.converter";
import { bigImageArticleUnit } from "../../../adapters/article-converter/big-image-article.converter";
import { responsiveBigImageArticleUnit } from "../../../adapters/article-converter/responsive-big-image-article.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import wrappedLogger from "../../../utils/logger";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { NewsSixGridPositions } from "../../__types__/INewsSixGridHandlerInput";
import { INewsSixHandlerInput } from "../../__types__/INewsSixHandlerInput";
import { handlerRunnerFunction } from "../../runner";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { displayName, displayNameColor, sourceId, strapName }: INewsSixHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(sourceId, 6, params);

  const articlesLength = articles.length;
  try {
    const content: { [key in NewsSixGridPositions]: IContentBlock[] } = {
      [NewsSixGridPositions.ModuleTitle]: [
        {
          type: ContentBlockType.ModuleTitle,
          displayName,
          displayNameColor
        }
      ],
      [NewsSixGridPositions.BigTopLeft]: [
        responsiveBigImageArticleUnit(
          articles.shift() as IRawArticle,
          strapName
        )
      ],
      [NewsSixGridPositions.SmallTopRight]: [
        bigImageArticleUnit(
          articles.shift() as IRawArticle,
          strapName,
          BigImageArticleUnitLayout.module
        )
      ],
      [NewsSixGridPositions.SmallBottomFirst]: [
        basicArticleTitleUnit(articles.shift() as IRawArticle, strapName)
      ],
      [NewsSixGridPositions.SmallBottomSecond]: [
        basicArticleTitleUnit(articles.shift() as IRawArticle, strapName)
      ],
      [NewsSixGridPositions.SmallBottomThird]: [
        basicArticleTitleUnit(articles.shift() as IRawArticle, strapName)
      ],
      [NewsSixGridPositions.SmallBottomFourth]: [
        basicArticleTitleUnit(articles.shift() as IRawArticle, strapName)
      ]
    };

    return await handlerRunner(
      {
        type: HandlerInputType.NewsSixGrid,
        content
      },
      params
    );
  } catch (error) {
    wrappedLogger.error(
      params.apiRequestId,
      `News Six handler error: Potentially insufficient number of articles: ${articlesLength}. Strap name: ${sourceId}|${strapName}`,
      error
    );
    throw error;
  }
}
