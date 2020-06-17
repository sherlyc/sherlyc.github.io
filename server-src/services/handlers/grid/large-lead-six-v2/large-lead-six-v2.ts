import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { homepageArticle } from "../../../adapters/article-converter/homepage-article.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  ILargeLeadSixGridHandlerInput,
  LargeLeadSixGridPositions
} from "../../__types__/ILargeLeadSixGridHandlerInput";
import { ILargeLeadSixV2HandlerInput } from "../../__types__/ILargeLeadSixV2HandlerInput";
import { contentErrorHandler } from "../content-error-handler";

export default async function (
  handlerRunner: handlerRunnerFunction,
  {
    sourceId,
    strapName,
    displayName,
    color,
    linkUrl
  }: ILargeLeadSixV2HandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(sourceId, 5, params);
  const leftContent = contentErrorHandler(
    () =>
      homepageArticle(
        articles.shift() as IRawArticle,
        strapName,
        color,
        {
          mobile: Orientation.Portrait,
          tablet: Orientation.Portrait,
          desktop: Orientation.Portrait
        },
        true,
        true
      ),
    HandlerInputType.LargeLeadSix,
    sourceId,
    params
  );
  const listGridContent = articles.map((article, index) =>
    homepageArticle(
      article,
      strapName,
      color,
      {
        mobile: Orientation.Portrait,
        tablet: Orientation.Portrait,
        desktop: Orientation.Portrait
      },
      index < 1,
      false
    )
  );
  const middleContent = await handlerRunner(
    {
      type: HandlerInputType.ListGrid,
      content: listGridContent
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
          color
        }
      ],
      [LargeLeadSixGridPositions.Left]: [leftContent],
      [LargeLeadSixGridPositions.Middle]: middleContent,
      [LargeLeadSixGridPositions.Right]: [
        {
          type: ContentBlockType.StickyContainer,
          items: [basicAdUnit(strapName)]
        }
      ]
    }
  };
  return await handlerRunner(largeLeadSixGridHandlerInput, params);
}
