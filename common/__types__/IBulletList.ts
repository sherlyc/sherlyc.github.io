import { ContentBlockType } from "./ContentBlockType";
import { IBulletItem } from "./IBulletItem";
import { Logo } from "../Logo";

export interface IBulletList {
  type: ContentBlockType.BulletList;
  logo: Logo;
  logoLink: string;
  items: IBulletItem[];
}
