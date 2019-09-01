import { IJsonFeedArticle } from '../__types__/IJsonFeedArticle';
import { IJsonFeedUrl } from '../__types__/IJsonFeedUrl';
import { JsonFeedImageType } from '../__types__/JsonFeedImageType';
import { IImageVariant } from '../__types__/IImageVariant';

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

export function getDefconSrc(
  item: IJsonFeedArticle | IJsonFeedUrl
): string | null {
  const image =
    findImage(item, JsonFeedImageType.DEFCON_IMAGE) ||
    findImage(item, JsonFeedImageType.STRAP_IMAGE) ||
    findImage(item, JsonFeedImageType.SMALL_THUMBNAIL);

  return image ? image.src : null;
}

export function getImageSrc(
  item: IJsonFeedArticle | IJsonFeedUrl,
  type: JsonFeedImageType
): string | null {
  const image = findImage(item, type);

  return image ? image.src : null;
}

function getImageWidth(dimensions: string) {
  return `${dimensions.split('x')[0]}w`;
}

function getImageSrcSetString(imageUrls: Object[]) {
  return Object.entries(imageUrls)
    .map(([size, src]) => `${src} ${getImageWidth(size)}`)
    .join(', ');
}

export function getImageSrcSet(
  item: IJsonFeedArticle | IJsonFeedUrl,
  type: JsonFeedImageType) {
  const images = findImage(item, type);

  return images && images.urls ? getImageSrcSetString(images.urls) : null;
}
