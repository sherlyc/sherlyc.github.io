import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { basicArticleTitleUnit } from "../../../adapters/article-converter/basic-article-title.converter";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { StripsGridPositions } from "../../__types__/IStripsGridHandlerInput";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import wrappedLogger from "../../../utils/logger";

export const createRelevantStoriesColumn = async (
  articlesPromise: Promise<IRawArticle[]>,
  moduleTitle: string,
  moduleTitleColor: string,
  handlerRunner: handlerRunnerFunction,
  params: IParams
): Promise<IContentBlock[]> => {
  try {
    const articles = await articlesPromise;
    const articleContentBlocks = articles.map((article) =>
      basicArticleTitleUnit(article, moduleTitle)
    );

    return handlerRunner(
      {
        type: HandlerInputType.StripsGrid,
        content: {
          [StripsGridPositions.ModuleTitle]: [
            {
              type: ContentBlockType.ModuleSubtitle,
              displayName: moduleTitle,
              displayNameColor: moduleTitleColor
            }
          ],
          [StripsGridPositions.ModuleContent]: [
            ...(await handlerRunner(
              {
                type: HandlerInputType.ListGrid,
                content: articleContentBlocks
              },
              params
            ))
          ]
        }
      },
      params
    );
  } catch (error) {
    wrappedLogger.error(
      params.apiRequestId,
      `Relevant stories handler - Failed to get articles - module: ${moduleTitle}`,
      error
    );
    return [];
  }
};
