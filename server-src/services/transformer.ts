import { IJsonFeedArticleList } from '../interfaces/IJsonFeedArticleList';
import { IRawArticleList } from '../interfaces/IRawArticleList';

export default (jsonfeed: IJsonFeedArticleList): IRawArticleList => {
  return jsonfeed.stories.reduce(
    (final, item) => {
      final[item.id] = {
        id: String(item.id),
        indexHeadline: item.alt_headline,
        introText: item.alt_intro,
        linkUrl: item.path,
        imageSrc: item.images[0].variants[0].src,
        displayTime: item.datetime_iso8601
      };
      return final;
    },
    {} as IRawArticleList
  );
};
