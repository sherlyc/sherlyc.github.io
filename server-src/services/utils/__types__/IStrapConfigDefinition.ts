import { IStrapDefinition } from "./IStrapDefinition";
import { Strap } from "../../strap";

export interface IStrapConfigDefinition {
  baseDedupeList: Strap[];
  homepageStraps: { [key in Strap]: IStrapDefinition };
  overrides?: { [key: string]: { [key in Strap]?: IStrapDefinition } };
}
