import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IBasicAdUnit } from "../../../../common/__types__/IBasicAdUnit";

export const basicAdUnit = (context: string): IBasicAdUnit => ({
  type: ContentBlockType.BasicAdUnit,
  context
});
