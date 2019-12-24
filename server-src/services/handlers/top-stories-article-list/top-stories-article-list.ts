import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IParams } from "../../__types__/IParams";
import { ITopStoriesArticleListHandlerInput } from "../__types__/ITopStoriesArticleListHandlerInput";
import { handlerRunnerFunction } from "../runner";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import { LayoutType } from "../../adapters/__types__/LayoutType";
import { layoutRetriever } from "../../adapters/layout/layout-retriever";
import logger from "../../utils/logger";
import { Strap } from "../../strap";
import { basicArticleUnit } from "../../adapters/article-converter/basic-article-unit.converter";
import { basicAdUnit } from "../../adapters/article-converter/basic-ad-unit.converter";
import { defconArticleUnit } from "../../adapters/article-converter/defcon-article-unit.converter";
import { IBasicArticleUnit } from "../../../../common/__types__/IBasicArticleUnit";
import { IDefconArticleUnit } from "../../../../common/__types__/IDefconArticleUnit";
import { grayDefconArticleUnit } from "../../adapters/article-converter/gray-defcon-article-unit.converter";
import { bigImageArticleUnit } from "../../adapters/article-converter/big-image-article.converter";
import { ExperimentName } from "../../../../common/ExperimentName";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IGrayDefconArticleUnit } from "../../../../common/__types__/IGrayDefconArticleUnit";
import { IBigImageArticleUnit } from "../../../../common/__types__/IBigImageArticleUnit";

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
  { strapName, totalArticles = 0 }: ITopStoriesArticleListHandlerInput,
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

  const oldMobileContent: Array<
    IBigImageArticleUnit | IGrayDefconArticleUnit
  > = rawArticles.map((article, index) =>
    index === 0 && layout === LayoutType.DEFCON
      ? grayDefconArticleUnit(article, strapName)
      : bigImageArticleUnit(article, strapName)
  );

  const oldDesktopContent: Array<
    IBasicArticleUnit | IDefconArticleUnit
  > = rawArticles.map((article, index) =>
    index === 0 && layout === LayoutType.DEFCON
      ? defconArticleUnit(article, strapName)
      : basicArticleUnit(article, strapName)
  );

  return [
    {
      type: ContentBlockType.ExperimentContainer,
      name: ExperimentName.TopStoriesVisualExperiment,
      variants: {
        control: oldDesktopContent.reduce(
          (final, item) => [...final, item, basicAdUnit(strapName)],
          [basicAdUnit(strapName)] as IContentBlock[]
        ),
        groupOne: oldMobileContent.reduce(
          (final, item) => [...final, item, basicAdUnit(strapName)],
          [basicAdUnit(strapName)] as IContentBlock[]
        )
      }
    }
  ];
}
