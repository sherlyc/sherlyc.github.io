import basicArticleSectionHandler from './basic-article-section';
import { Section } from '../section';
import * as basicArticleListHandlerOutput from './__fixtures__/basic-article-list-handler-output.json';
import * as basicArticleSectionHandlerOutput from './__fixtures__/basic-article-section-handler-output.json';
import { IBasicArticleSectionHandlerInput } from './__types__/IBasicArticleSectionHandlerInput';
import { IParams } from '../__types__/IParams';

jest.mock('./runner');

describe('BasicArticleSectionHandler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };
  it('should get a section content block', async () => {
    const handlerInput = {
      type: 'ArticleSection',
      linkUrl: '/business',
      displayName: 'business',
      displayNameColor: 'red',
      articleList: {
        sectionId: Section.Business,
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
    expect(contentBlocks).toEqual(basicArticleSectionHandlerOutput);
    expect(handlerRunnerMock).toHaveBeenCalled();
  });
});
