import { IJsonFeedArticleList } from '../interfaces/IJsonFeedArticleList';
import { IRawArticleList } from '../interfaces/IRawArticleList';
import { IJsonFeedArticle } from '../interfaces/IJsonFeedArticle';
import * as moment from 'moment';

export default (jsonfeed: IJsonFeedArticleList): IRawArticleList => {
  return jsonfeed.stories.reduce(
    (final, item) => {
      final[item.id] = {
        id: String(item.id),
        indexHeadline: item.alt_headline,
        introText: item.alt_intro,
        linkUrl: item.path,
        imageSrc: getImageSrc(item),
        displayTime: moment(item.datetime_iso8601).unix()
      };
      return final;
    },
    {} as IRawArticleList
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
