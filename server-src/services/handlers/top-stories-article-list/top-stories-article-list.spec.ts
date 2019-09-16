import { IRawArticle } from '../../adapters/__types__/IRawArticle';
import { ITopStoriesArticleListHandlerInput } from '../__types__/ITopStoriesArticleListHandlerInput';
import { HandlerInputType } from '../__types__/HandlerInputType';
import handlerRunner from '../runner';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IParams } from '../../__types__/IParams';
import defconArticleList from './top-stories-article-list';
import { IDefconArticleUnit } from '../../../../common/__types__/IDefconArticleUnit';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { Strap } from '../../strap';
import { IBigImageArticleUnit } from '../../../../common/__types__/IBigImageArticleUnit';
import { IHalfWidthImageArticleUnit } from '../../../../common/__types__/IHalfWidthImageArticleUnit';
import { IGrayDefconArticleUnit } from '../../../../common/__types__/IGrayDefconArticleUnit';
import * as layoutRetriever from '../../../services/adapters/layout-retriever';
import { LayoutType } from '../../adapters/__types__/LayoutType';
import { getRawArticles } from '../../adapters/article-retriever/article-retriever';

jest.mock('../../adapters/article-retriever/article-retriever');

describe('Top Stories Article List', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  const strapName = 'Latest';

  const basicAdUnit = {
    type: 'BasicAdUnit',
    context: strapName
  };

  const articleOne: IRawArticle = {
    id: '1',
    indexHeadline: 'Defcon Headline',
    introText: 'Defcon Intro',
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
    linkUrl: '/link1',
    imageSrc: 'article.jpg',
    imageSrcSet: 'article.jpg 1w',
    defconSrc: null,
    strapImageSrc: 'strap2.jpg',
    strapImageSrcSet: 'strap2.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleOneAsBasicArticle: IBasicArticleUnit = {
    type: ContentBlockType.BasicArticleUnit,
    id: '1',
    strapName: 'Latest',
    indexHeadline: 'Defcon Headline',
    introText: 'Defcon Intro',
    imageSrc: 'article.jpg',
    imageSrcSet: 'article.jpg 1w',
    linkUrl: '/link1',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleOneAsDefconArticle: IDefconArticleUnit = {
    type: ContentBlockType.DefconArticleUnit,
    strapName,
    id: '1',
    indexHeadline: 'Defcon Headline',
    introText: 'Defcon Intro',
    linkUrl: '/link1',
    imageSrc: 'defcon.jpg',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleOneAsGrayDefconArticle: IGrayDefconArticleUnit = {
    type: ContentBlockType.GrayDefconArticleUnit,
    strapName,
    id: '1',
    indexHeadline: 'Defcon Headline',
    introText: 'Defcon Intro',
    linkUrl: '/link1',
    imageSrc: 'defcon.jpg',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleTwoAsBasicArticle: IBasicArticleUnit = {
    type: ContentBlockType.BasicArticleUnit,
    strapName,
    id: '2',
    indexHeadline: 'An Article',
    introText: 'Article Text',
    linkUrl: '/link1',
    imageSrc: 'article.jpg',
    imageSrcSet: 'article.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleTwoAsDefconArticle: IDefconArticleUnit = {
    type: ContentBlockType.DefconArticleUnit,
    id: '2',
    strapName: 'Latest',
    indexHeadline: 'An Article',
    introText: 'Article Text',
    imageSrc: null,
    linkUrl: '/link1',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleTwoAsBigImageArticle: IBigImageArticleUnit = {
    type: ContentBlockType.BigImageArticleUnit,
    strapName,
    id: '2',
    indexHeadline: 'An Article',
    introText: 'Article Text',
    linkUrl: '/link1',
    imageSrc: 'strap2.jpg',
    imageSrcSet: 'strap2.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleAsBigImageArticle: IBigImageArticleUnit = {
    type: ContentBlockType.BigImageArticleUnit,
    strapName,
    id: '1',
    indexHeadline: 'Defcon Headline',
    introText: 'Defcon Intro',
    linkUrl: '/link1',
    imageSrc: 'strap1.jpg',
    imageSrcSet: 'strap1.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleAsHalfWidthImageArticle: IHalfWidthImageArticleUnit = {
    type: ContentBlockType.HalfWidthImageArticleUnit,
    strapName,
    id: '1',
    indexHeadline: 'Defcon Headline',
    introText: 'Defcon Intro',
    linkUrl: '/link1',
    imageSrc: 'strap1.jpg',
    imageSrcSet: 'strap1.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  beforeEach(() => {
    jest.resetModules();
  });

  describe('Control variant', () => {
    it('should swap first and second articles when layout is default', async () => {
      jest
        .spyOn(layoutRetriever, 'layoutRetriever')
        .mockResolvedValue(LayoutType.DEFAULT);

      const handlerInput: ITopStoriesArticleListHandlerInput = {
        type: HandlerInputType.TopStoriesArticleList,
        sourceId: Strap.TopStories,
        strapName,
        totalArticles: 2,
        variant: 'control'
      };
      const rawArticles = [articleOne, articleTwo];

      (getRawArticles as jest.Mock).mockResolvedValueOnce(rawArticles);

      const expectedContentBlocks = [
        articleTwoAsDefconArticle,
        basicAdUnit,
        articleOneAsBasicArticle,
        basicAdUnit
      ];

      const contentBlocks = await defconArticleList(
        handlerRunner,
        handlerInput,
        params
      );

      expect(contentBlocks).toEqual(expectedContentBlocks);
    });

    it('should return first article as defcon and others as basic articles when input is TopStories Strap', async () => {
      jest
        .spyOn(layoutRetriever, 'layoutRetriever')
        .mockResolvedValue(LayoutType.DEFCON);
      const handlerInput: ITopStoriesArticleListHandlerInput = {
        type: HandlerInputType.TopStoriesArticleList,
        sourceId: Strap.TopStories,
        strapName,
        totalArticles: 2,
        variant: 'control'
      };
      const rawArticles = [articleOne, articleTwo];

      (getRawArticles as jest.Mock).mockResolvedValueOnce(rawArticles);

      const expectedContentBlocks = [
        articleOneAsDefconArticle,
        basicAdUnit,
        articleTwoAsBasicArticle,
        basicAdUnit
      ];

      const contentBlocks = await defconArticleList(
        handlerRunner,
        handlerInput,
        params
      );

      expect(contentBlocks).toEqual(expectedContentBlocks);
    });

    it('should throw error when failing to retrieve articles', async () => {
      jest
        .spyOn(layoutRetriever, 'layoutRetriever')
        .mockResolvedValue(LayoutType.DEFCON);
      const error = new Error('failed to retrieve');
      const handlerInput: ITopStoriesArticleListHandlerInput = {
        type: HandlerInputType.TopStoriesArticleList,
        sourceId: Strap.TopStories,
        strapName,
        totalArticles: 2,
        variant: 'control'
      };

      (getRawArticles as jest.Mock).mockRejectedValue(error);

      await expect(
        defconArticleList(handlerRunner, handlerInput, params)
      ).rejects.toEqual(error);
    });

    it('should return first article as defcon and others as basic articles when input is TopStories Strap', async () => {
      jest
        .spyOn(layoutRetriever, 'layoutRetriever')
        .mockResolvedValue(LayoutType.DEFCON);
      const handlerInput: ITopStoriesArticleListHandlerInput = {
        type: HandlerInputType.TopStoriesArticleList,
        sourceId: Strap.TopStories,
        strapName,
        totalArticles: 2,
        variant: 'control'
      };
      const rawArticles = [articleOne, articleTwo];

      (getRawArticles as jest.Mock).mockResolvedValueOnce(rawArticles);

      const expectedContentBlocks = [
        articleOneAsDefconArticle,
        basicAdUnit,
        articleTwoAsBasicArticle,
        basicAdUnit
      ];

      const contentBlocks = await defconArticleList(
        handlerRunner,
        handlerInput,
        params
      );

      expect(contentBlocks).toEqual(expectedContentBlocks);
    });
  });

  describe('Group one variant', () => {
    it('should return first article as gray defcon and others as big image article', async () => {
      jest
        .spyOn(layoutRetriever, 'layoutRetriever')
        .mockResolvedValue(LayoutType.DEFCON);
      const handlerInput: ITopStoriesArticleListHandlerInput = {
        type: HandlerInputType.TopStoriesArticleList,
        sourceId: Strap.TopStories,
        strapName,
        totalArticles: 2,
        variant: 'groupOne'
      };
      const rawArticles = [articleOne, articleTwo];

      (getRawArticles as jest.Mock).mockResolvedValueOnce(rawArticles);

      const expectedContentBlocks = [
        articleOneAsGrayDefconArticle,
        basicAdUnit,
        articleTwoAsBigImageArticle,
        basicAdUnit
      ];

      const contentBlocks = await defconArticleList(
        handlerRunner,
        handlerInput,
        params
      );

      expect(contentBlocks).toEqual(expectedContentBlocks);
    });
  });

  describe('Group two variant', () => {
    it('should return gray defcon, two big image article and 3 half width image article units', async () => {
      jest
        .spyOn(layoutRetriever, 'layoutRetriever')
        .mockResolvedValue(LayoutType.DEFCON);
      const handlerInput: ITopStoriesArticleListHandlerInput = {
        type: HandlerInputType.TopStoriesArticleList,
        sourceId: Strap.TopStories,
        strapName,
        totalArticles: 6,
        variant: 'groupTwo'
      };
      const rawArticles = [
        articleOne,
        articleOne,
        articleOne,
        articleOne,
        articleOne,
        articleOne
      ];

      (getRawArticles as jest.Mock).mockResolvedValueOnce(rawArticles);

      const expectedContentBlocks = [
        articleOneAsGrayDefconArticle,
        basicAdUnit,
        articleAsBigImageArticle,
        basicAdUnit,
        articleAsBigImageArticle,
        basicAdUnit,
        articleAsHalfWidthImageArticle,
        basicAdUnit,
        articleAsHalfWidthImageArticle,
        basicAdUnit,
        articleAsHalfWidthImageArticle,
        basicAdUnit
      ];

      const contentBlocks = await defconArticleList(
        handlerRunner,
        handlerInput,
        params
      );

      expect(contentBlocks).toEqual(expectedContentBlocks);
    });
  });
});
