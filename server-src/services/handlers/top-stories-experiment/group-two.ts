import { handlerRunnerFunction } from "../runner";
import { IParams } from "../../__types__/IParams";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import { Strap } from "../../strap";
import { LayoutType } from "../../adapters/__types__/LayoutType";
import { layoutRetriever } from "../../adapters/layout/layout-retriever";
import logger from "../../utils/logger";
import { ITopStoriesArticleListGroupTwoHandlerInput } from "../__types__/ITopStoriesArticleListGroupTwo";
import { bigImageArticleUnit } from "../../adapters/article-converter/big-image-article.converter";
import { basicAdUnit } from "../../adapters/article-converter/basic-ad-unit.converter";
import { grayDefconArticleUnit } from "../../adapters/article-converter/gray-defcon-article-unit.converter";
import { halfWidthImageArticleUnit } from "../../adapters/article-converter/half-width-image-article-unit.converter";

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
  { strapName, totalArticles }: ITopStoriesArticleListGroupTwoHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
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
      if (index < 3) {
        return [
          ...final,
          bigImageArticleUnit(article, strapName),
          basicAdUnit(strapName)
        ];
      }
      return [
        ...final,
        halfWidthImageArticleUnit(article, strapName),
        basicAdUnit(strapName)
      ];
    },
    [basicAdUnit(strapName)] as IContentBlock[]
  );
}
