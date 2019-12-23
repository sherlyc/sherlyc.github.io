import { IBasicAdUnit } from "../../../../common/__types__/IBasicAdUnit";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";

export const basicAdUnit = (context: string): IBasicAdUnit => ({
  type: ContentBlockType.BasicAdUnit,
  context
});
