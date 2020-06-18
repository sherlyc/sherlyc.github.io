import { Logo } from "../Logo";
import { ContentBlockType } from "./ContentBlockType";
import { IBulletItem } from "./IBulletItem";

export interface IBulletList {
  type: ContentBlockType.BulletList;
  logo: Logo;
  logoLink: string;
  items: IBulletItem[];
}
