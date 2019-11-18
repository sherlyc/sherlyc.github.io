import { ContentBlockType } from '../../common/__types__/ContentBlockType';
import { IBasicAdUnit } from '../../common/__types__/IBasicAdUnit';
import { IBasicArticleTitleUnit } from '../../common/__types__/IBasicArticleTitleUnit';
import { IBasicArticleUnit } from '../../common/__types__/IBasicArticleUnit';
import { IRawArticle } from '../services/adapters/__types__/IRawArticle';
import { getRecommendedArticles } from '../services/adapters/recommendations/recommendations.service';
import { getHomePageRecommendations } from './recommendations';

jest.mock('../services/adapters/recommendations/recommendations.service');

describe('Recommendations', () => {
  const res = {
    json: jest.fn(),
    sendStatus: jest.fn(),
    end: jest.fn()
  } as any;

  const rawArticle = {
    id: '1',
    indexHeadline: 'a',
    introText: 'a',
    linkUrl: 'asdf',
    defconSrc: 'asdf',
    imageSrc: 'asdf',
    strapImageSrc: 'asdf',
    imageSrcSet: 'asdf',
    strapImageSrcSet: 'asdf',
    lastPublishedTime: 34567,
    headlineFlags: []
  } as IRawArticle;

  const articleAsBasicArticle: IBasicArticleUnit = {
    type: ContentBlockType.BasicArticleUnit,
    id: '1',
    strapName: 'Recommendations',
    indexHeadline: 'a',
    introText: 'a',
    linkUrl: 'asdf',
    imageSrc: 'asdf',
    imageSrcSet: 'asdf',
    lastPublishedTime: 34567,
    headlineFlags: []
  };

  const articleAsTitleArticle: IBasicArticleTitleUnit = {
    type: ContentBlockType.BasicArticleTitleUnit,
    id: '1',
    strapName: 'Recommendations',
    indexHeadline: 'a',
    linkUrl: 'asdf',
    lastPublishedTime: 34567,
    headlineFlags: []
  };

  const adUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit,
    context: 'Recommendations'
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should get recommended articles as content blocks from recommendations api', async () => {
    const req = {
      spadeParams: { apiRequestId: '123123' },
      query: {
        segments: 'rt=nanz;enth=amuh',
        totalBasicArticlesUnit: '1',
        totalBasicArticleTitleUnit: '2'
      }
    } as any;

    (getRecommendedArticles as jest.Mock).mockResolvedValue([
      rawArticle,
      rawArticle,
      rawArticle
    ]);

    await getHomePageRecommendations(req, res);

    expect(getRecommendedArticles).toHaveBeenCalledWith(
      req.query.segments,
      3,
      req.spadeParams
    );

    expect(res.json).toHaveBeenCalledWith([
      adUnit,
      articleAsBasicArticle,
      adUnit,
      articleAsTitleArticle,
      adUnit,
      articleAsTitleArticle,
      adUnit
    ]);
  });

  it('should return 2 basic articles and 3 title articles by default', async () => {
    const req = {
      spadeParams: { apiRequestId: '123123' },
      query: {
        segments: 'rt=nanz;enth=amuh'
      }
    } as any;

    (getRecommendedArticles as jest.Mock).mockResolvedValue(
      new Array(5).fill(rawArticle)
    );

    await getHomePageRecommendations(req, res);

    expect(res.json).toHaveBeenCalledWith([
      adUnit,
      articleAsBasicArticle,
      adUnit,
      articleAsBasicArticle,
      adUnit,
      articleAsTitleArticle,
      adUnit,
      articleAsTitleArticle,
      adUnit,
      articleAsTitleArticle,
      adUnit
    ]);
  });

  it('should return empty content blocks if recommendation API returns nothing', async () => {
    const req = {
      spadeParams: { apiRequestId: '123123' },
      query: {
        segments: 'rt=nanz;enth=amuh',
        totalBasicArticlesUnit: '2',
        totalBasicArticleTitleUnit: '3'
      }
    } as any;

    (getRecommendedArticles as jest.Mock).mockResolvedValue([]);

    await getHomePageRecommendations(req, res);

    expect(res.json).toHaveBeenCalledWith([]);
  });
});
