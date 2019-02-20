import basicArticleSectionHandler, {
  IBasicArticleSectionHandlerInput
} from './basic-article-section';
import { Section } from '../section';
import handlerRunner from './runner';
import * as basicArticleListHandlerOutput from './__fixtures__/basic-article-list-handler-output.json';
import * as basicArticleSectionHandlerOutput from './__fixtures__/basic-article-section-handler-output.json';

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
    (handlerRunner as jest.Mock).mockResolvedValue(
      basicArticleListHandlerOutput
    );
    const contentBlocks = await basicArticleSectionHandler(handlerInput);
    expect(contentBlocks).toEqual(basicArticleSectionHandlerOutput);
  });
});
