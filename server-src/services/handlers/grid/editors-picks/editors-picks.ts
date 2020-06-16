import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IEditorsPicksHandlerInput } from "../../__types__/IEditorsPicksHandlerInput";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  EditorsPicksGridPositions,
  IEditorsPicksGridHandlerInput,
} from "../../__types__/IEditorsPicksGridHandlerInput";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { contentErrorHandler } from "../content-error-handler";
import { homepageArticle } from "../../../adapters/article-converter/homepage-article.converter";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";

export default async function (
  handlerRunner: handlerRunnerFunction,
  {
    sourceId,
    strapName,
    displayName,
    color,
    linkUrl,
  }: IEditorsPicksHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(sourceId, 8, params);
  const gridHandlerInput: IEditorsPicksGridHandlerInput = {
    type: HandlerInputType.EditorsPicksGrid,
    content: {
      [EditorsPicksGridPositions.ModuleTitle]: [
        {
          type: ContentBlockType.ModuleHeader,
          title: displayName,
          color,
        },
      ],
      [EditorsPicksGridPositions.FirstRowOne]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              articles.shift() as IRawArticle,
              strapName,
              color,
              {
                mobile: Orientation.Portrait,
                tablet: Orientation.Portrait,
                desktop: Orientation.Portrait,
              },
              false,
              true
            ),
          HandlerInputType.EditorsPicks,
          sourceId,
          params
        ),
      ],
      [EditorsPicksGridPositions.FirstRowTwo]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              articles.shift() as IRawArticle,
              strapName,
              color,
              {
                mobile: Orientation.Portrait,
                tablet: Orientation.Portrait,
                desktop: Orientation.Portrait,
              },
              false,
              true
            ),
          HandlerInputType.EditorsPicks,
          sourceId,
          params
        ),
      ],
      [EditorsPicksGridPositions.FirstRowThree]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              articles.shift() as IRawArticle,
              strapName,
              color,
              {
                mobile: Orientation.Portrait,
                tablet: Orientation.Portrait,
                desktop: Orientation.Portrait,
              },
              false,
              true
            ),
          HandlerInputType.EditorsPicks,
          sourceId,
          params
        ),
      ],
      [EditorsPicksGridPositions.FirstRowFour]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              articles.shift() as IRawArticle,
              strapName,
              color,
              {
                mobile: Orientation.Portrait,
                tablet: Orientation.Portrait,
                desktop: Orientation.Portrait,
              },
              false,
              true
            ),
          HandlerInputType.EditorsPicks,
          sourceId,
          params
        ),
      ],
      [EditorsPicksGridPositions.SecondRowOne]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              articles.shift() as IRawArticle,
              strapName,
              color,
              {
                mobile: Orientation.Portrait,
                tablet: Orientation.Portrait,
                desktop: Orientation.Portrait,
              },
              false,
              true
            ),
          HandlerInputType.EditorsPicks,
          sourceId,
          params
        ),
      ],
      [EditorsPicksGridPositions.SecondRowTwo]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              articles.shift() as IRawArticle,
              strapName,
              color,
              {
                mobile: Orientation.Portrait,
                tablet: Orientation.Portrait,
                desktop: Orientation.Portrait,
              },
              false,
              true
            ),
          HandlerInputType.EditorsPicks,
          sourceId,
          params
        ),
      ],
      [EditorsPicksGridPositions.SecondRowThree]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              articles.shift() as IRawArticle,
              strapName,
              color,
              {
                mobile: Orientation.Portrait,
                tablet: Orientation.Portrait,
                desktop: Orientation.Portrait,
              },
              false,
              true
            ),
          HandlerInputType.EditorsPicks,
          sourceId,
          params
        ),
      ],
      [EditorsPicksGridPositions.SecondRowFour]: [
        contentErrorHandler(
          () =>
            homepageArticle(
              articles.shift() as IRawArticle,
              strapName,
              color,
              {
                mobile: Orientation.Portrait,
                tablet: Orientation.Portrait,
                desktop: Orientation.Portrait,
              },
              false,
              true
            ),
          HandlerInputType.EditorsPicks,
          sourceId,
          params
        ),
      ],
      [EditorsPicksGridPositions.Ad]: [
        {
          type: ContentBlockType.StickyContainer,
          items: [basicAdUnit(strapName)],
        },
      ],
    },
  };
  return handlerRunner(gridHandlerInput, params);
}
