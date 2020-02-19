import { IRawArticle } from "../__types__/IRawArticle";
import { IBulletItem } from "../../../../common/__types__/IBulletItem";
import { bulletItem } from "./bullet-item.converter";

describe("Bullet Item Converter", () => {
  const article: IRawArticle = {
    id: "1",
    indexHeadline: "Headline 1",
    title: "Title One",
    introText: "Intro 1",
    linkUrl: "/link1",
    defconSrc: null,
    imageSrc: "1.jpg",
    imageSrcSet: "1.jpg 1w",
    strapImageSrc: "strap1.jpg",
    strapImageSrcSet: "strap1.jpg 1w",
    lastPublishedTime: 1,
    headlineFlags: [],
    sixteenByNineSrc: "sixteenByNine.jpg"
  };

  const strapName = "random";
  const bulletColor = "purple";

  const expected: IBulletItem = {
    id: "1",
    strapName,
    linkText: "Headline 1",
    linkUrl: "/link1",
    bulletColor
  };

  it("should convert", () => {
    expect(bulletItem(article, strapName, bulletColor)).toEqual(expected);
  });
});
