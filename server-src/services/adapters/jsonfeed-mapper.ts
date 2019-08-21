import { IJsonFeedArticle } from './__types__/IJsonFeedArticle';
import * as moment from 'moment';
import { IRawArticle } from './__types__/IRawArticle';
import { JsonFeedImageType } from './__types__/JsonFeedImageType';
import { JsonFeedAssetType } from './__types__/JsonFeedAssetType';
import { IJsonFeedUrl } from './__types__/IJsonFeedUrl';
import { IJsonFeedQuery } from './__types__/IJsonFeedQuery';
import { IImageVariant } from './__types__/IImageVariant';
import { HeadlineFlags } from '../../../common/HeadlineFlags';

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
    indexHeadline: item.isHeadlineOverrideApplied
      ? item.alt_headline
      : item.title,
    introText: item.alt_intro,
    linkUrl: item.path,
    imageSrc: getImageSrc(item),
    imageSrcSet: getImageSrcSet(item),
    defconSrc: getDefconSrc(item),
    lastPublishedTime: moment(item.datetime_iso8601).unix(),
    headlineFlags: getHeadlineFlags(item)
  };
}

function mapUrlAsset(item: IJsonFeedUrl): IRawArticle {
  return {
    id: String(item.id),
    indexHeadline: item.isHeadlineOverrideApplied
      ? item.alt_headline
      : item.title,
    introText: item.alt_intro,
    linkUrl: getLinkUrl(item),
    imageSrc: getImageSrc(item),
    imageSrcSet: getImageSrcSet(item),
    defconSrc: getDefconSrc(item),
    lastPublishedTime: moment(item.datetime_iso8601).unix(),
    headlineFlags: getHeadlineFlags(item)
  };
}

function getLinkUrl(item: IJsonFeedUrl) {
  const { url } = item;
  const linkUrl = url.toLowerCase();

  if (linkUrl.includes('www.stuff.co.nz')) {
    return url.replace('www.stuff.co.nz', 'i.stuff.co.nz');
  }
  return url;
}

function getHeadlineFlags(asset: IJsonFeedArticle | IJsonFeedUrl) {
  const flags = asset.headline_flags ? asset.headline_flags : [];
  return asset.sponsored ? flags.concat(HeadlineFlags.SPONSORED) : flags;
}

function getImageWidth(dimensions: string) {
  return `${dimensions.split('x')[0]}w`;
}

function getImageSrcSet(item: IJsonFeedArticle | IJsonFeedUrl) {
  const thumbnailImages = findImage(item, JsonFeedImageType.SMALL_THUMBNAIL);
  if (thumbnailImages && thumbnailImages.urls) {
    const imageUrls = thumbnailImages.urls;
    return Object.entries(imageUrls)
      .map(([size, src]) => `${src} ${getImageWidth(size)}`)
      .join(', ');
  }
  return null;
}

function getImageSrc(item: IJsonFeedArticle | IJsonFeedUrl): string | null {
  const thumbnailImages = findImage(item, JsonFeedImageType.SMALL_THUMBNAIL);
  if (thumbnailImages) {
    return thumbnailImages.src;
  }
  return null;
}

function getDefconSrc(item: IJsonFeedArticle | IJsonFeedUrl): string | null {
  const defconImage = findImage(item, JsonFeedImageType.DEFCON_IMAGE);
  if (defconImage) {
    return defconImage.src;
  } else {
    const standardImage = findImage(item, JsonFeedImageType.STANDARD_IMAGE);
    if (standardImage) {
      return standardImage.src;
    }
  }
  return null;
}

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
