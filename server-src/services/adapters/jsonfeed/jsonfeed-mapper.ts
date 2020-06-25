import { getUnixTime, parseISO } from "date-fns";
import { HeadlineFlags } from "../../../../common/HeadlineFlags";
import { IJsonFeedArticle } from "../__types__/IJsonFeedArticle";
import { IJsonFeedQuery } from "../__types__/IJsonFeedQuery";
import { IJsonFeedUrl } from "../__types__/IJsonFeedUrl";
import { IRawArticle } from "../__types__/IRawArticle";
import { JsonFeedAssetType } from "../__types__/JsonFeedAssetType";
import { JsonFeedImageType } from "../__types__/JsonFeedImageType";
import {
  getImage,
  getStrapImageSrcSet,
  getThumbnailSrcSet
} from "./image-handler";

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
    imageSrc: getImage(item, [JsonFeedImageType.THUMBNAIL]),
    imageSrcSet: getThumbnailSrcSet(item),
    strapImageSrc: getImage(item, [
      JsonFeedImageType.LANDSCAPE_THREE_BY_TWO,
      JsonFeedImageType.THUMBNAIL
    ]),
    strapImageSrcSet: getStrapImageSrcSet(item),
    defconSrc: getImage(item, [
      JsonFeedImageType.DEFCON,
      JsonFeedImageType.LANDSCAPE_THREE_BY_TWO,
      JsonFeedImageType.THUMBNAIL
    ]),
    sixteenByNineSrc: getImage(item, [
      JsonFeedImageType.THUMBNAIL_SIXTEEN_BY_NINE,
      JsonFeedImageType.LANDSCAPE_THREE_BY_TWO,
      JsonFeedImageType.THUMBNAIL
    ]),
    portraitImageSrc: getImage(item, [
      JsonFeedImageType.THUMBNAIL_SQUARE,
      JsonFeedImageType.THUMBNAIL_SIXTEEN_BY_NINE,
      JsonFeedImageType.THUMBNAIL
    ]),
    lastPublishedTime: getUnixTime(parseISO(item.datetime_iso8601)),
    headlineFlags: getHeadlineFlags(item),
    identifier: item.identifier ? item.identifier : undefined,
    category: item["section-home"],
    categoryUrl: getCategoryUrl(String(item.id), item.path)
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
    imageSrc: getImage(item, [JsonFeedImageType.THUMBNAIL]),
    imageSrcSet: getThumbnailSrcSet(item),
    strapImageSrc: getImage(item, [
      JsonFeedImageType.LANDSCAPE_THREE_BY_TWO,
      JsonFeedImageType.THUMBNAIL
    ]),
    strapImageSrcSet: getStrapImageSrcSet(item),
    defconSrc: getImage(item, [
      JsonFeedImageType.DEFCON,
      JsonFeedImageType.LANDSCAPE_THREE_BY_TWO,
      JsonFeedImageType.THUMBNAIL
    ]),
    sixteenByNineSrc: getImage(item, [
      JsonFeedImageType.THUMBNAIL_SIXTEEN_BY_NINE,
      JsonFeedImageType.LANDSCAPE_THREE_BY_TWO,
      JsonFeedImageType.THUMBNAIL
    ]),
    portraitImageSrc: getImage(item, [
      JsonFeedImageType.PORTRAIT,
      JsonFeedImageType.THUMBNAIL_SIXTEEN_BY_NINE,
      JsonFeedImageType.THUMBNAIL
    ]),
    lastPublishedTime: getUnixTime(parseISO(item.datetime_iso8601)),
    headlineFlags: getHeadlineFlags(item),
    identifier: item.identifier ? item.identifier : undefined,
    category: item["section-home"],
    categoryUrl: getCategoryUrl(String(item.id), item.path)
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

export function getCategoryUrl(articleId: string, path: string) {
  return path.split(articleId)[0];
}
