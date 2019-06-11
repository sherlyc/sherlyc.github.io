import { IJsonFeedArticle } from './__types__/IJsonFeedArticle';
import * as moment from 'moment';
import { IRawArticle } from './__types__/IRawArticle';
import { JsonFeedImageType } from './__types__/JsonFeedImageType';
import { JsonFeedAssetType } from './__types__/JsonFeedAssetType';
import { IJsonFeedUrl } from './__types__/IJsonFeedUrl';

export default (
  articles: Array<IJsonFeedArticle | IJsonFeedUrl>
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
    lastPublishedTime: moment(item.datetime_iso8601).unix(),
    headlineFlags: []
  };
}

function mapUrlAsset(item: IJsonFeedUrl): IRawArticle {
  return {
    id: String(item.id),
    indexHeadline: item.title,
    introText: item.alt_intro,
    linkUrl: item.url,
    imageSrc: getImageSrc(item),
    lastPublishedTime: moment(item.datetime_iso8601).unix(),
    headlineFlags: []
  };
}

function getImageSrc(item: IJsonFeedArticle | IJsonFeedUrl): string | null {
  if (item.images && item.images.length > 0) {
    for (const image of item.images) {
      if (image.variants) {
        for (const variant of image.variants) {
          if (variant.layout === JsonFeedImageType.STRAP_IMAGE) {
            return variant.src;
          }
        }
      }
    }
  }
  return null;
}
