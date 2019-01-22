import * as jsonfeed from './fixtures/jsonfeed.json';
import * as standard from './fixtures/standard.json';
import map from '../jsonFeed.mapper';
import { IJsonFeedArticleList } from '../../interfaces/IJsonFeedArticleList';
import { cloneDeep } from 'lodash';
import { IRawArticleList } from '../../interfaces/IRawArticleList';
import { IRawArticle } from '../../interfaces/IRawArticle';

describe('JsonFeed Mapper', () => {
  it('should map jsonfeed to standard json format', () => {
    const data: IJsonFeedArticleList = cloneDeep(jsonfeed);
    expect(map(data)).toEqual(standard);
  });

  it('should handle empty image value', () => {
    const data: IJsonFeedArticleList = cloneDeep(jsonfeed);
    data.stories.forEach((story) => {
      story.images = [];
    });

    const expected: IRawArticleList = cloneDeep(standard);
    Object.values(expected).forEach((article: IRawArticle) => {
      article.imageSrc = null;
    });
    expect(map(data)).toEqual(expected);
  });
});
