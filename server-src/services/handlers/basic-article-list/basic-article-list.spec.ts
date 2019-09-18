import basicArticleListHandler from './basic-article-list';
import { IParams } from '../../__types__/IParams';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { IRawArticle } from '../../adapters/__types__/IRawArticle';
import { LayoutType } from '../../adapters/__types__/LayoutType';
import { Strap } from '../../strap';
import { Section } from '../../section';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IBasicArticleTitleUnit } from '../../../../common/__types__/IBasicArticleTitleUnit';
import { IBigImageArticleUnit } from '../../../../common/__types__/IBigImageArticleUnit';
import { IHalfWidthImageArticleUnit } from '../../../../common/__types__/IHalfWidthImageArticleUnit';
import { getRawArticles } from '../../adapters/article-retriever/article-retriever';

jest.mock('../../adapters/jsonfeed');
jest.mock('../../adapters/strap-list-service');
jest.mock('../../adapters/article-retriever/article-retriever');

describe('BasicArticleListHandler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  const defaultBasicAdUnit = {
    type: 'BasicAdUnit',
    context: ''
  };

  const businessBasicAdUnit = {
    type: 'BasicAdUnit',
    context: 'business'
  };

  const articleNumberOne = {
    id: '1',
    indexHeadline: 'Headline 1',
    introText: 'Intro 1',
    linkUrl: '/link1',
    defconSrc: null,
    imageSrc: '1.jpg',
    imageSrcSet: '1.jpg 1w',
    strapImageSrc: 'strap1.jpg',
    strapImageSrcSet: 'strap1.jpg 1w',
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
    strapImageSrc: 'strap2.jpg',
    strapImageSrcSet: 'strap2.jpg 1w',
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

  const articleNumberOneAsBigImageArticle: IBigImageArticleUnit = {
    id: '1',
    strapName: '',
    headlineFlags: [],
    imageSrc: 'strap1.jpg',
    imageSrcSet: 'strap1.jpg 1w',
    indexHeadline: 'Headline 1',
    introText: 'Intro 1',
    lastPublishedTime: 1,
    linkUrl: '/link1',
    type: ContentBlockType.BigImageArticleUnit
  };

  const articleNumberTwoAsBigImageArticle: IBigImageArticleUnit = {
    id: '2',
    strapName: '',
    headlineFlags: [],
    imageSrc: 'strap2.jpg',
    imageSrcSet: 'strap2.jpg 1w',
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

  const articleAsBigImageArticle: IBigImageArticleUnit = {
    id: '1',
    strapName: '',
    indexHeadline: 'Headline 1',
    introText: 'Intro 1',
    linkUrl: '/link1',
    imageSrc: 'strap1.jpg',
    imageSrcSet: 'strap1.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: [],
    type: ContentBlockType.BigImageArticleUnit
  };

  const articleAsHalfWidthImageArticle: IHalfWidthImageArticleUnit = {
    id: '1',
    strapName: '',
    indexHeadline: 'Headline 1',
    introText: 'Intro 1',
    linkUrl: '/link1',
    imageSrc: 'strap1.jpg',
    imageSrcSet: 'strap1.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: [],
    type: ContentBlockType.HalfWidthImageArticleUnit
  };

  beforeEach(() => {
    jest.resetModules();
  });

  it('should get a list of basic article units and ad units', async () => {
    const totalArticles = 1;
    const totalAdUnits = 2;
    (getRawArticles as jest.Mock).mockResolvedValue([articleNumberOne]);

    const handlerRunnerMock = jest.fn();

    const contentBlocks = await basicArticleListHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.ArticleList,
        strapName: 'business',
        sourceId: Section.Business,
        totalBasicArticlesUnit: 1
      },
      params
    );

    expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);

    const expectedContentBlocks = [
      businessBasicAdUnit,
      articleNumberOneAsBasicArticle,
      businessBasicAdUnit
    ];
    expect(contentBlocks).toEqual(expectedContentBlocks);
  });

  it('should get a list of basic article units and ad units not exceeding the maximum length', async () => {
    const totalArticles = 2;
    const totalAdUnits = 3;
    (getRawArticles as jest.Mock).mockResolvedValue(rawArticleList);

    const handlerRunnerMock = jest.fn();

    const contentBlocks = await basicArticleListHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.ArticleList,
        strapName: 'business',
        sourceId: Strap.Business,
        totalBasicArticlesUnit: 2
      },
      params
    );

    expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);

    const expectedContentBlocks = [
      businessBasicAdUnit,
      articleNumberOneAsBasicArticle,
      businessBasicAdUnit,
      articleNumberTwoAsBasicArticle,
      businessBasicAdUnit
    ];
    expect(contentBlocks).toEqual(expectedContentBlocks);
  });

  it('should get a list of basic article units, basic article title units, and ad units', async () => {
    const totalBasicArticlesUnit = 1;
    const totalBasicArticleTitleUnit = 1;

    const totalAdUnits = 3;
    (getRawArticles as jest.Mock).mockResolvedValue(rawArticleList);

    const handlerRunnerMock = jest.fn();

    const contentBlocks = await basicArticleListHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.ArticleList,
        strapName: 'business',
        sourceId: Strap.Business,
        totalBasicArticlesUnit,
        totalBasicArticleTitleUnit
      },
      params
    );

    expect(contentBlocks.length).toBe(
      totalBasicArticlesUnit + totalBasicArticleTitleUnit + totalAdUnits
    );

    const expectContentBlocks = [
      businessBasicAdUnit,
      articleNumberOneAsBasicArticle,
      businessBasicAdUnit,
      articleNumberTwoAsBasicArticleTitle,
      businessBasicAdUnit
    ];
    expect(contentBlocks).toEqual(expectContentBlocks);
  });

  it('should get one basic article units and one basic article title unit', async () => {
    const totalArticles = 2;
    const totalAdUnits = 3;
    const rawEditorsPick = [articleNumberOne, articleNumberTwo];

    (getRawArticles as jest.Mock).mockResolvedValue(rawEditorsPick);

    const contentBlocks = await basicArticleListHandler(
      jest.fn(),
      {
        type: HandlerInputType.ArticleList,
        strapName: 'business',
        totalBasicArticlesUnit: 1,
        totalBasicArticleTitleUnit: 1,
        sourceId: Strap.EditorPicks
      },
      params
    );

    expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);
    const expectedContentBlocks = [
      businessBasicAdUnit,
      articleNumberOneAsBasicArticle,
      businessBasicAdUnit,
      articleNumberTwoAsBasicArticleTitle,
      businessBasicAdUnit
    ];
    expect(contentBlocks).toEqual(expectedContentBlocks);
  });

  it('should get multiple basic article units and multiple articles title units', async () => {
    const totalArticles = 4;
    const totalAdUnits = 5;
    const longEditorsPick = new Array(4).fill(articleNumberTwo);
    (getRawArticles as jest.Mock).mockResolvedValue(longEditorsPick);

    const contentBlocks = await basicArticleListHandler(
      jest.fn(),
      {
        type: HandlerInputType.ArticleList,
        strapName: 'business',
        totalBasicArticlesUnit: 2,
        totalBasicArticleTitleUnit: 2,
        sourceId: Strap.EditorPicks
      },
      params
    );

    expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);
    const expectedContentBlocks = [
      businessBasicAdUnit,
      articleNumberTwoAsBasicArticle,
      businessBasicAdUnit,
      articleNumberTwoAsBasicArticle,
      businessBasicAdUnit,
      articleNumberTwoAsBasicArticleTitle,
      businessBasicAdUnit,
      articleNumberTwoAsBasicArticleTitle,
      businessBasicAdUnit
    ];
    expect(contentBlocks).toEqual(expectedContentBlocks);
  });

  it('should return article as is if there is only one article', async () => {
    const rawTopStories = [articleNumberOne];
    (getRawArticles as jest.Mock).mockResolvedValue(rawTopStories);
    const expectedContentBlocks = [
      businessBasicAdUnit,
      articleNumberOneAsBasicArticle,
      businessBasicAdUnit
    ];

    const contentBlocks = await basicArticleListHandler(
      jest.fn(),
      {
        type: HandlerInputType.ArticleList,
        strapName: 'business',
        sourceId: Strap.TopStories,
        layout: LayoutType.DEFAULT,
        totalBasicArticlesUnit: 1
      },
      params
    );

    expect(contentBlocks).toEqual(expectedContentBlocks);
  });

  it('should throw error when failing to retrieve articles for section', async () => {
    const error = new Error('failed to retrieve');
    (getRawArticles as jest.Mock).mockRejectedValue(error);

    await expect(
      basicArticleListHandler(
        jest.fn(),
        {
          type: HandlerInputType.ArticleList,
          strapName: 'business',
          sourceId: Strap.Business,
          totalBasicArticlesUnit: 3
        },
        params
      )
    ).rejects.toEqual(error);
  });

  it('should throw error when failing to retrieve list assets', async () => {
    const error = new Error('failed to retrieve');
    (getRawArticles as jest.Mock).mockRejectedValue(error);

    await expect(
      basicArticleListHandler(
        jest.fn(),
        {
          type: HandlerInputType.ArticleList,
          strapName: '',
          sourceId: Strap.TopStories,
          totalBasicArticlesUnit: 3
        },
        params
      )
    ).rejects.toEqual(error);
  });

  // TODO: Remove these commented out tests once we migrated the test to top-stories-article-list
  // describe('GroupOne Variant', () => {
  //   it('should return big image articles when variant is groupOne for top stories', async () => {
  //     const totalArticles = 2;
  //     const totalAdUnits = 3;
  //
  //     (getRawArticles as jest.Mock).mockResolvedValue(rawArticleList);
  //
  //     const handlerRunnerMock = jest.fn();
  //
  //     const contentBlocks = await basicArticleListHandler(
  //       handlerRunnerMock,
  //       {
  //         type: HandlerInputType.ArticleList,
  //         strapName: '',
  //         sourceId: Strap.TopStoriesExperiment,
  //         totalBasicArticlesUnit: 3,
  //         variant: 'groupOne'
  //       },
  //       params
  //     );
  //
  //     expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);
  //
  //     const expectedContentBlocks = [
  //       defaultBasicAdUnit,
  //       articleNumberTwoAsBigImageArticle,
  //       defaultBasicAdUnit,
  //       articleNumberOneAsBigImageArticle,
  //       defaultBasicAdUnit
  //     ];
  //     expect(contentBlocks).toEqual(expectedContentBlocks);
  //   });
  // });

  // describe('GroupTwo Variant', () => {
  //   it('should return 3 big images and 3 half width images articles', async () => {
  //     const totalArticles = 6;
  //     const totalAdUnits = 7;
  //     const sixArticleList = [
  //       articleNumberOne,
  //       articleNumberOne,
  //       articleNumberOne,
  //       articleNumberOne,
  //       articleNumberOne,
  //       articleNumberOne
  //     ];
  //
  //     (getRawArticles as jest.Mock).mockResolvedValue(sixArticleList);
  //
  //     const handlerRunnerMock = jest.fn();
  //
  //     const contentBlocks = await basicArticleListHandler(
  //       handlerRunnerMock,
  //       {
  //         type: HandlerInputType.ArticleList,
  //         strapName: '',
  //         sourceId: Strap.TopStoriesExperiment,
  //         totalBasicArticlesUnit: 6,
  //         variant: 'groupTwo'
  //       },
  //       params
  //     );
  //
  //     expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);
  //
  //     const expectedContentBlocks = [
  //       defaultBasicAdUnit,
  //       articleAsBigImageArticle,
  //       defaultBasicAdUnit,
  //       articleAsBigImageArticle,
  //       defaultBasicAdUnit,
  //       articleAsBigImageArticle,
  //       defaultBasicAdUnit,
  //       articleAsHalfWidthImageArticle,
  //       defaultBasicAdUnit,
  //       articleAsHalfWidthImageArticle,
  //       defaultBasicAdUnit,
  //       articleAsHalfWidthImageArticle,
  //       defaultBasicAdUnit
  //     ];
  //     expect(contentBlocks).toEqual(expectedContentBlocks);
  //   });
  // });
});
