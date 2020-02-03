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
import {
  ITopStoriesGridHandlerInput,
  TopStoriesGridPositions
} from "../../__types__/ITopStoriesGridHandlerInput";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { contentErrorHandler } from "../content-error-handler";
import { bigImageArticleUnit } from "../../../adapters/article-converter/big-image-article.converter";
import { BigImageArticleUnitLayout } from "../../../../../common/__types__/IBigImageArticleUnit";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";

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
  if (layout === LayoutType.DEFAULT) {
    const topStoriesDefaultOneHandlerInput: ITopStoriesDefaultOneHandlerInput = {
      type: HandlerInputType.TopStoriesDefaultOne,
      strapName,
      articles: [
        articles.shift() as IRawArticle,
        articles.shift() as IRawArticle
      ]
    };
    const bigTopLeftContent = await handlerRunner(
      topStoriesDefaultOneHandlerInput,
      params
    );
    const topStoriesGridInput: ITopStoriesGridHandlerInput = {
      type: HandlerInputType.TopStoriesGrid,
      content: {
        [TopStoriesGridPositions.BigTopLeft]: bigTopLeftContent,
        [TopStoriesGridPositions.Right]: [basicAdUnit(strapName)],
        [TopStoriesGridPositions.FirstRow1]: [
          await contentErrorHandler(
            () => {
              const article = JSON.parse(
                JSON.stringify(articles.shift() as IRawArticle)
              );
              console.log(articles.length, article.id);
              return bigImageArticleUnit(
                article,
                strapName,
                BigImageArticleUnitLayout.module
              );
            },
            HandlerInputType.TopStories,
            Strap.TopStories,
            params
          )
        ],
        [TopStoriesGridPositions.FirstRow2]: [
          await contentErrorHandler(
            () => {
              const article = JSON.parse(
                JSON.stringify(articles.shift() as IRawArticle)
              );
              console.log(articles.length, article.id);
              return bigImageArticleUnit(
                article,
                strapName,
                BigImageArticleUnitLayout.module
              );
            },
            HandlerInputType.TopStories,
            Strap.TopStories,
            params
          )
        ],
        [TopStoriesGridPositions.FirstRow3]: [
          await contentErrorHandler(
            () => {
              const article = JSON.parse(
                JSON.stringify(articles.shift() as IRawArticle)
              );
              console.log(articles.length, article.id);
              return bigImageArticleUnit(
                article,
                strapName,
                BigImageArticleUnitLayout.module
              );
            },
            HandlerInputType.TopStories,
            Strap.TopStories,
            params
          )
        ],
        [TopStoriesGridPositions.FirstRow4]: [
          await contentErrorHandler(
            () => {
              const article = JSON.parse(
                JSON.stringify(articles.shift() as IRawArticle)
              );
              console.log(articles.length, article.id);
              return bigImageArticleUnit(
                article,
                strapName,
                BigImageArticleUnitLayout.module
              );
            },
            HandlerInputType.TopStories,
            Strap.TopStories,
            params
          )
        ],
        [TopStoriesGridPositions.SecondRow1]: [
          await contentErrorHandler(
            () => {
              const article = JSON.parse(
                JSON.stringify(articles.shift() as IRawArticle)
              );
              console.log(articles.length, article.id);
              return bigImageArticleUnit(
                article,
                strapName,
                BigImageArticleUnitLayout.module
              );
            },
            HandlerInputType.TopStories,
            Strap.TopStories,
            params
          )
        ],
        [TopStoriesGridPositions.SecondRow2]: [
          await contentErrorHandler(
            () => {
              const article = JSON.parse(
                JSON.stringify(articles.shift() as IRawArticle)
              );
              console.log(articles.length, article.id);
              return bigImageArticleUnit(
                article,
                strapName,
                BigImageArticleUnitLayout.module
              );
            },
            HandlerInputType.TopStories,
            Strap.TopStories,
            params
          )
        ],
        [TopStoriesGridPositions.SecondRow3]: [
          await contentErrorHandler(
            () => {
              const article = JSON.parse(
                JSON.stringify(articles.shift() as IRawArticle)
              );
              console.log(articles.length, article.id);
              return bigImageArticleUnit(
                article,
                strapName,
                BigImageArticleUnitLayout.module
              );
            },
            HandlerInputType.TopStories,
            Strap.TopStories,
            params
          )
        ],
        [TopStoriesGridPositions.SecondRow4]: [
          await contentErrorHandler(
            () => {
              const article = JSON.parse(
                JSON.stringify(articles.shift() as IRawArticle)
              );
              console.log(articles.length, article.id);
              return bigImageArticleUnit(
                article,
                strapName,
                BigImageArticleUnitLayout.module
              );
            },
            HandlerInputType.TopStories,
            Strap.TopStories,
            params
          )
        ]
      }
    };
    return await handlerRunner(topStoriesGridInput, params);
  }

  return [];
}
