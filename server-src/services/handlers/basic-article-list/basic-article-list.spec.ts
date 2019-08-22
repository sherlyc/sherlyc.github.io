import basicArticleListHandler from './basic-article-list';
import { getStrapArticles } from '../../adapters/strap-list-service';
import { IParams } from '../../__types__/IParams';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { IRawArticle } from '../../adapters/__types__/IRawArticle';
import { LayoutType } from '../../adapters/__types__/LayoutType';
import { Strap } from '../../strap';
import { Section } from '../../section';
import { getSectionArticleList } from '../../adapters/jsonfeed';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IBasicArticleTitleUnit } from '../../../../common/__types__/IBasicArticleTitleUnit';

jest.mock('../../adapters/jsonfeed');
jest.mock('../../adapters/strap-list-service');

describe('BasicArticleListHandler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  const basicAdUnit = {
    type: 'BasicAdUnit'
  };
  const articleNumberOne = {
    id: '1',
    indexHeadline: 'Headline 1',
    introText: 'Intro 1',
    linkUrl: '/link1',
    defconSrc: null,
    imageSrc: '1.jpg',
    imageSrcSet: '1.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: []
  };
  const articleNumberTwo = {
    id: '2',
    indexHeadline: 'Headline 2',
    introText: 'Intro 2',
    linkUrl: '/link2',
    defconSrc: null,
    imageSrc: '2.jpg',
    imageSrcSet: '2.jpg 2w',
    lastPublishedTime: 2,
    headlineFlags: []
  };
  const rawArticleList: IRawArticle[] = [articleNumberOne, articleNumberTwo];
  const articleNumberOneAsBasicArticle: IBasicArticleUnit = {
    id: '1',
    strapName: 'business',
    headlineFlags: [],
    imageSrc: '1.jpg',
    imageSrcSet: '1.jpg 1w',
    indexHeadline: 'Headline 1',
    introText: 'Intro 1',
    lastPublishedTime: 1,
    linkUrl: '/link1',
    type: ContentBlockType.BasicArticleUnit
  };
  const articleNumberTwoAsBasicArticle: IBasicArticleUnit = {
    id: '2',
    strapName: 'business',
    headlineFlags: [],
    imageSrc: '2.jpg',
    imageSrcSet: '2.jpg 2w',
    indexHeadline: 'Headline 2',
    introText: 'Intro 2',
    lastPublishedTime: 2,
    linkUrl: '/link2',
    type: ContentBlockType.BasicArticleUnit
  };

  const articleNumberOneAsBigImageArticle: IBasicArticleUnit = {
    id: '1',
    strapName: '',
    headlineFlags: [],
    imageSrc: '1.jpg',
    imageSrcSet: '1.jpg 1w',
    indexHeadline: 'Headline 1',
    introText: 'Intro 1',
    lastPublishedTime: 1,
    linkUrl: '/link1',
    type: ContentBlockType.BigImageArticleUnit
  };
  const articleNumberTwoAsBigImageArticle: IBasicArticleUnit = {
    id: '2',
    strapName: '',
    headlineFlags: [],
    imageSrc: '2.jpg',
    imageSrcSet: '2.jpg 2w',
    indexHeadline: 'Headline 2',
    introText: 'Intro 2',
    lastPublishedTime: 2,
    linkUrl: '/link2',
    type: ContentBlockType.BigImageArticleUnit
  };

  const articleNumberTwoAsBasicArticleTitle: IBasicArticleTitleUnit = {
    id: '2',
    strapName: 'business',
    headlineFlags: [],
    indexHeadline: 'Headline 2',
    lastPublishedTime: 2,
    linkUrl: '/link2',
    type: ContentBlockType.BasicArticleTitleUnit
  };

  beforeEach(() => {
    jest.resetModules();
  });

  describe('Control Variant', () => {
    it('should get a list of basic article units and ad units', async () => {
      const totalArticles = 1;
      const totalAdUnits = 2;
      (getSectionArticleList as jest.Mock).mockResolvedValue([
        articleNumberOne
      ]);

      const handlerRunnerMock = jest.fn();

      const contentBlocks = await basicArticleListHandler(
        handlerRunnerMock,
        {
          type: HandlerInputType.ArticleList,
          strapName: 'business',
          sourceId: Section.Business,
          totalBasicArticlesUnit: 1,
          variant: 'control'
        },
        params
      );

      expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);

      const expectedContentBlocks = [
        basicAdUnit,
        articleNumberOneAsBasicArticle,
        basicAdUnit
      ];
      expect(contentBlocks).toEqual(expectedContentBlocks);
    });

    it('should get a list of basic article units and ad units not exceeding the maximum length', async () => {
      const totalArticles = 2;
      const totalAdUnits = 3;
      (getStrapArticles as jest.Mock).mockResolvedValue(rawArticleList);

      const handlerRunnerMock = jest.fn();

      const contentBlocks = await basicArticleListHandler(
        handlerRunnerMock,
        {
          type: HandlerInputType.ArticleList,
          strapName: 'business',
          sourceId: Strap.Business,
          totalBasicArticlesUnit: 2,
          variant: 'control'
        },
        params
      );

      expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);

      const expectedContentBlocks = [
        basicAdUnit,
        articleNumberOneAsBasicArticle,
        basicAdUnit,
        articleNumberTwoAsBasicArticle,
        basicAdUnit
      ];
      expect(contentBlocks).toEqual(expectedContentBlocks);
    });

    it('should get a list of basic article units, basic article title units, and ad units', async () => {
      const totalBasicArticlesUnit = 1;
      const totalBasicArticleTitleUnit = 1;

      const totalAdUnits = 3;
      (getStrapArticles as jest.Mock).mockResolvedValue(rawArticleList);

      const handlerRunnerMock = jest.fn();

      const contentBlocks = await basicArticleListHandler(
        handlerRunnerMock,
        {
          type: HandlerInputType.ArticleList,
          strapName: 'business',
          sourceId: Strap.Business,
          totalBasicArticlesUnit,
          totalBasicArticleTitleUnit,
          variant: 'control'
        },
        params
      );

      expect(contentBlocks.length).toBe(
        totalBasicArticlesUnit + totalBasicArticleTitleUnit + totalAdUnits
      );

      const expectContentBlocks = [
        basicAdUnit,
        articleNumberOneAsBasicArticle,
        basicAdUnit,
        articleNumberTwoAsBasicArticleTitle,
        basicAdUnit
      ];
      expect(contentBlocks).toEqual(expectContentBlocks);
    });

    it('should get one basic article units and one basic article title unit', async () => {
      const totalArticles = 2;
      const totalAdUnits = 3;
      const rawEditorsPick = [articleNumberOne, articleNumberTwo];

      (getStrapArticles as jest.Mock).mockResolvedValue(rawEditorsPick);

      const contentBlocks = await basicArticleListHandler(
        jest.fn(),
        {
          type: HandlerInputType.ArticleList,
          strapName: 'business',
          totalBasicArticlesUnit: 1,
          totalBasicArticleTitleUnit: 1,
          sourceId: Strap.EditorPicks,
          variant: 'control'
        },
        params
      );

      expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);
      const expectedContentBlocks = [
        basicAdUnit,
        articleNumberOneAsBasicArticle,
        basicAdUnit,
        articleNumberTwoAsBasicArticleTitle,
        basicAdUnit
      ];
      expect(contentBlocks).toEqual(expectedContentBlocks);
    });

    it('should get multiple basic article units and multiple articles title units', async () => {
      const totalArticles = 4;
      const totalAdUnits = 5;
      const longEditorsPick = new Array(4).fill(articleNumberTwo);
      (getStrapArticles as jest.Mock).mockResolvedValue(longEditorsPick);

      const contentBlocks = await basicArticleListHandler(
        jest.fn(),
        {
          type: HandlerInputType.ArticleList,
          strapName: 'business',
          totalBasicArticlesUnit: 2,
          totalBasicArticleTitleUnit: 2,
          sourceId: Strap.EditorPicks,
          variant: 'control'
        },
        params
      );

      expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);
      const expectedContentBlocks = [
        basicAdUnit,
        articleNumberTwoAsBasicArticle,
        basicAdUnit,
        articleNumberTwoAsBasicArticle,
        basicAdUnit,
        articleNumberTwoAsBasicArticleTitle,
        basicAdUnit,
        articleNumberTwoAsBasicArticleTitle,
        basicAdUnit
      ];
      expect(contentBlocks).toEqual(expectedContentBlocks);
    });

    it('should swap the first and second articles of top stories for default layout', async () => {
      const rawTopStories = [
        articleNumberOne,
        articleNumberTwo,
        articleNumberOne
      ];
      (getStrapArticles as jest.Mock).mockResolvedValue(rawTopStories);
      const expectedContentBlocks = [
        basicAdUnit,
        articleNumberTwoAsBasicArticle,
        basicAdUnit,
        articleNumberOneAsBasicArticle,
        basicAdUnit,
        articleNumberOneAsBasicArticle,
        basicAdUnit
      ];

      const contentBlocks = await basicArticleListHandler(
        jest.fn(),
        {
          type: HandlerInputType.ArticleList,
          strapName: 'business',
          sourceId: Strap.TopStories,
          layout: LayoutType.DEFAULT,
          totalBasicArticlesUnit: 3,
          variant: 'control'
        },
        params
      );

      expect(contentBlocks).toEqual(expectedContentBlocks);
    });

    it('should return article as is if there is only one article', async () => {
      const rawTopStories = [articleNumberOne];
      (getStrapArticles as jest.Mock).mockResolvedValue(rawTopStories);
      const expectedContentBlocks = [
        basicAdUnit,
        articleNumberOneAsBasicArticle,
        basicAdUnit
      ];

      const contentBlocks = await basicArticleListHandler(
        jest.fn(),
        {
          type: HandlerInputType.ArticleList,
          strapName: 'business',
          sourceId: Strap.TopStories,
          layout: LayoutType.DEFAULT,
          totalBasicArticlesUnit: 1,
          variant: 'control'
        },
        params
      );

      expect(contentBlocks).toEqual(expectedContentBlocks);
    });

    it('should not swap the first and second articles of top stories for big headline layout', async () => {
      const rawTopStories = [
        articleNumberOne,
        articleNumberTwo,
        articleNumberOne
      ];
      (getStrapArticles as jest.Mock).mockResolvedValue(rawTopStories);
      const expectedContentBlocks = [
        basicAdUnit,
        articleNumberOneAsBasicArticle,
        basicAdUnit,
        articleNumberTwoAsBasicArticle,
        basicAdUnit,
        articleNumberOneAsBasicArticle,
        basicAdUnit
      ];

      const contentBlocks = await basicArticleListHandler(
        jest.fn(),
        {
          type: HandlerInputType.ArticleList,
          strapName: 'business',
          sourceId: Strap.TopStories,
          layout: LayoutType.BIG_HEADLINE,
          totalBasicArticlesUnit: 3,
          variant: 'control'
        },
        params
      );

      expect(contentBlocks).toEqual(expectedContentBlocks);
    });

    it('should throw error when failing to retrieve articles for section', async () => {
      const error = new Error('failed to retrieve');
      (getStrapArticles as jest.Mock).mockRejectedValue(error);

      await expect(
        basicArticleListHandler(
          jest.fn(),
          {
            type: HandlerInputType.ArticleList,
            strapName: 'business',
            sourceId: Strap.Business,
            totalBasicArticlesUnit: 3,
            variant: 'control'
          },
          params
        )
      ).rejects.toEqual(error);
    });

    it('should throw error when failing to retrieve list assets', async () => {
      const error = new Error('failed to retrieve');
      (getStrapArticles as jest.Mock).mockRejectedValue(error);

      await expect(
        basicArticleListHandler(
          jest.fn(),
          {
            type: HandlerInputType.ArticleList,
            strapName: '',
            sourceId: Strap.TopStories,
            totalBasicArticlesUnit: 3,
            variant: 'control'
          },
          params
        )
      ).rejects.toEqual(error);
    });
  });

  describe('GroupOne Variant', () => {
    it('should return big image articles when variant is groupOne for top stories', async () => {
      const totalArticles = 2;
      const totalAdUnits = 3;

      (getStrapArticles as jest.Mock).mockResolvedValue(rawArticleList);

      const handlerRunnerMock = jest.fn();

      const contentBlocks = await basicArticleListHandler(
        handlerRunnerMock,
        {
          type: HandlerInputType.ArticleList,
          strapName: '',
          sourceId: Strap.TopStories,
          totalBasicArticlesUnit: 3,
          variant: 'groupOne'
        },
        params
      );

      expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);

      const expectedContentBlocks = [
        basicAdUnit,
        articleNumberTwoAsBigImageArticle,
        basicAdUnit,
        articleNumberOneAsBigImageArticle,
        basicAdUnit
      ];
      expect(contentBlocks).toEqual(expectedContentBlocks);
    });
  });
});
