import { IJsonFeedArticle } from './__types__/IJsonFeedArticle';
import * as moment from 'moment';
import { IRawArticle } from './__types__/IRawArticle';
import { JsonFeedImageType } from './__types__/JsonFeedImageType';
import { JsonFeedAssetType } from './__types__/JsonFeedAssetType';

export default (articles: IJsonFeedArticle[]): IRawArticle[] => {
  const mappedArticles = mapArticleAssets(articles);
  const mappedUrlAssets = mapUrlAssets(articles);
  return [...mappedArticles, ...mappedUrlAssets];
};

function mapArticleAssets(articles: IJsonFeedArticle[]) {
  return articles
    .filter((article) => article.asset_type === JsonFeedAssetType.ARTICLE)
    .reduce(
      (final, item) => {
        final.push({
          id: String(item.id),
          indexHeadline: item.alt_headline,
          introText: item.alt_intro,
          linkUrl: item.path,
          imageSrc: getImageSrc(item),
          lastPublishedTime: moment(item.datetime_iso8601).unix(),
          headlineFlags: []
        });
        return final;
      },
      [] as IRawArticle[]
    );
}

function mapUrlAssets(articles: IJsonFeedArticle[]) {
  return articles
    .filter((article) => article.asset_type === JsonFeedAssetType.URL)
    .reduce(
      (final, item) => {
        final.push({
          id: String(item.id),
          indexHeadline: item.title,
          introText: item.alt_intro,
          linkUrl: item.url,
          imageSrc: getImageSrc(item),
          lastPublishedTime: moment(item.datetime_iso8601).unix(),
          headlineFlags: []
        });
        return final;
      },
      [] as IRawArticle[]
    );
}

function getImageSrc(item: IJsonFeedArticle): string | null {
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
