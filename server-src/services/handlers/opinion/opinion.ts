import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { homepageArticleContent } from "../../adapters/article-converter/homepage-article-content.converter";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import { Strap } from "../../strap";
import logger from "../../utils/logger";
import { IParams } from "../../__types__/IParams";
import { handlerRunnerFunction } from "../runner";
import { IOpinionHandlerInput } from "../__types__/IOpinionHandlerInput";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { strapName, displayName, linkUrl }: IOpinionHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  try {
    const cartoonArticles = await getRawArticles(Strap.Cartoons, 1, params);
    const opinionArticles = await getRawArticles(Strap.Perspectives, 4, params);

    if (cartoonArticles.length + opinionArticles.length > 0) {
      return [
        {
          type: ContentBlockType.Opinion,
          articles: opinionArticles.map(homepageArticleContent),
          cartoons: cartoonArticles.map(homepageArticleContent),
          strapName,
          displayName,
          url: linkUrl
        }
      ];
    } else {
      logger.warn(
        params.apiRequestId,
        "No articles retrieved from opinion list"
      );
      return [];
    }
  } catch (error) {
    logger.error(params.apiRequestId, `Opinion handler error`, error);
    return [];
  }
}
