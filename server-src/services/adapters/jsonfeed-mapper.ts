import { IJsonFeedArticle } from './__types__/IJsonFeedArticle';
import * as moment from 'moment';
import { IRawArticle } from './__types__/IRawArticle';
import { JsonFeedImageType } from './__types__/JsonFeedImageType';
import { JsonFeedAssetType } from './__types__/JsonFeedAssetType';
import { IJsonFeedUrl } from './__types__/IJsonFeedUrl';
import { IJsonFeedQuery } from './__types__/IJsonFeedQuery';
import { IImageVariant } from './__types__/IImageVariant';

export default (
  articles: Array<IJsonFeedArticle | IJsonFeedUrl | IJsonFeedQuery>
): IRawArticle[] => {
  return articles
    .map((article) => {
      if (article.asset_type === JsonFeedAssetType.ARTICLE) {
        return mapArticleAsset(article);
      } else if (article.asset_type === JsonFeedAssetType.URL) {
        return mapUrlAsset(article);
      }
    })
    .filter(Boolean) as IRawArticle[];
};

function mapArticleAsset(item: IJsonFeedArticle): IRawArticle {
  return {
    id: String(item.id),
    indexHeadline: item.alt_headline,
    introText: item.alt_intro,
    linkUrl: item.path,
    imageSrc: getImageSrc(item),
    imageSrcSet: getImageSrcSet(item),
    lastPublishedTime: moment(item.datetime_iso8601).unix(),
    headlineFlags: item.headline_flags ? item.headline_flags : []
  };
}

function mapUrlAsset(item: IJsonFeedUrl): IRawArticle {
  return {
    id: String(item.id),
    indexHeadline: item.title,
    introText: item.alt_intro,
    linkUrl: item.url,
    imageSrc: getImageSrc(item),
    imageSrcSet: getImageSrcSet(item),
    lastPublishedTime: moment(item.datetime_iso8601).unix(),
    headlineFlags: item.headline_flags ? item.headline_flags : []
  };
}

function getImageWidth(key: string) {
  return `${key.split('x')[0]}w`;
}

function getImageSrcSet(item: IJsonFeedArticle | IJsonFeedUrl) {
  const thumbnailImages = findThumbnailImage(item);
  if (thumbnailImages) {
    const imageUrls = thumbnailImages.urls;
    return Object.entries(imageUrls)
      .map(([size, src]) => `${src} ${getImageWidth(size)}`)
      .join(', ');
  }
  return null;
}

function getImageSrc(item: IJsonFeedArticle | IJsonFeedUrl): string | null {
  const thumbnailImages = findThumbnailImage(item);
  if (thumbnailImages) {
    return thumbnailImages.src;
  }
  return null;
}

function findThumbnailImage(
  item: IJsonFeedArticle | IJsonFeedUrl
): IImageVariant | undefined {
  if (item.images && item.images.length > 0) {
    for (const image of item.images) {
      if (image.variants) {
        return image.variants.find(
          (variant) => variant.layout === JsonFeedImageType.SMALL_THUMBNAIL
        );
      }
    }
  }
  return undefined;
}
