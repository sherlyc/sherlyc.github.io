import * as jsonfeed from '../__fixtures__/jsonfeed/jsonfeed.json';
import * as rawArticles from '../__fixtures__/jsonfeed/raw-article-list.json';
import * as temporaryRawArticles from '../__fixtures__/jsonfeed/temporal-raw-articles.json';
import { mapToRawArticleList } from './jsonfeed-mapper';
import { IJsonFeedArticleList } from '../__types__/IJsonFeedArticleList';
import { cloneDeep } from 'lodash';
import { IRawArticle } from '../__types__/IRawArticle';
import { HeadlineFlags } from '../../../../common/HeadlineFlags';
import { JsonFeedImageType } from '../__types__/JsonFeedImageType';
import * as moment from 'moment';
import { IJsonFeedArticle } from '../__types__/IJsonFeedArticle';
import { JsonFeedAssetType } from '../__types__/JsonFeedAssetType';

describe('JsonFeed Mapper', () => {
  const jsonFeedArticle = (): IJsonFeedArticle => ({
    id: 109962196,
    asset_type: JsonFeedAssetType.ARTICLE,
    headline_flags: [],
    sponsored: false,
    path: '/national/109962196/cctv-shows-unruly-travelling-family-taking-christmas-tree-from-auckland-caltex',
    url: 'http://www.stuff.co.nz/_json/national/109962196/cctv-shows-unruly-travelling-family-taking-christmas-tree-from-auckland-caltex',
    section: 'National',
    'section-home': 'National',
    'section-top-level': 'National',
    layout: 'landscape-image',
    title: 'CCTV shows unruly travelling family taking Christmas tree from Auckland Caltex',
    alt_headline: 'Not even Christmas is safe',
    isHeadlineOverrideApplied: true,
    datetime_iso8601: '20190116T154002+1300',
    datetime_display: '15:40 16/01/2019',
    byline: 'BRAD FLAHIVE',
    source_code: '1national-newsroom',
    source_name: 'Stuff',
    intro: 'An unruly family travelling New Zealand has been causing mayhem for more than a month, and not even the Christmas trees were safe. ',
    alt_intro: 'Unruly travelling family hit an Auckland Caltex four times. They even took the Christmas tree.',
    body: '<p>Hello</p>',
    images: [],
    videos: [],
    html_assets: [],
    galleries: []
  });

  const rawArticle = (article: IJsonFeedArticle): IRawArticle => ({
    id: `${article.id}`,
    indexHeadline: article.alt_headline,
    title: article.title,
    introText: article.alt_intro,
    linkUrl: article.path,
    defconSrc: null,
    imageSrc: null,
    strapImageSrc: null,
    imageSrcSet: null,
    strapImageSrcSet: null,
    lastPublishedTime: moment(article.datetime_iso8601).unix(),
    headlineFlags: article.headline_flags
  });

  it('should map json feed article to raw article', () => {
    const feedArticle = jsonFeedArticle();
    const expectedArticle = rawArticle(feedArticle);
    expect(mapToRawArticleList([feedArticle])).toEqual([expectedArticle]);
  });

  describe(('article headline'), () => {
    it('should map alt_headline to indexHeadline when override is true', () => {
      const expectedHeadline = 'Alt headline';

      const feedArticle = jsonFeedArticle();
      feedArticle.isHeadlineOverrideApplied = true;
      feedArticle.alt_headline = expectedHeadline;

      const expectedArticle = rawArticle(feedArticle);
      expectedArticle.indexHeadline = expectedHeadline;

      expect(mapToRawArticleList([feedArticle])).toEqual([expectedArticle]);
    });

    it('should map title to indexHeadline when override is false', () => {
      const expectedTitle = 'Title';

      const feedArticle = jsonFeedArticle();
      feedArticle.isHeadlineOverrideApplied = false;
      feedArticle.title = expectedTitle;

      const expectedArticle = rawArticle(feedArticle);
      expectedArticle.indexHeadline = expectedTitle;

      expect(mapToRawArticleList([feedArticle])).toEqual([expectedArticle]);
    });
  });

  describe('images', () => {
    it('should handle empty image value', () => {
      const feedArticle = jsonFeedArticle();
      const data: IJsonFeedArticleList = { stories: [feedArticle] };
      data.stories.forEach((story) => {
        story.images = [];
      });

      const expected: IRawArticle[] = [rawArticle(feedArticle)];

      Object.values(expected).forEach((article: IRawArticle) => {
        article.defconSrc = null;
        article.imageSrc = null;
        article.imageSrcSet = null;
        article.strapImageSrc = null;
        article.strapImageSrcSet = null;
      });

      expect(mapToRawArticleList(data.stories)).toEqual(expected);
    });

    it('should always get thumbnail image', () => {
      const data: IJsonFeedArticleList = cloneDeep(
        jsonfeed as IJsonFeedArticleList
      );
      const result = mapToRawArticleList(data.stories);
      const thumbnailImageUrl =
        'https://resources.stuff.co.nz/content/dam/images/1/t/g/v/e/d/image.related.StuffThumbnail.90x60.1tgvdg.png/1547607024623.jpg';
      expect(result[0].imageSrc).toBe(thumbnailImageUrl);
    });

    it('should return thumbnail image when strap image is not provided', () => {
      const data: IJsonFeedArticleList = cloneDeep(
        jsonfeed as IJsonFeedArticleList
      );
      const result = mapToRawArticleList(data.stories);
      const thumbnailImageUrl =
        'https://resources.stuff.co.nz/content/dam/images/1/1/z/4/7/q/image.related.StuffThumbnail.90x60.11z4e0.png/1439844947411.jpg';
      expect(result[3].imageSrc).toBe(thumbnailImageUrl);
    });

    it('should generate image source set', () => {
      const data: IJsonFeedArticleList = cloneDeep(
        jsonfeed as IJsonFeedArticleList
      );

      const result = mapToRawArticleList(data.stories);

      const imageSourceSet =
        'https://resources.stuff.co.nz/content/dam/images/1/t/g/v/e/d/' +
        'image.related.StuffThumbnail.90x60.1tgvdg.png/1547607024623.jpg 90w, ' +
        'https://resources.stuff.co.nz/content/dam/images/1/t/g/v/e/d/' +
        'image.related.StuffThumbnail.180x120.1tgvdg.png/1547607024623.jpg 180w';
      expect(result[0].imageSrcSet).toBe(imageSourceSet);
    });

    it('should generate image source set from next image in the same article when first image does not have thumbnail variant', () => {
      const data: IJsonFeedArticleList = cloneDeep(
        jsonfeed as IJsonFeedArticleList
      );

      const variantsWithoutThumbnail = data.stories[0].images[0].variants.filter(
        (variant: any) => variant.layout !== JsonFeedImageType.SMALL_THUMBNAIL
      );

      data.stories[0].images[0].variants = variantsWithoutThumbnail;

      const result = mapToRawArticleList(data.stories);

      const imageSourceSet =
        'https://resources.stuff.co.nz/1547607024623.jpg 90w, ' +
        'https://resources.stuff.co.nz/1547607024623.jpg 180w';
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

      const result = mapToRawArticleList(data.stories);

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

      const articles = mapToRawArticleList(data.stories);
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

      const result = mapToRawArticleList(data.stories);

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

      const result = mapToRawArticleList(data.stories);

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
