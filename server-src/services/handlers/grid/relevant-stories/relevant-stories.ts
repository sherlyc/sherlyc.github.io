import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IRelevantStoriesHandlerInput } from "../../__types__/IRelevantStoriesHandlerInput";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { Strap } from "../../../strap";
import { basicArticleTitleUnit } from "../../../adapters/article-converter/basic-article-title.converter";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import wrappedLogger from "../../../utils/logger";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { getMostPopular } from "../../../adapters/most-popular/most-popular.service";
import {
  IRelevantStoriesGridHandlerInput,
  RelevantStoriesGridPositions
} from "../../__types__/IRelevantStoriesGridHandlerInput";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";

const createListContent = async (
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

    return [
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
      `Relevant stories handler - Failed to get articles - module: ${moduleTitle}`,
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
  const totalArticles = 5;

  const [
    [firstColumnContent],
    [secondColumnContent],
    [thirdColumnContent]
  ] = await Promise.all([
    createListContent(
      getRawArticles(Strap.LatestNews, totalArticles, params),
      "Latest News",
      "pizzaz",
      handlerRunner,
      params
    ),
    createListContent(
      getRawArticles(Strap.EditorPicks, totalArticles, params),
      "Editors' Picks",
      "pizzaz",
      handlerRunner,
      params
    ),
    createListContent(
      getMostPopular(totalArticles, params),
      "Most Popular",
      "pizzaz",
      handlerRunner,
      params
    )
  ]);

  const relevantStoriesGrid: IRelevantStoriesGridHandlerInput = {
    type: HandlerInputType.RelevantStoriesGrid,
    content: {
      [RelevantStoriesGridPositions.FirstColumnTitle]: [
        {
          type: ContentBlockType.ModuleTitle,
          displayName: "Lastest News",
          displayNameColor: "pizzaz"
        }
      ],
      [RelevantStoriesGridPositions.FirstColumnContent]: [firstColumnContent],
      [RelevantStoriesGridPositions.SecondColumnTitle]: [
        {
          type: ContentBlockType.ModuleTitle,
          displayName: "Editors' Picks",
          displayNameColor: "pizzaz"
        }
      ],
      [RelevantStoriesGridPositions.SecondColumnContent]: [secondColumnContent],
      [RelevantStoriesGridPositions.ThirdColumnTitle]: [
        {
          type: ContentBlockType.ModuleTitle,
          displayName: "Most Popular",
          displayNameColor: "pizzaz"
        }
      ],
      [RelevantStoriesGridPositions.ThirdColumnContent]: [thirdColumnContent],
      [RelevantStoriesGridPositions.Right]: [
        {
          type: ContentBlockType.StickyContainer,
          items: [basicAdUnit("homepageEditorsPicks")]
        }
      ]
    }
  };

  return await handlerRunner(relevantStoriesGrid, params);
}
