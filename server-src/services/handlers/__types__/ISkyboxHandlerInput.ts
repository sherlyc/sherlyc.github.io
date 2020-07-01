import { Strap } from "../../strap";
import { HandlerInputType } from "./HandlerInputType";

export interface ISkyboxHandlerInput {
  type: HandlerInputType.Skybox;
  strapName: string;
  sourceId: Strap;
  articleCount: number;
}
