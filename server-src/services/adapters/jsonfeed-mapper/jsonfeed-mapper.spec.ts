import * as jsonfeed from '../__fixtures__/jsonfeed/jsonfeed.json';
import * as rawArticles from '../__fixtures__/jsonfeed/raw-article-list.json';
import * as temporaryRawArticles from '../__fixtures__/jsonfeed/temporal-raw-articles.json';
import map from './jsonfeed-mapper';
import { IJsonFeedArticleList } from '../__types__/IJsonFeedArticleList';
import { cloneDeep } from 'lodash';
import { IRawArticle } from '../__types__/IRawArticle';
import { HeadlineFlags } from '../../../../common/HeadlineFlags';
import { JsonFeedImageType } from '../__types__/JsonFeedImageType';

describe('JsonFeed Mapper', () => {
  it('should map jsonfeed articles and url assets to rawArticles json format', () => {
    const data: IJsonFeedArticleList = cloneDeep(
      jsonfeed as IJsonFeedArticleList
    );
    expect(map(data.stories)).toEqual(rawArticles);
  });

  it('should map jsonfeed articles and url assets alt headline to spade index headline based on flag', () => {
    const data: IJsonFeedArticleList = cloneDeep(
      jsonfeed as IJsonFeedArticleList
    );
    data.stories[0].isHeadlineOverrideApplied = true;
    data.stories[0].alt_headline = 'article alt headline';

    data.stories[1].isHeadlineOverrideApplied = true;
    data.stories[1].alt_headline = 'url alt headline';

    expect(map(data.stories)).toEqual(temporaryRawArticles);
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

    it('should always get strap image', () => {
      const data: IJsonFeedArticleList = cloneDeep(
        jsonfeed as IJsonFeedArticleList
      );
      const result = map(data.stories);
      const strapImageUrl =
        'https://resources.stuff.co.nz/content/dam/images' +
        '/1/t/g/v/e/d/image.related.StuffLandscapeThreeByTwo.300x200.1tgvdg.png/1547607024623.jpg';
      expect(result[0].imageSrc).toBe(strapImageUrl);
    });

    it('should return thumbnail image when strap image is not provided', () => {
      const data: IJsonFeedArticleList = cloneDeep(
        jsonfeed as IJsonFeedArticleList
      );
      const result = map(data.stories);
      const thumbnailImageUrl =
        'https://resources.stuff.co.nz/content/dam/images/1/1/z/4/7/q/image.related.StuffThumbnail.90x60.11z4e0.png/1439844947411.jpg';
      expect(result[3].imageSrc).toBe(thumbnailImageUrl);
    });

    it('should generate image source set', () => {
      const data: IJsonFeedArticleList = cloneDeep(
        jsonfeed as IJsonFeedArticleList
      );

      const result = map(data.stories);

      const imageSourceSet =
        'https://resources.stuff.co.nz/content/dam/images/1/t/g/v/e/d/' +
        'image.related.StuffLandscapeThreeByTwo.300x200.1tgvdg.png/1547607024623.jpg 300w, ' +
        'https://resources.stuff.co.nz/content/dam/images/1/t/g/v/e/d/' +
        'image.related.StuffLandscapeThreeByTwo.600x400.1tgvdg.png/1547607024623.jpg 600w';
      expect(result[0].imageSrcSet).toBe(imageSourceSet);
    });

    it('should generate image source set from next image in the same article when first image does not have strap variant', () => {
      const data: IJsonFeedArticleList = cloneDeep(
        jsonfeed as IJsonFeedArticleList
      );

      const variantsWithoutStrapImage = data.stories[0].images[0].variants.filter(
        (variant: any) => variant.layout !== JsonFeedImageType.STRAP_IMAGE
      );

      data.stories[0].images[0].variants = variantsWithoutStrapImage;

      const result = map(data.stories);

      const imageSourceSet =
        'https://resources.stuff.co.nz/1547607024623.jpg 300w, ' +
        'https://resources.stuff.co.nz/1547607024623.jpg 600w';
      expect(result[0].imageSrcSet).toBe(imageSourceSet);
    });

    it('should fallback to strap image when defcon image is not provided', () => {
      const data: IJsonFeedArticleList = cloneDeep(
        jsonfeed as IJsonFeedArticleList
      );

      const variantsWithoutDefcon = data.stories[0].images[0].variants.filter(
        (variant: any) => variant.layout !== JsonFeedImageType.DEFCON_IMAGE
      );

      data.stories[0].images[0].variants = variantsWithoutDefcon;

      const variantsOnlyHaveStrap = data.stories[0].images[0].variants.find(
        (variant: any) => variant.layout === JsonFeedImageType.STRAP_IMAGE
      );

      const result = map(data.stories);

      expect(result[0].defconSrc).toBe(variantsOnlyHaveStrap.src);
    });

    it('should fallback to thumbnail image when defcon image and strap images are not provided', () => {
      const data: IJsonFeedArticleList = cloneDeep(
        jsonfeed as IJsonFeedArticleList
      );

      const variantsOnlyHaveThumbnail = data.stories[0].images[0].variants.find(
        (variant: any) => variant.layout === JsonFeedImageType.SMALL_THUMBNAIL
      );

      data.stories[0].images = [
        {
          variants: [variantsOnlyHaveThumbnail]
        }
      ];

      const articles = map(data.stories);
      expect(articles[0].defconSrc).toBe(variantsOnlyHaveThumbnail.src);
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
