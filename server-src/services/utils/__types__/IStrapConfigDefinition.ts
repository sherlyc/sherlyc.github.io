import { Strap } from "../../strap";
import { IStrapDefinition } from "./IStrapDefinition";

export interface IStrapConfigDefinition {
  baseDedupeList: Strap[];
  homepageStraps: { [key in Strap]: IStrapDefinition };
  overrides?: { [key: string]: { [key in Strap]?: IStrapDefinition } };
}
