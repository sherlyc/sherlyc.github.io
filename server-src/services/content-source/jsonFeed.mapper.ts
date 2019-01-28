import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import { IJsonFeedArticle } from './__types__/IJsonFeedArticle';
import * as moment from 'moment';
import { IRawArticle } from '../__types__/IRawArticle';

export default (jsonfeed: IJsonFeedArticleList): IRawArticle[] => {
  return jsonfeed.stories.reduce(
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
};

function getImageSrc(item: IJsonFeedArticle): string | null {
  let imageSrc = null;
  if (item.images && item.images.length > 0) {
    if (item.images[0].variants && item.images[0].variants.length > 0) {
      imageSrc = item.images[0].variants[0].src;
    }
  }
  return imageSrc;
}
