import * as jsonfeed from './__fixtures__/jsonfeed.json';
import * as rawArticle from './__fixtures__/raw-article-list.json';
import map from './jsonfeed-mapper';
import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import { cloneDeep } from 'lodash';
import { IRawArticle } from './__types__/IRawArticle';

describe('JsonFeed Mapper', () => {
  it('should map jsonfeed to rawArticle json format', () => {
    const data: IJsonFeedArticleList = cloneDeep(jsonfeed);
    expect(map(data)).toEqual(rawArticle);
  });

  it('should handle empty image value', () => {
    const data: IJsonFeedArticleList = cloneDeep(jsonfeed);
    data.stories.forEach((story) => {
      story.images = [];
    });

    const expected: IRawArticle[] = cloneDeep(rawArticle);
    Object.values(expected).forEach((article: IRawArticle) => {
      article.imageSrc = null;
    });
    expect(map(data)).toEqual(expected);
  });
});