import { IJsonFeedArticle } from '../__types__/IJsonFeedArticle';
import * as moment from 'moment';
import { IRawArticle } from '../__types__/IRawArticle';
import { JsonFeedAssetType } from '../__types__/JsonFeedAssetType';
import { IJsonFeedUrl } from '../__types__/IJsonFeedUrl';
import { IJsonFeedQuery } from '../__types__/IJsonFeedQuery';
import { HeadlineFlags } from '../../../../common/HeadlineFlags';
import { getDefconSrc, getImageSrc, getImageSrcSet } from './image-handler';

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
