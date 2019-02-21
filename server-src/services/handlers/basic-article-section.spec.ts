import basicArticleSectionHandler from './basic-article-section';
import { Section } from '../section';
import * as basicArticleListHandlerOutput from './__fixtures__/basic-article-list-handler-output.json';
import * as basicArticleSectionHandlerOutput from './__fixtures__/basic-article-section-handler-output.json';
import { IBasicArticleSectionHandlerInput } from './__types__/IBasicArticleSectionHandlerInput';

jest.mock('./runner');

describe('BasicArticleSectionHandler', () => {
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

    handlerRunnerMock.mockResolvedValue(basicArticleListHandlerOutput);

    const contentBlocks = await basicArticleSectionHandler(
      handlerRunnerMock,
      handlerInput
    );
    expect(contentBlocks).toEqual(basicArticleSectionHandlerOutput);
    expect(handlerRunnerMock).toHaveBeenCalled();
  });
});
