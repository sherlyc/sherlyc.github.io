import groupTwoTopStories from './group-two';
import { IParams } from '../../__types__/IParams';
import { ITopStoriesArticleListGroupTwoHandlerInput } from '../__types__/ITopStoriesArticleListGroupTwo';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { IRawArticle } from '../../adapters/__types__/IRawArticle';
import * as layoutRetriever from '../../adapters/layout-retriever';
import { LayoutType } from '../../adapters/__types__/LayoutType';
import { getRawArticles } from '../../adapters/article-retriever/article-retriever';
import { IGrayDefconArticleUnit } from '../../../../common/__types__/IGrayDefconArticleUnit';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IBigImageArticleUnit } from '../../../../common/__types__/IBigImageArticleUnit';
import { IHalfWidthImageArticleUnit } from '../../../../common/__types__/IHalfWidthImageArticleUnit';

jest.mock('../../adapters/article-retriever/article-retriever');

describe('Group two top stories', () => {
  const handlerRunner = jest.fn();
  const params: IParams = { apiRequestId: '123123' };
  const strapName = 'TopStories';

  const basicAdUnit = {
    type: 'BasicAdUnit',
    context: strapName
  };

  const articleOne: IRawArticle = {
    id: '1',
    indexHeadline: 'Article One',
    introText: 'Article One Intro',
    linkUrl: '/link1',
    imageSrc: 'article.jpg',
    imageSrcSet: 'article.jpg 1w',
    defconSrc: 'defcon.jpg',
    strapImageSrc: 'strap1.jpg',
    strapImageSrcSet: 'strap1.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleTwo: IRawArticle = {
    id: '2',
    indexHeadline: 'An Article',
    introText: 'Article Text',
    linkUrl: '/link2',
    imageSrc: 'article.jpg',
    imageSrcSet: 'article.jpg 1w',
    defconSrc: null,
    strapImageSrc: 'strap2.jpg',
    strapImageSrcSet: 'strap2.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleOneAsGrayDefconArticle: IGrayDefconArticleUnit = {
    type: ContentBlockType.GrayDefconArticleUnit,
    id: '1',
    strapName,
    indexHeadline: 'Article One',
    introText: 'Article One Intro',
    linkUrl: '/link1',
    imageSrc: 'defcon.jpg',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleTwoAsGrayDefconArticle: IGrayDefconArticleUnit = {
    type: ContentBlockType.GrayDefconArticleUnit,
    id: '2',
    strapName,
    indexHeadline: 'An Article',
    introText: 'Article Text',
    linkUrl: '/link2',
    imageSrc: 'defcon.jpg',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleOneAsBigImageArticle: IBigImageArticleUnit = {
    type: ContentBlockType.BigImageArticleUnit,
    id: '1',
    strapName,
    indexHeadline: 'Article One',
    introText: 'Article One Intro',
    linkUrl: '/link1',
    imageSrc: 'strap1.jpg',
    imageSrcSet: 'strap1.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleTwoAsBigImageArticle: IBigImageArticleUnit = {
    type: ContentBlockType.BigImageArticleUnit,
    id: '2',
    strapName,
    indexHeadline: 'An Article',
    introText: 'Article Text',
    linkUrl: '/link2',
    imageSrc: 'strap2.jpg',
    imageSrcSet: 'strap2.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleOneAsHalfWidthImageArticle: IHalfWidthImageArticleUnit = {
    type: ContentBlockType.HalfWidthImageArticleUnit,
    id: '1',
    strapName,
    indexHeadline: 'Article One',
    introText: 'Article One Intro',
    linkUrl: '/link1',
    imageSrc: 'strap1.jpg',
    imageSrcSet: 'strap1.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  it(
    'should swap 1st and 2nd article and render the first 3 as big image and others as half width articles ' +
      'when layout is default',
    async () => {
      jest
        .spyOn(layoutRetriever, 'layoutRetriever')
        .mockResolvedValue(LayoutType.DEFAULT);

      const expectedArticles = [
        basicAdUnit,
        articleTwoAsBigImageArticle,
        basicAdUnit,
        articleOneAsBigImageArticle,
        basicAdUnit,
        articleOneAsBigImageArticle,
        basicAdUnit,
        articleOneAsHalfWidthImageArticle,
        basicAdUnit,
        articleOneAsHalfWidthImageArticle,
        basicAdUnit,
        articleOneAsHalfWidthImageArticle,
        basicAdUnit
      ];
      const rawArticles = [
        articleOne,
        articleTwo,
        articleOne,
        articleOne,
        articleOne,
        articleOne
      ];
      (getRawArticles as jest.Mock).mockResolvedValue(rawArticles);

      const handlerInput: ITopStoriesArticleListGroupTwoHandlerInput = {
        type: HandlerInputType.TopStoriesArticleListGroupTwo,
        strapName,
        totalArticles: 6
      };
      const result = await groupTwoTopStories(
        handlerRunner,
        handlerInput,
        params
      );

      expect(result).toEqual(expectedArticles);
    }
  );

  it(
    'should render the 1st article as defcon, 2nd and 3rd as big image and others as half width articles ' +
      'when layout is defcon',
    async () => {
      jest
        .spyOn(layoutRetriever, 'layoutRetriever')
        .mockResolvedValue(LayoutType.DEFCON);

      const expectedArticles = [
        basicAdUnit,
        articleOneAsGrayDefconArticle,
        basicAdUnit,
        articleTwoAsBigImageArticle,
        basicAdUnit,
        articleOneAsBigImageArticle,
        basicAdUnit,
        articleOneAsHalfWidthImageArticle,
        basicAdUnit,
        articleOneAsHalfWidthImageArticle,
        basicAdUnit,
        articleOneAsHalfWidthImageArticle,
        basicAdUnit
      ];
      const rawArticles = [
        articleOne,
        articleTwo,
        articleOne,
        articleOne,
        articleOne,
        articleOne
      ];
      (getRawArticles as jest.Mock).mockResolvedValue(rawArticles);

      const handlerInput: ITopStoriesArticleListGroupTwoHandlerInput = {
        type: HandlerInputType.TopStoriesArticleListGroupTwo,
        strapName,
        totalArticles: 6
      };
      const result = await groupTwoTopStories(
        handlerRunner,
        handlerInput,
        params
      );

      expect(result).toEqual(expectedArticles);
    }
  );
});
