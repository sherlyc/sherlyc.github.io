import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IBasicArticleListHandlerInput } from "../__types__/IBasicArticleListHandlerInput";
import { handlerRunnerFunction } from "../runner";
import { IParams } from "../../__types__/IParams";
import { LayoutType } from "../../adapters/__types__/LayoutType";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import wrappedLogger from "../../utils/logger";
import { basicArticleTitleUnit } from "../../adapters/article-converter/basic-article-title.converter";
import { basicArticleUnit } from "../../adapters/article-converter/basic-article-unit.converter";
import { basicAdUnit } from "../../adapters/article-converter/basic-ad-unit.converter";

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    sourceId,
    totalBasicArticlesUnit = 0,
    totalBasicArticleTitleUnit = 0,
    strapName,
    layout = LayoutType.DEFAULT
  }: IBasicArticleListHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  try {
    const totalArticles = totalBasicArticlesUnit + totalBasicArticleTitleUnit;
    const rawArticles = await getRawArticles(sourceId, totalArticles, params);

    return rawArticles.reduce(
      (final, article, index) => {
        if (index < totalBasicArticlesUnit) {
          return [
            ...final,
            basicArticleUnit(article, strapName),
            basicAdUnit(strapName)
          ];
        }
        return [
          ...final,
          basicArticleTitleUnit(article, strapName),
          basicAdUnit(strapName)
        ];
      },
      [basicAdUnit(strapName)] as IContentBlock[]
    );
  } catch (error) {
    wrappedLogger.error(
      params.apiRequestId,
      `Basic article list handler error - ${sourceId} - ${error}`
    );
    throw error;
  }
}
