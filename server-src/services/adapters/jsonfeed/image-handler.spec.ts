import * as article from "./__fixtures__/article.json";
import { getImage } from "./image-handler";
import { JsonFeedImageType } from "../__types__/JsonFeedImageType";

describe("Image Handler", () => {
  it("should choose the correct image", function() {
    const result = getImage(article as any, [
      JsonFeedImageType.SMALL_THUMBNAIL_SIXTEEN_BY_NINE,
      JsonFeedImageType.STRAP_IMAGE,
      JsonFeedImageType.SMALL_THUMBNAIL
    ]);
    expect(result).toEqual(
      "https://resources.stuff.co.nz/content/dam/images/1/z/i/g/h/m/image.related.StuffThumbnailSixteenByNine.1600x900.1zigh6.png/1583711118517.jpg"
    );
  });
});
