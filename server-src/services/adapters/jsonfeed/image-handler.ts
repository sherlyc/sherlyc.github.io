import { maxBy } from "lodash-es";
import { IImageVariant } from "../__types__/IImageVariant";
import { IJsonFeedArticle } from "../__types__/IJsonFeedArticle";
import { IJsonFeedImage } from "../__types__/IJsonFeedImage";
import { IJsonFeedUrl } from "../__types__/IJsonFeedUrl";
import { JsonFeedImageType } from "../__types__/JsonFeedImageType";

function findImage(
  images: IJsonFeedImage[] | undefined,
  imageType: JsonFeedImageType
): IImageVariant | undefined {
  if (images && images.length > 0) {
    for (const image of images) {
      if (image.variants && image.variants.length > 0) {
        const imageVariant = image.variants.find(
          (variant) => variant.image_type_id === imageType
        );
        if (imageVariant) {
          return imageVariant;
        }
      }
    }
  }
  return undefined;
}

export function getImage(
  item: IJsonFeedArticle | IJsonFeedUrl,
  imageTypePriority: JsonFeedImageType[]
) {
  const image = imageTypePriority.reduce(
    (final: IImageVariant | undefined, imageType) =>
      final ||
      findImage(item.image_overrides, imageType) ||
      findImage(item.images, imageType),
    undefined
  );
  return image ? findLargestRendition(image) : null;
}

function findLargestRendition(imageVariant: IImageVariant) {
  const largestRendition = maxBy(
    Object.keys(imageVariant.urls),
    (rendition) => {
      const [width, height] = rendition.split("x");
      return parseInt(width, 10) * parseInt(height, 10);
    }
  );
  return largestRendition
    ? imageVariant.urls[largestRendition]
    : imageVariant.src;
}

function getImageWidth(dimensions: string) {
  return `${dimensions.split("x")[0]}w`;
}

function getImageSrcSetString(imageUrls: Object) {
  return Object.entries(imageUrls)
    .map(([size, src]) => `${src} ${getImageWidth(size)}`)
    .join(", ");
}

export function getThumbnailSrcSet(item: IJsonFeedArticle | IJsonFeedUrl) {
  const images = findImage(item.images, JsonFeedImageType.THUMBNAIL);

  return images && images.urls ? getImageSrcSetString(images.urls) : null;
}

export function getStrapImageSrcSet(item: IJsonFeedArticle | IJsonFeedUrl) {
  const images =
    findImage(item.images, JsonFeedImageType.LANDSCAPE_THREE_BY_TWO) ||
    findImage(item.images, JsonFeedImageType.THUMBNAIL);

  return images && images.urls ? getImageSrcSetString(images.urls) : null;
}
