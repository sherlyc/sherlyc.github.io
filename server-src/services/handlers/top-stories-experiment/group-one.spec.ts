import { HandlerInputType } from '../__types__/HandlerInputType';

import groupOneTopStoriesListHandler from './group-one';
import { getRawArticles } from '../../adapters/article-retriever/article-retriever';
import { IParams } from '../../__types__/IParams';
import { IRawArticle } from '../../adapters/__types__/IRawArticle';
import * as layoutRetriever from '../../adapters/layout-retriever';
import { LayoutType } from '../../adapters/__types__/LayoutType';
import handlerRunner from '../runner';
import { IBigImageArticleUnit } from '../../../../common/__types__/IBigImageArticleUnit';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IGrayDefconArticleUnit } from '../../../../common/__types__/IGrayDefconArticleUnit';

jest.mock('../../adapters/article-retriever/article-retriever');

describe('Experiment: GroupOne Variant', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  const strapName = 'Latest';

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

  const articleNumberTwoAsBigImageArticle: IBigImageArticleUnit = {
    id: '2',
    strapName,
    headlineFlags: [],
    imageSrc: 'strap2.jpg',
    imageSrcSet: 'strap2.jpg 1w',
    indexHeadline: 'An Article',
    introText: 'Article Text',
    lastPublishedTime: 1,
    linkUrl: '/link2',
    type: ContentBlockType.BigImageArticleUnit
  };

  const articleNumberOneAsBigImageArticle: IBigImageArticleUnit = {
    id: '1',
    strapName,
    headlineFlags: [],
    imageSrc: 'strap1.jpg',
    imageSrcSet: 'strap1.jpg 1w',
    indexHeadline: 'Article One',
    introText: 'Article One Intro',
    lastPublishedTime: 1,
    linkUrl: '/link1',
    type: ContentBlockType.BigImageArticleUnit
  };

  const articleNumberOneAsGrayDefconArticle: IGrayDefconArticleUnit = {
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

  it('should return big image articles when variant is groupOne for top stories', async () => {
    jest
      .spyOn(layoutRetriever, 'layoutRetriever')
      .mockResolvedValue(LayoutType.DEFAULT);

    const rawArticles = [articleOne, articleTwo, articleOne];

    const totalArticles = 3;
    const totalAdUnits = 4;

    (getRawArticles as jest.Mock).mockResolvedValue(rawArticles);

    const contentBlocks = await groupOneTopStoriesListHandler(
      handlerRunner,
      {
        type: HandlerInputType.TopStoriesArticleListGroupOne,
        strapName,
        totalArticles: 4
      },
      params
    );

    expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);

    const expectedContentBlocks = [
      basicAdUnit,
      articleNumberOneAsBigImageArticle,
      basicAdUnit,
      articleNumberTwoAsBigImageArticle,
      basicAdUnit,
      articleNumberOneAsBigImageArticle,
      basicAdUnit
    ];
    expect(contentBlocks).toEqual(expectedContentBlocks);
  });

  it('should return first article as gray defcon and others as big image article', async () => {
    jest
      .spyOn(layoutRetriever, 'layoutRetriever')
      .mockResolvedValue(LayoutType.DEFCON);

    const rawArticles = [articleOne, articleTwo, articleOne];

    const totalArticles = 3;
    const totalAdUnits = 4;

    (getRawArticles as jest.Mock).mockResolvedValue(rawArticles);

    const contentBlocks = await groupOneTopStoriesListHandler(
      handlerRunner,
      {
        type: HandlerInputType.TopStoriesArticleListGroupOne,
        strapName,
        totalArticles: 4
      },
      params
    );

    expect(contentBlocks.length).toBe(totalArticles + totalAdUnits);

    const expectedContentBlocks = [
      basicAdUnit,
      articleNumberOneAsGrayDefconArticle,
      basicAdUnit,
      articleNumberTwoAsBigImageArticle,
      basicAdUnit,
      articleNumberOneAsBigImageArticle,
      basicAdUnit
    ];
    expect(contentBlocks).toEqual(expectedContentBlocks);
  });
});
