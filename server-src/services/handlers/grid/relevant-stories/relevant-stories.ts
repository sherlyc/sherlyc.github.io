import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IColumnGridHandlerInput } from "../../__types__/IColumnGridHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IRelevantStoriesHandlerInput } from "../../__types__/IRelevantStoriesHandlerInput";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { Strap } from "../../../strap";
import { basicArticleTitleUnit } from "../../../adapters/article-converter/basic-article-title.converter";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import wrappedLogger from "../../../utils/logger";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { getMostPopular } from "../../../adapters/most-popular/most-popular.service";

const getColumnContent = async (
  articlesPromise: Promise<IRawArticle[]>,
  strapName: string,
  displayName: string,
  displayNameColor: string,
  handlerRunner: handlerRunnerFunction,
  params: IParams
): Promise<IContentBlock[]> => {
  try {
    const articles = await articlesPromise;
    const articleContentBlocks = articles.map((article) =>
      basicArticleTitleUnit(article, strapName)
    );

    return [
      {
        type: ContentBlockType.ModuleTitle,
        displayName,
        displayNameColor
      },
      ...(await handlerRunner(
        {
          type: HandlerInputType.ListGrid,
          content: articleContentBlocks
        },
        params
      ))
    ];
  } catch (error) {
    wrappedLogger.error(
      params.apiRequestId,
      `Relevant stories handler - Failed to get articles - strapName: ${strapName}`,
      error
    );
    return [];
  }
};

export default async function(
  handlerRunner: handlerRunnerFunction,
  {}: IRelevantStoriesHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const totalArticles = 8;

  const relevantStoriesGridHandlerInput: IColumnGridHandlerInput = {
    type: HandlerInputType.ColumnGrid,
    content: await Promise.all([
      getColumnContent(
        getRawArticles(Strap.LatestNews, totalArticles, params),
        "Latest News",
        "Latest News",
        "pizzaz",
        handlerRunner,
        params
      ),
      getColumnContent(
        getRawArticles(Strap.EditorPicks, totalArticles, params),
        "Editors' Picks",
        "Editors' Picks",
        "pizzaz",
        handlerRunner,
        params
      ),
      getColumnContent(
        getMostPopular(totalArticles, params),
        "Most Popular",
        "Most Popular",
        "pizzaz",
        handlerRunner,
        params
      ),
      [
        {
          type: ContentBlockType.StickyContainer,
          items: [basicAdUnit("homepageEditorsPicks")]
        }
      ]
    ])
  };

  return await handlerRunner(relevantStoriesGridHandlerInput, params);
}
