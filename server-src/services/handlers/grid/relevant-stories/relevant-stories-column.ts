import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { StripsGridPositions } from "../../__types__/IStripsGridHandlerInput";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import wrappedLogger from "../../../utils/logger";
import { articleTitle } from "../../../adapters/article-converter/article-title.converter";

export const createRelevantStoriesColumn = async (
  articlesPromise: Promise<IRawArticle[]>,
  moduleTitle: string,
  moduleTitleColor: string,
  showTimeStamp: boolean,
  showNumberPosition: boolean,
  handlerRunner: handlerRunnerFunction,
  params: IParams
): Promise<IContentBlock[]> => {
  try {
    const articles = await articlesPromise;
    const articleContentBlocks = articles.map((article, index) =>
      showNumberPosition
        ? articleTitle(
            article,
            moduleTitle,
            showTimeStamp,
            String(index + 1).padStart(2, "0")
          )
        : articleTitle(article, moduleTitle, showTimeStamp)
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
