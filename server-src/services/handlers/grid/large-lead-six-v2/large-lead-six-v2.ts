import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { ILargeLeadSixV2HandlerInput } from "../../__types__/ILargeLeadSixV2HandlerInput";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { contentErrorHandler } from "../content-error-handler";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { homepageArticle } from "../../../adapters/article-converter/homepage-article.converter";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";
import {
  ILargeLeadSixGridHandlerInput,
  LargeLeadSixGridPositions,
} from "../../__types__/ILargeLeadSixGridHandlerInput";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";

export default async function (
  handlerRunner: handlerRunnerFunction,
  {
    sourceId,
    strapName,
    displayName,
    color,
    linkUrl,
  }: ILargeLeadSixV2HandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(sourceId, 6, params);
  const leftContent = contentErrorHandler(
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
        true,
        true
      ),
    HandlerInputType.LargeLeadSix,
    sourceId,
    params
  );
  const listGridContent = articles.map((article, index) =>
    index < 2
      ? homepageArticle(
          article,
          strapName,
          color,
          {
            mobile: Orientation.Portrait,
            tablet: Orientation.Portrait,
            desktop: Orientation.Portrait,
          },
          true,
          false
        )
      : homepageArticle(
          article,
          strapName,
          color,
          {
            mobile: Orientation.Portrait,
            tablet: Orientation.Portrait,
            desktop: Orientation.Portrait,
          },
          false,
          false
        )
  );
  const middleContent = await handlerRunner(
    {
      type: HandlerInputType.ListGrid,
      content: listGridContent,
    },
    params
  );
  const largeLeadSixGridHandlerInput: ILargeLeadSixGridHandlerInput = {
    type: HandlerInputType.LargeLeadSixGrid,
    content: {
      [LargeLeadSixGridPositions.ModuleTitle]: [
        {
          type: ContentBlockType.ModuleHeader,
          title: displayName,
          url: linkUrl,
          color,
        },
      ],
      [LargeLeadSixGridPositions.Left]: [leftContent],
      [LargeLeadSixGridPositions.Middle]: middleContent,
      [LargeLeadSixGridPositions.Right]: [
        {
          type: ContentBlockType.StickyContainer,
          items: [basicAdUnit(strapName)],
        },
      ],
    },
  };
  return await handlerRunner(largeLeadSixGridHandlerInput, params);
}
