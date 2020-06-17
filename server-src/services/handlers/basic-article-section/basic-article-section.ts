import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IParams } from "../../__types__/IParams";
import { handlerRunnerFunction } from "../runner";
import { IBasicArticleSectionHandlerInput } from "../__types__/IBasicArticleSectionHandlerInput";

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    displayName,
    displayNameColor,
    linkUrl,
    content
  }: IBasicArticleSectionHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return [
    {
      type: ContentBlockType.BasicArticleSection,
      displayName,
      displayNameColor,
      linkUrl,
      items: await handlerRunner(content, params)
    },
    { type: ContentBlockType.BasicAdUnit, context: displayName }
  ];
}
