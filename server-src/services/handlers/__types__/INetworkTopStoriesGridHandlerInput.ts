import { HandlerInputType } from "./HandlerInputType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";

export interface INetworkTopStoriesGridHandlerInput {
  type: HandlerInputType.NetworkTopStoriesGrid;
  content: { [key in NetworkTopStoriesGridPositions]: IContentBlock[] };
}

export enum NetworkTopStoriesGridPositions {
  ModuleTitle = "ModuleTitle",
  FirstRow = "FirstRow",
  SecondRow = "SecondRow",
}
