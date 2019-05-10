import basicArticleSectionHandler from './basic-article-section';
import { Section } from '../section';
import * as basicArticleListHandlerOutput from './__fixtures__/basic-article-list-handler-output.json';
import * as basicArticleSectionHandlerOutput from './__fixtures__/basic-article-section-handler-output.json';
import { IBasicArticleSectionHandlerInput } from './__types__/IBasicArticleSectionHandlerInput';
import { IParams } from '../__types__/IParams';

jest.mock('./runner');

describe('BasicArticleSectionHandler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  it('should get a section content block with only basic article units', async () => {
    const handlerInput = {
      type: 'ArticleSection',
      linkUrl: '/business',
      displayName: 'business',
      displayNameColor: 'red',
      articleList: {
        sourceId: Section.Business,
        totalArticles: 5
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
    expect(handlerRunnerMock).toHaveBeenCalled();
  });

  it('should get a section content block with basic article units and article title link', async () => {
    const handlerInput = {
      type: 'ArticleSection',
      linkUrl: '/business',
      displayName: 'business',
      displayNameColor: 'red',
      articleList: {
        sourceId: Section.Business,
        totalArticles: 2,
        totalImageArticles: 1
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
    expect(handlerRunnerMock).toHaveBeenCalled();
  });
});
