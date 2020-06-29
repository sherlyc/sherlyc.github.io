import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { homepageArticleContent } from "../../adapters/article-converter/homepage-article-content.converter";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import { Strap } from "../../strap";
import logger from "../../utils/logger";
import { IParams } from "../../__types__/IParams";
import { handlerRunnerFunction } from "../runner";
import { ISkyboxHandlerInput } from "../__types__/ISkyboxHandlerInput";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { sourceId, strapName, articleCount }: ISkyboxHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  try {
    const articles = await getRawArticles(sourceId, articleCount, params);

    if (articles.length > 0) {
      return [
        {
          type: ContentBlockType.Skybox,
          articles: articles.map(homepageArticleContent),
          strapName: Strap.Skybox
        }
      ];
    } else {
      logger.warn(
        params.apiRequestId,
        `No articles retrieved from Skybox list`
      );
      return [];
    }
  } catch (error) {
    logger.error(params.apiRequestId, `Opinion handler error`, error);
    return [];
  }
}
