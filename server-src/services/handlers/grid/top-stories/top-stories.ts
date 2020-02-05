import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { ITopStoriesHandlerInput } from "../../__types__/ITopStoriesHandlerInput";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { Strap } from "../../../strap";
import { layoutRetriever } from "../../../adapters/layout/layout-retriever";
import { LayoutType } from "../../../adapters/__types__/LayoutType";
import { ITopStoriesDefaultOneHandlerInput } from "../../__types__/ITopStoriesDefaultOneHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { TopStoriesGridPositions } from "../../__types__/ITopStoriesGridHandlerInput";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { contentErrorHandler } from "../content-error-handler";
import { bigImageArticleUnit } from "../../../adapters/article-converter/big-image-article.converter";
import { BigImageArticleUnitLayout } from "../../../../../common/__types__/IBigImageArticleUnit";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";

const topStoriesVariationHandler: {
  [key in LayoutType]: (
    handlerRunner: handlerRunnerFunction,
    articles: IRawArticle[],
    strapName: string,
    params: IParams
  ) => Promise<IContentBlock[]>;
} = {
  [LayoutType.DEFAULT]: defaultOneHandler,
  [LayoutType.DEFCON]: async () => [],
  [LayoutType.BIG_HEADLINE]: async () => []
};

async function defaultOneHandler(
  handlerRunner: handlerRunnerFunction,
  articles: IRawArticle[],
  strapName: string,
  params: IParams
) {
  const [articleOne, articleTwo, ...remainingArticles] = articles;
  const topStoriesDefaultOneHandlerInput: ITopStoriesDefaultOneHandlerInput = {
    type: HandlerInputType.TopStoriesDefaultOne,
    strapName,
    articles: [articleTwo, articleOne]
  };
  const bigTopLeftContent = await handlerRunner(
    topStoriesDefaultOneHandlerInput,
    params
  );
  return await createTopStoriesGrid(
    handlerRunner,
    bigTopLeftContent,
    remainingArticles,
    strapName,
    params
  );
}

async function createTopStoriesGrid(
  handlerRunner: handlerRunnerFunction,
  bigTopLeftContent: IContentBlock[],
  articles: IRawArticle[],
  strapName: string,
  params: IParams
) {
  const content = {
    [TopStoriesGridPositions.BigTopLeft]: bigTopLeftContent,
    [TopStoriesGridPositions.Right]: [basicAdUnit(strapName)],
    [TopStoriesGridPositions.FirstRow1]: [
      contentErrorHandler(
        () =>
          bigImageArticleUnit(
            articles.shift() as IRawArticle,
            strapName,
            BigImageArticleUnitLayout.module
          ),
        HandlerInputType.TopStories,
        Strap.TopStories,
        params
      )
    ],
    [TopStoriesGridPositions.FirstRow2]: [
      contentErrorHandler(
        () =>
          bigImageArticleUnit(
            articles.shift() as IRawArticle,
            strapName,
            BigImageArticleUnitLayout.module
          ),
        HandlerInputType.TopStories,
        Strap.TopStories,
        params
      )
    ],
    [TopStoriesGridPositions.FirstRow3]: [
      contentErrorHandler(
        () =>
          bigImageArticleUnit(
            articles.shift() as IRawArticle,
            strapName,
            BigImageArticleUnitLayout.module
          ),
        HandlerInputType.TopStories,
        Strap.TopStories,
        params
      )
    ],
    [TopStoriesGridPositions.FirstRow4]: [
      contentErrorHandler(
        () =>
          bigImageArticleUnit(
            articles.shift() as IRawArticle,
            strapName,
            BigImageArticleUnitLayout.module
          ),
        HandlerInputType.TopStories,
        Strap.TopStories,
        params
      )
    ],
    [TopStoriesGridPositions.SecondRow1]: [
      contentErrorHandler(
        () =>
          bigImageArticleUnit(
            articles.shift() as IRawArticle,
            strapName,
            BigImageArticleUnitLayout.module
          ),
        HandlerInputType.TopStories,
        Strap.TopStories,
        params
      )
    ],
    [TopStoriesGridPositions.SecondRow2]: [
      contentErrorHandler(
        () =>
          bigImageArticleUnit(
            articles.shift() as IRawArticle,
            strapName,
            BigImageArticleUnitLayout.module
          ),
        HandlerInputType.TopStories,
        Strap.TopStories,
        params
      )
    ],
    [TopStoriesGridPositions.SecondRow3]: [
      contentErrorHandler(
        () =>
          bigImageArticleUnit(
            articles.shift() as IRawArticle,
            strapName,
            BigImageArticleUnitLayout.module
          ),
        HandlerInputType.TopStories,
        Strap.TopStories,
        params
      )
    ],
    [TopStoriesGridPositions.SecondRow4]: [
      contentErrorHandler(
        () =>
          bigImageArticleUnit(
            articles.shift() as IRawArticle,
            strapName,
            BigImageArticleUnitLayout.module
          ),
        HandlerInputType.TopStories,
        Strap.TopStories,
        params
      )
    ]
  };

  return await handlerRunner(
    {
      type: HandlerInputType.TopStoriesGrid,
      content
    },
    params
  );
}

export default async function(
  handlerRunner: handlerRunnerFunction,
  { strapName }: ITopStoriesHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const layout = await layoutRetriever(params);
  const maxRequiredArticles = 11;
  const articles = await getRawArticles(
    Strap.TopStories,
    maxRequiredArticles,
    params
  );
  return await topStoriesVariationHandler[layout](
    handlerRunner,
    articles,
    strapName,
    params
  );
}
