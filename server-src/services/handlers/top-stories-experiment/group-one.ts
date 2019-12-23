import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IParams } from "../../__types__/IParams";
import { handlerRunnerFunction } from "../runner";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import { LayoutType } from "../../adapters/__types__/LayoutType";
import { layoutRetriever } from "../../adapters/layout/layout-retriever";
import logger from "../../utils/logger";
import { Strap } from "../../strap";
import { ITopStoriesArticleListGroupOneHandlerInput } from "../__types__/ITopStoriesArticleListGroupOne";
import wrappedLogger from "../../utils/logger";
import { bigImageArticleUnit } from "../../adapters/article-converter/big-image-article.converter";
import { basicAdUnit } from "../../adapters/article-converter/basic-ad-unit.converter";
import { grayDefconArticleUnit } from "../../adapters/article-converter/gray-defcon-article-unit.converter";

const retrieveLayout = async (params: IParams): Promise<LayoutType> => {
  try {
    return await layoutRetriever(params);
  } catch (error) {
    logger.error(
      params.apiRequestId,
      `Top Stories Handler - retrieveLayout error - ${error.message}`
    );
    return LayoutType.DEFAULT;
  }
};

export default async function(
  handlerRunner: handlerRunnerFunction,
  { strapName, totalArticles }: ITopStoriesArticleListGroupOneHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  try {
    const layout = await retrieveLayout(params);
    let rawArticles = await getRawArticles(
      Strap.TopStories,
      totalArticles,
      params
    );

    if (layout === LayoutType.DEFAULT) {
      rawArticles = [
        rawArticles[1],
        rawArticles[0],
        ...rawArticles.slice(2)
      ].filter(Boolean);
    }

    return rawArticles.reduce(
      (final, article, index) => {
        if (index === 0 && layout === LayoutType.DEFCON) {
          return [
            ...final,
            grayDefconArticleUnit(article, strapName),
            basicAdUnit(strapName)
          ];
        }
        return [
          ...final,
          bigImageArticleUnit(article, strapName),
          basicAdUnit(strapName)
        ];
      },
      [basicAdUnit(strapName)] as IContentBlock[]
    );
  } catch (error) {
    wrappedLogger.error(
      params.apiRequestId,
      `Group one top stories handler error - ${Strap.TopStories} - ${error}`
    );
    throw error;
  }
}
