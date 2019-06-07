import basicArticleSectionHandler from './basic-article-section';
import { Section } from '../../section';
import { ListAsset } from '../../listAsset';
import * as handlerOutputForSection from '../__fixtures__/basic-article-list-handler-output-for-section.json';
import * as handlerOutputForListAsset from '../__fixtures__/basic-article-list-handler-output-for-listasset.json';
import * as basicArticleSectionHandlerOutput from '../__fixtures__/basic-article-section-handler-output.json';
import { IBasicArticleSectionHandlerInput } from '../__types__/IBasicArticleSectionHandlerInput';
import { IParams } from '../../__types__/IParams';
import { HandlerInputType } from '../__types__/HandlerInputType';

jest.mock('../runner');

describe('BasicArticleSectionHandler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  it('should get a section content block with only basic article units', async () => {
    const totalBasicArticlesUnit = 5;
    const handlerInput = {
      type: 'ArticleSection',
      linkUrl: '/business',
      displayName: 'business',
      displayNameColor: 'red',
      articleList: {
        sourceId: Section.Business,
        totalBasicArticlesUnit,
        strapName: 'business'
      }
    } as IBasicArticleSectionHandlerInput;

    const handlerRunnerMock = jest.fn();

    handlerRunnerMock.mockResolvedValue(
      handlerOutputForSection.TwoArticleUnitsThreeAds
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
        strapName: 'business',
        sourceId: Section.Business,
        totalBasicArticlesUnit
      },
      params
    );
  });

  it('should get a section content block with basic article units and article title link', async () => {
    const totalBasicArticlesUnit = 1;
    const totalBasicArticleTitleUnit = 1;
    const handlerInput = {
      type: 'ArticleSection',
      displayName: 'business',
      displayNameColor: 'red',
      articleList: {
        sourceId: ListAsset.EditorPicks,
        totalBasicArticlesUnit,
        totalBasicArticleTitleUnit,
        strapName: 'business'
      }
    } as IBasicArticleSectionHandlerInput;

    const handlerRunnerMock = jest.fn();

    handlerRunnerMock.mockResolvedValue(
      handlerOutputForListAsset.OneArticleUnitOneArticleTitleThreeAds
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
        strapName: 'business',
        totalBasicArticlesUnit,
        totalBasicArticleTitleUnit
      },
      params
    );
  });
});
