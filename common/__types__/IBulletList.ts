import { ContentBlockType } from "./ContentBlockType";
import { IBulletItem } from "./IBulletItem";

export interface IBulletList {
  type: ContentBlockType.BulletList;
  items: IBulletItem[];
}
