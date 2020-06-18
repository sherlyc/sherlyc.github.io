import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { homepageArticleContent } from "../../../adapters/article-converter/homepage-article-content.converter";
import { getMostPopular } from "../../../adapters/most-popular/most-popular.service";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
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
  let articles: IRawArticle[] = [];
  try {
    articles = await getMostPopular(8, params);
  } catch (error) {
    logger.error(params.apiRequestId, `getMostPopular error`, error);
  }

  const content: { [key in MostReadGridPositions]: IContentBlock[] } = {
    [MostReadGridPositions.Left]: [
      {
        type: ContentBlockType.MostReadList,
        articles: articles.map(homepageArticleContent),
        displayName,
        strapName
      }
    ],
    [MostReadGridPositions.Right]: [
      {
        type: ContentBlockType.StickyContainer,
        items: [basicAdUnit(strapName)]
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
