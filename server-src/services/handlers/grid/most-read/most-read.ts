import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { homepageArticleContent } from "../../../adapters/article-converter/homepage-article-content.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { getMostPopular } from "../../../adapters/most-popular/most-popular.service";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { Strap } from "../../../strap";
import logger from "../../../utils/logger";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { MostReadGridPositions } from "../../__types__/IMostReadGridHandlerInput";
import { IMostReadHandlerInput } from "../../__types__/IMostReadHandlerInput";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { displayName, strapName }: IMostReadHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  let mostPopular: IRawArticle[] = [];
  try {
    mostPopular = await getMostPopular(8, params);
  } catch (error) {
    logger.error(params.apiRequestId, `getMostPopular error`, error);
  }

  let dailyFixArticles: IRawArticle[] = [];
  try {
    dailyFixArticles = await getRawArticles(Strap.DailyFix, 4, params);
  } catch (error) {
    logger.error(params.apiRequestId, `dailyFix error`, error);
  }

  const content: { [key in MostReadGridPositions]: IContentBlock[] } = {
    [MostReadGridPositions.Left]: [
      {
        type: ContentBlockType.MostReadList,
        articles: mostPopular.map(homepageArticleContent),
        displayName,
        strapName
      }
    ],
    [MostReadGridPositions.Right]: [
      {
        type: ContentBlockType.StickyContainer,
        items: [basicAdUnit(strapName)]
      }
    ],
    [MostReadGridPositions.Bottom]: [
      {
        type: ContentBlockType.DailyFix,
        articles: dailyFixArticles.map(homepageArticleContent),
        displayName: "daily fix",
        strapName: "homepagev2DailyFix"
      }
    ]
  };

  return await handlerRunner(
    {
      type: HandlerInputType.MostReadGrid,
      content
    },
    params
  );
}
