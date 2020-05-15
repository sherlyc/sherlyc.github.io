import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { HandlerInputType } from "./HandlerInputType";

export enum NewsSixV2GridPositions {
  ModuleTitle = "ModuleTitle",
  One = "One",
  Two = "Two",
  Three = "Three",
  Four = "Four",
  Five = "Five",
  Six = "Six"
}

export interface INewsSixGridV2HandlerInput {
  type: HandlerInputType.NewsSixV2Grid;
  content: { [key in NewsSixV2GridPositions]: IContentBlock[] };
}
