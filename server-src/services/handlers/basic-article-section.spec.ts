import basicArticleSectionHandler from './basic-article-section';
import { Section } from '../section';
import { ListAsset } from '../listAsset';
import * as basicArticleListHandlerOutput from './__fixtures__/basic-article-list-handler-output.json';
import * as basicArticleSectionHandlerOutput from './__fixtures__/basic-article-section-handler-output.json';
import { IBasicArticleSectionHandlerInput } from './__types__/IBasicArticleSectionHandlerInput';
import { IParams } from '../__types__/IParams';
import { HandlerInputType } from './__types__/HandlerInputType';

jest.mock('./runner');

describe('BasicArticleSectionHandler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  it('should get a section content block with only basic article units', async () => {
    const totalArticles = 5;
    const handlerInput = {
      type: 'ArticleSection',
      linkUrl: '/business',
      displayName: 'business',
      displayNameColor: 'red',
      articleList: {
        sourceId: Section.Business,
        totalArticles
      }
    } as IBasicArticleSectionHandlerInput;

    const handlerRunnerMock = jest.fn();

    handlerRunnerMock.mockResolvedValue(
      basicArticleListHandlerOutput.TwoArticleThreeAd
    );

    const contentBlocks = await basicArticleSectionHandler(
      handlerRunnerMock,
      handlerInput,
      params
    );
    expect(contentBlocks).toEqual(
      basicArticleSectionHandlerOutput.SectionWithOnlyBasicArticleUnit
    );
    expect(handlerRunnerMock).toHaveBeenCalledWith(
      {
        type: HandlerInputType.ArticleList,
        sourceId: Section.Business,
        totalArticles
      },
      params
    );
  });

  it('should get a section content block with basic article units and article title link', async () => {
    const totalArticles = 2;
    const totalBasicArticlesUnit = 1;
    const handlerInput = {
      type: 'ArticleSection',
      linkUrl: '/business',
      displayName: 'business',
      displayNameColor: 'red',
      articleList: {
        sourceId: ListAsset.EditorPicks,
        totalArticles,
        totalBasicArticlesUnit
      }
    } as IBasicArticleSectionHandlerInput;

    const handlerRunnerMock = jest.fn();

    handlerRunnerMock.mockResolvedValue(
      basicArticleListHandlerOutput.OneArticleUnitOneArticleTitleThreeAd
    );

    const contentBlocks = await basicArticleSectionHandler(
      handlerRunnerMock,
      handlerInput,
      params
    );
    expect(contentBlocks).toEqual(
      basicArticleSectionHandlerOutput.SectionWithBasicArticleUnitAndArticleTitleLink
    );
    expect(handlerRunnerMock).toHaveBeenCalledWith(
      {
        type: HandlerInputType.ArticleList,
        sourceId: ListAsset.EditorPicks,
        totalArticles,
        totalBasicArticlesUnit
      },
      params
    );
  });
});
