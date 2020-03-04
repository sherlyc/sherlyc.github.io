import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { LayoutType } from "../../../adapters/__types__/LayoutType";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { halfImageArticleWithoutIntroUnit } from "../../../adapters/article-converter/half-image-article-without-intro-unit.converter";
import { halfWidthImageArticleUnit } from "../../../adapters/article-converter/half-width-image-article-unit.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { layoutRetriever } from "../../../adapters/layout/layout-retriever";
import { Strap } from "../../../strap";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { ITopStoriesDefaultOneHighlightHandlerInput } from "../../__types__/ITopStoriesDefaultOneHighlightHandlerInput";
import { ITopStoriesDefconHighlightHandlerInput } from "../../__types__/ITopStoriesDefconHighlightHandlerInput";
import { TopStoriesGridPositions } from "../../__types__/ITopStoriesGridHandlerInput";
import { ITopStoriesHandlerInput } from "../../__types__/ITopStoriesHandlerInput";
import { handlerRunnerFunction } from "../../runner";
import { contentErrorHandler } from "../content-error-handler";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";

const topStoriesVariationHandler: {
  [key in LayoutType]: (
    handlerRunner: handlerRunnerFunction,
    articles: IRawArticle[],
    strapName: string,
    color: string,
    params: IParams
  ) => Promise<IContentBlock[]>;
} = {
  [LayoutType.DEFAULT]: defaultOneHandler,
  [LayoutType.DEFCON]: defconHandler,
  [LayoutType.BIG_HEADLINE]: defaultOneHandler
};

async function defaultOneHandler(
  handlerRunner: handlerRunnerFunction,
  articles: IRawArticle[],
  strapName: string,
  color: string,
  params: IParams
) {
  const [articleOne, articleTwo, ...remainingArticles] = articles;
  const topStoriesDefaultOneHandlerInput: ITopStoriesDefaultOneHighlightHandlerInput = {
    type: HandlerInputType.TopStoriesDefaultOneHighlight,
    articles: [articleTwo, articleOne],
    strapName,
    color
  };
  const highlightContents = await handlerRunner(
    topStoriesDefaultOneHandlerInput,
    params
  );
  return await createTopStoriesGrid(
    handlerRunner,
    highlightContents,
    remainingArticles,
    strapName,
    color,
    params
  );
}

async function defconHandler(
  handlerRunner: handlerRunnerFunction,
  articles: IRawArticle[],
  strapName: string,
  color: string,
  params: IParams
) {
  const [articleOne, articleTwo, articleThree, ...remainingArticles] = articles;
  const topStoriesDefconHandlerInput: ITopStoriesDefconHighlightHandlerInput = {
    type: HandlerInputType.TopStoriesDefconHighlight,
    strapName,
    articles: [articleOne, articleTwo, articleThree]
  };
  const highlightContents = await handlerRunner(
    topStoriesDefconHandlerInput,
    params
  );
  return await createTopStoriesGrid(
    handlerRunner,
    highlightContents,
    remainingArticles,
    strapName,
    color,
    params
  );
}

async function createTopStoriesGrid(
  handlerRunner: handlerRunnerFunction,
  highlightContents: IContentBlock[],
  articles: IRawArticle[],
  strapName: string,
  color: string,
  params: IParams
) {
  const content: { [position in TopStoriesGridPositions]: IContentBlock[] } = {
    [TopStoriesGridPositions.Highlight]: highlightContents,
    [TopStoriesGridPositions.Right]: [
      {
        type: ContentBlockType.StickyContainer,
        items: [basicAdUnit(strapName)]
      }
    ],
    [TopStoriesGridPositions.FirstRow1]: [
      contentErrorHandler(
        () =>
          halfWidthImageArticleUnit(articles.shift() as IRawArticle, strapName),
        HandlerInputType.TopStories,
        Strap.TopStories,
        params
      )
    ],
    [TopStoriesGridPositions.FirstRow2]: [
      contentErrorHandler(
        () =>
          halfWidthImageArticleUnit(articles.shift() as IRawArticle, strapName),
        HandlerInputType.TopStories,
        Strap.TopStories,
        params
      )
    ],
    [TopStoriesGridPositions.FirstRow3]: [basicAdUnit(strapName)],
    [TopStoriesGridPositions.FirstRow4]: [
      contentErrorHandler(
        () =>
          halfWidthImageArticleUnit(articles.shift() as IRawArticle, strapName),
        HandlerInputType.TopStories,
        Strap.TopStories,
        params
      )
    ],
    [TopStoriesGridPositions.SecondRow1]: [
      contentErrorHandler(
        () =>
          halfImageArticleWithoutIntroUnit(
            articles.shift() as IRawArticle,
            strapName
          ),
        HandlerInputType.TopStories,
        Strap.TopStories,
        params
      )
    ],
    [TopStoriesGridPositions.SecondRow2]: [
      contentErrorHandler(
        () =>
          halfImageArticleWithoutIntroUnit(
            articles.shift() as IRawArticle,
            strapName
          ),
        HandlerInputType.TopStories,
        Strap.TopStories,
        params
      )
    ],
    [TopStoriesGridPositions.SecondRow3]: [
      contentErrorHandler(
        () =>
          halfImageArticleWithoutIntroUnit(
            articles.shift() as IRawArticle,
            strapName
          ),
        HandlerInputType.TopStories,
        Strap.TopStories,
        params
      )
    ],
    [TopStoriesGridPositions.SecondRow4]: [
      contentErrorHandler(
        () =>
          halfImageArticleWithoutIntroUnit(
            articles.shift() as IRawArticle,
            strapName
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
  { strapName, color }: ITopStoriesHandlerInput,
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
    color,
    params
  );
}
