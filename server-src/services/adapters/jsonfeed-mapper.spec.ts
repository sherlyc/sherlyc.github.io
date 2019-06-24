import * as jsonfeed from './__fixtures__/jsonfeed/jsonfeed.json';
import * as rawArticle from './__fixtures__/jsonfeed/raw-article-list.json';
import map from './jsonfeed-mapper';
import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import { cloneDeep } from 'lodash';
import { IRawArticle } from './__types__/IRawArticle';

describe('JsonFeed Mapper', () => {
  it('should map jsonfeed articles and url assets to rawArticle json format', () => {
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
      article.imageSrcSet = null;
    });

    expect(map(data.stories)).toEqual(expected);
  });

  it('should always get thumbnail image', () => {
    const data: IJsonFeedArticleList = cloneDeep(
      jsonfeed as IJsonFeedArticleList
    );
    const result = map(data.stories);
    const thumbnailImageUrl =
      'https://resources.stuff.co.nz/content/dam/images/1/t/g/v/e/d/image.related.StuffThumbnail.90x60.1tgvdg.png/1547607024623.jpg';
    expect(result[0].imageSrc).toBe(thumbnailImageUrl);
  });

  it('should generate image source set', () => {
    const data: IJsonFeedArticleList = cloneDeep(
      jsonfeed as IJsonFeedArticleList
    );

    const result = map(data.stories);

    const imageSourceSet =
      'https://resources.stuff.co.nz/content/dam/images/1/t/g/v/e/d/' +
      'image.related.StuffThumbnail.90x60.1tgvdg.png/1547607024623.jpg 90w, ' +
      'https://resources.stuff.co.nz/content/dam/images/1/t/g/v/e/d/image.related.StuffThumbnail.180x120.1tgvdg.png/1547607024623.jpg 180w';
    expect(result[0].imageSrcSet).toBe(imageSourceSet);
  });
});
