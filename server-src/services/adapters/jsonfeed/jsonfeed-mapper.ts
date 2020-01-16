import { IJsonFeedArticle } from "../__types__/IJsonFeedArticle";
import * as moment from "moment";
import { IRawArticle } from "../__types__/IRawArticle";
import { JsonFeedAssetType } from "../__types__/JsonFeedAssetType";
import { IJsonFeedUrl } from "../__types__/IJsonFeedUrl";
import { IJsonFeedQuery } from "../__types__/IJsonFeedQuery";
import { HeadlineFlags } from "../../../../common/HeadlineFlags";
import {
  getDefconSrc,
  getImage,
  getStrapImageSrc,
  getStrapImageSrcSet,
  getThumbnailSrc,
  getThumbnailSrcSet
} from "./image-handler";
import { JsonFeedImageType } from "../__types__/JsonFeedImageType";

export function mapToRawArticleList(
  articles: Array<IJsonFeedArticle | IJsonFeedUrl | IJsonFeedQuery>
): IRawArticle[] {
  return articles
    .map((article) => {
      if (article.asset_type === JsonFeedAssetType.ARTICLE) {
        return mapArticleAsset(article);
      } else if (article.asset_type === JsonFeedAssetType.URL) {
        return mapUrlAsset(article);
      }
    })
    .filter(Boolean) as IRawArticle[];
}

export function mapArticleAsset(item: IJsonFeedArticle): IRawArticle {
  return {
    id: String(item.id),
    indexHeadline: item.isHeadlineOverrideApplied
      ? item.alt_headline
      : item.title,
    title: item.title,
    introText: item.alt_intro,
    byline: item.byline,
    linkUrl: item.path,
    imageSrc: getThumbnailSrc(item),
    imageSrcSet: getThumbnailSrcSet(item),
    strapImageSrc: getStrapImageSrc(item),
    strapImageSrcSet: getStrapImageSrcSet(item),
    defconSrc: getDefconSrc(item),
    sixteenByNineSrc: getImage(item, [
      JsonFeedImageType.SMALL_THUMBNAIL_SIXTEEN_BY_NINE,
      JsonFeedImageType.STRAP_IMAGE,
      JsonFeedImageType.SMALL_THUMBNAIL
    ]),
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
    title: item.title,
    introText: item.alt_intro,
    linkUrl: getLinkUrl(item),
    imageSrc: getThumbnailSrc(item),
    imageSrcSet: getThumbnailSrcSet(item),
    strapImageSrc: getStrapImageSrc(item),
    strapImageSrcSet: getStrapImageSrcSet(item),
    defconSrc: getDefconSrc(item),
    sixteenByNineSrc: getImage(item, [
      JsonFeedImageType.SMALL_THUMBNAIL_SIXTEEN_BY_NINE,
      JsonFeedImageType.STRAP_IMAGE,
      JsonFeedImageType.SMALL_THUMBNAIL
    ]),
    lastPublishedTime: moment(item.datetime_iso8601).unix(),
    headlineFlags: getHeadlineFlags(item)
  };
}

function getLinkUrl(item: IJsonFeedUrl) {
  const { url } = item;
  const linkUrl = url.toLowerCase();

  if (linkUrl.includes("www.stuff.co.nz")) {
    return url.replace("www.stuff.co.nz", "i.stuff.co.nz");
  }
  return url;
}

function getHeadlineFlags(asset: IJsonFeedArticle | IJsonFeedUrl) {
  const flags = asset.headline_flags ? asset.headline_flags : [];
  return asset.sponsored ? flags.concat(HeadlineFlags.SPONSORED) : flags;
}
