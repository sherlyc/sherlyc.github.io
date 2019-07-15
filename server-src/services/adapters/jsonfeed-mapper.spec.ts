import * as jsonfeed from './__fixtures__/jsonfeed/jsonfeed.json';
import * as rawArticles from './__fixtures__/jsonfeed/raw-article-list.json';
import map from './jsonfeed-mapper';
import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import { cloneDeep } from 'lodash';
import { IRawArticle } from './__types__/IRawArticle';
import { HeadlineFlags } from '../../../common/HeadlineFlags';

describe('JsonFeed Mapper', () => {
  it('should map jsonfeed articles and url assets to rawArticles json format', () => {
    const data: IJsonFeedArticleList = cloneDeep(
      jsonfeed as IJsonFeedArticleList
    );
    expect(map(data.stories)).toEqual(rawArticles);
  });

  describe('images', () => {
    it('should handle empty image value', () => {
      const data: IJsonFeedArticleList = cloneDeep(
        jsonfeed as IJsonFeedArticleList
      );
      data.stories.forEach((story) => {
        story.images = [];
      });

      const expected: IRawArticle[] = cloneDeep(rawArticles);
      Object.values(expected).forEach((article: IRawArticle) => {
        article.defconSrc = null;
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
        'https://resources.stuff.co.nz/content/dam/images/1/t/g/v/e/d/' +
        'image.related.StuffThumbnail.180x120.1tgvdg.png/1547607024623.jpg 180w';
      expect(result[0].imageSrcSet).toBe(imageSourceSet);
    });

    it('should generate image source set when first image does not have thumbnail variant', () => {
      const data: IJsonFeedArticleList = cloneDeep(
        jsonfeed as IJsonFeedArticleList
      );
      data.stories[0].images[0].variants = data.stories[0].images[0].variants.filter(
        (variant: any) => variant.layout !== 'Small Thumbnail'
      );

      const result = map(data.stories);

      const imageSourceSet =
        'https://resources.stuff.co.nz/1547607024623.jpg 90w, ' +
        'https://resources.stuff.co.nz/1547607024623.jpg 180w';
      expect(result[0].imageSrcSet).toBe(imageSourceSet);
    });
  });

  describe('headline flags', () => {
    it('should include sponsored flag in headline flags when sponsored field is true', () => {
      const data: IJsonFeedArticleList = cloneDeep(
        jsonfeed as IJsonFeedArticleList
      );
      data.stories.forEach((story) => {
        story.sponsored = true;
        story.headline_flags = [HeadlineFlags.PHOTO];
      });

      const result = map(data.stories);

      result.forEach((article) => {
        expect(
          article.headlineFlags.includes(HeadlineFlags.PHOTO)
        ).toBeTruthy();
        expect(
          article.headlineFlags.includes(HeadlineFlags.SPONSORED)
        ).toBeTruthy();
      });
    });

    it('should not include sponsored flag in headline flags when sponsored field is false', () => {
      const data: IJsonFeedArticleList = cloneDeep(
        jsonfeed as IJsonFeedArticleList
      );
      data.stories.forEach((story) => {
        story.sponsored = false;
        story.headline_flags = [HeadlineFlags.VIDEO];
      });

      const result = map(data.stories);

      result.forEach((article) => {
        expect(
          article.headlineFlags.includes(HeadlineFlags.VIDEO)
        ).toBeTruthy();
        expect(
          article.headlineFlags.includes(HeadlineFlags.SPONSORED)
        ).toBeFalsy();
      });
    });
  });
});
