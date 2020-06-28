import { AccentColor } from "../../../../common/__types__/AccentColor";
import { Strap } from "../../strap";
import { HandlerInputType } from "./HandlerInputType";

export interface ILifeStyleHandlerInput {
  type: HandlerInputType.LifeStyle;
  displayName: string;
  color: AccentColor;
  linkUrl?: string;
  strapName: string;
  sourceId: Strap;
}

export enum LifeStyleGridPositions {
  ModuleTitle = "ModuleTitle",
  FirstRowOne = "FirstRowOne",
  FirstRowTwo = "FirstRowTwo",
  FirstRowThree = "FirstRowThree",
  FirstRowFive = "FirstRowFive",
  FirstRowFour = "FirstRowFour",
  SecondRowOne = "SecondRowOne",
  SecondRowTwo = "SecondRowTwo",
  SecondRowThree = "SecondRowThree",
  SecondRowFour = "SecondRowFour",
  SecondRowFive = "SecondRowFive"
}
