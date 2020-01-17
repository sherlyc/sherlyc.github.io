import { IJsonFeedArticle } from "../__types__/IJsonFeedArticle";
import { IJsonFeedUrl } from "../__types__/IJsonFeedUrl";
import { JsonFeedImageType } from "../__types__/JsonFeedImageType";
import { IImageVariant } from "../__types__/IImageVariant";

function findImage(
  item: IJsonFeedArticle | IJsonFeedUrl,
  imageType: JsonFeedImageType
): IImageVariant | undefined {
  if (item.images && item.images.length > 0) {
    for (const image of item.images) {
      if (image.variants && image.variants.length > 0) {
        const imageVariant = image.variants.find(
          (variant) => variant.layout === imageType
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
      final || findImage(item, imageType),
    undefined
  );
  return image ? findLargestRendition(image) : null;
}

function findLargestRendition(imageVariant: IImageVariant) {
  let rendition = "";
  let maxPixelCount = 0;
  Object.keys(imageVariant.urls).forEach((key) => {
    const [width, height] = key.split("x");
    const pixelCount = parseInt(width, 10) * parseInt(height, 10);
    if (pixelCount > maxPixelCount) {
      rendition = key;
      maxPixelCount = pixelCount;
    }
  });
  return imageVariant.urls[rendition];
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
  const images = findImage(item, JsonFeedImageType.SMALL_THUMBNAIL);

  return images && images.urls ? getImageSrcSetString(images.urls) : null;
}

export function getStrapImageSrcSet(item: IJsonFeedArticle | IJsonFeedUrl) {
  const images =
    findImage(item, JsonFeedImageType.STRAP_IMAGE) ||
    findImage(item, JsonFeedImageType.SMALL_THUMBNAIL);

  return images && images.urls ? getImageSrcSetString(images.urls) : null;
}
