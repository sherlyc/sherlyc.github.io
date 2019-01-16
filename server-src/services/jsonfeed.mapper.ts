import { IJsonFeedArticleList } from '../interfaces/IJsonFeedArticleList';
import { IRawArticleList } from '../interfaces/IRawArticleList';

export default (jsonfeed: IJsonFeedArticleList): IRawArticleList => {
  return jsonfeed.stories.reduce(
    (final, item) => {
      let imageSrc = '';
      if (item.images && item.images.length > 0) {
        if (item.images[0].variants && item.images[0].variants.length > 0) {
          imageSrc = item.images[0].variants[0].src;
        }
      }
      final[item.id] = {
        id: String(item.id),
        indexHeadline: item.alt_headline,
        introText: item.alt_intro,
        linkUrl: item.path,
        imageSrc,
        displayTime: item.datetime_iso8601
      };
      return final;
    },
    {} as IRawArticleList
  );
};
