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
  ILargeLeadSixV2GridHandlerInput,
  LargeLeadSixV2GridPositions
} from "../../__types__/ILargeLeadSixV2GridHandlerInput";
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
  const gridInput: ILargeLeadSixV2GridHandlerInput = {
    type: HandlerInputType.LargeLeadSixV2Grid,
    content: {
      [LargeLeadSixV2GridPositions.ModuleTitle]: [
        {
          type: ContentBlockType.ModuleHeader,
          title: displayName,
          url: linkUrl,
          color
        }
      ],
      [LargeLeadSixV2GridPositions.Left]: [leftContent],
      [LargeLeadSixV2GridPositions.Middle]: middleContent,
      [LargeLeadSixV2GridPositions.Right]: [
        {
          type: ContentBlockType.StickyContainer,
          items: [basicAdUnit(strapName)]
        }
      ]
    }
  };
  return await handlerRunner(gridInput, params);
}
