import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { Logo } from "../../../../common/Logo";
import { IBulletItem } from "../../../../common/__types__/IBulletItem";
import { IBulletList } from "../../../../common/__types__/IBulletList";

export const bulletList = (
  logo: Logo,
  bulletItems: IBulletItem[]
): IBulletList => ({
  type: ContentBlockType.BulletList,
  logo,
  items: bulletItems,
});
