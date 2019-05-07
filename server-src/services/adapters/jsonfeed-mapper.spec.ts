import * as jsonfeed from './__fixtures__/jsonfeed.json';
import * as rawArticle from './__fixtures__/raw-article-list.json';
import map from './jsonfeed-mapper';
import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import { cloneDeep } from 'lodash';
import { IRawArticle } from './__types__/IRawArticle';

describe('JsonFeed Mapper', () => {
  it('should map jsonfeed to rawArticle json format', () => {
    const data: IJsonFeedArticleList = cloneDeep(
      jsonfeed as IJsonFeedArticleList
    );
    expect(map(data.stories)).toEqual(rawArticle);
  });

  it('should handle empty image value', () => {
    const data: IJsonFeedArticleList = cloneDeep(
      jsonfeed as IJsonFeedArticleList
    );
    data.stories.forEach((story) => {
      story.images = [];
    });

    const expected: IRawArticle[] = cloneDeep(rawArticle);
    Object.values(expected).forEach((article: IRawArticle) => {
      article.imageSrc = null;
    });
    expect(map(data.stories)).toEqual(expected);
  });

  it('should get Strap Image', () => {
    const data: IJsonFeedArticleList = cloneDeep(
      jsonfeed as IJsonFeedArticleList
    );
    const result = map(data.stories);
    const strapImageUrl =
      'https://resources.stuff.co.nz/content/dam/images/1/t/g/v/e/d/image.related.StuffLandscapeThreeByTwo.300x200.1tgvdg.png/1547607024623.jpg';
    expect(result[0].imageSrc).toBe(strapImageUrl);
  });
});
