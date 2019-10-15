import { IRawArticle } from '../services/adapters/__types__/IRawArticle';
import { getRecommendedArticles } from '../services/adapters/recommendations/recommendations.service';
import { getHomePageRecommendations } from './recommendations';
import { IBasicArticleUnit } from '../../common/__types__/IBasicArticleUnit';
import { ContentBlockType } from '../../common/__types__/ContentBlockType';

jest.mock('../services/adapters/recommendations/recommendations.service');

describe('Recommendations', () => {
  const res = {
    json: jest.fn(),
    sendStatus: jest.fn(),
    end: jest.fn()
  } as any;

  it('should get recommended articles as content blocks from recommendations api', async () => {
    const req = {
      spadeParams: { apiRequestId: '123123' },
      params: {
        segments: 'rt=nanz;enth=amuh'
      }
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

    (getRecommendedArticles as jest.Mock).mockResolvedValue([rawArticle]);

    await getHomePageRecommendations(req, res);

    expect(res.json).toHaveBeenCalledWith([articleAsBasicArticle]);
  });
});
