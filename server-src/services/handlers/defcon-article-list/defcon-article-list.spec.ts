import { IRawArticle } from '../../adapters/__types__/IRawArticle';
import { IDefconArticleListHandlerInput } from '../__types__/IDefconArticleListHandlerInput';
import { HandlerInputType } from '../__types__/HandlerInputType';
import handlerRunner from '../runner';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IParams } from '../../__types__/IParams';
import defconArticleList from './defcon-article-list';
import { IDefconArticleUnit } from '../../../../common/__types__/IDefconArticleUnit';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { getStrapArticles } from '../../adapters/strap-list-service';
import { Strap } from '../../strap';
import { IBigImageArticleUnit } from '../../../../common/__types__/IBigImageArticleUnit';
import { IHalfWidthImageArticleUnit } from '../../../../common/__types__/IHalfWidthImageArticleUnit';
import { IGrayDefconArticleUnit } from '../../../../common/__types__/IGrayDefconArticleUnit';

jest.mock('../../adapters/strap-list-service');

describe('DefconArticleList', () => {
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
    it('should return first article as defcon and others as basic articles when input is TopStories Strap', async () => {
      const handlerInput: IDefconArticleListHandlerInput = {
        type: HandlerInputType.DefconArticleList,
        sourceId: Strap.TopStories,
        strapName,
        totalArticles: 2,
        variant: 'control'
      };
      const rawArticles = [articleOne, articleTwo];

      (getStrapArticles as jest.Mock).mockResolvedValueOnce(rawArticles);

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
      const error = new Error('failed to retrieve');
      const handlerInput: IDefconArticleListHandlerInput = {
        type: HandlerInputType.DefconArticleList,
        sourceId: Strap.TopStories,
        strapName,
        totalArticles: 2,
        variant: 'control'
      };

      (getStrapArticles as jest.Mock).mockRejectedValue(error);

      await expect(
        defconArticleList(handlerRunner, handlerInput, params)
      ).rejects.toEqual(error);
    });

    it('should return first article as defcon and others as basic articles when input is TopStories Strap', async () => {
      const handlerInput: IDefconArticleListHandlerInput = {
        type: HandlerInputType.DefconArticleList,
        sourceId: Strap.TopStories,
        strapName,
        totalArticles: 2,
        variant: 'control'
      };
      const rawArticles = [articleOne, articleTwo];

      (getStrapArticles as jest.Mock).mockResolvedValueOnce(rawArticles);

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
      const handlerInput: IDefconArticleListHandlerInput = {
        type: HandlerInputType.DefconArticleList,
        sourceId: Strap.TopStories,
        strapName,
        totalArticles: 2,
        variant: 'groupOne'
      };
      const rawArticles = [articleOne, articleTwo];

      (getStrapArticles as jest.Mock).mockResolvedValueOnce(rawArticles);

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
      const handlerInput: IDefconArticleListHandlerInput = {
        type: HandlerInputType.DefconArticleList,
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

      (getStrapArticles as jest.Mock).mockResolvedValueOnce(rawArticles);

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
