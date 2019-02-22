import { Section } from '../section';
import pageHandler from './page';
import * as latestArticles from './__fixtures__/latest-articles.json';
import * as sportSection from './__fixtures__/sport-section.json';
import * as nationalSection from './__fixtures__/national-section.json';
import * as pageHandlerOutput from './__fixtures__/page-handler-output.json';
import { IPageHandlerInput } from './__types__/IPageHandlerInput';

jest.mock('./runner');
describe('PageHandler', () => {
  it('should get a page content block', async () => {
    const pageHandlerInput = {
      type: 'Page',
      items: [
        {
          type: 'ArticleList',
          sectionId: Section.Latest,
          totalArticles: 3
        },
        {
          type: 'ArticleSection',
          displayName: 'Sport',
          displayNameColor: 'blue',
          linkUrl: '/' + Section.Sport,
          articleList: { sectionId: Section.Sport, totalArticles: 3 }
        },
        {
          type: 'ArticleSection',
          displayName: 'National',
          displayNameColor: 'red',
          linkUrl: '/' + Section.National,
          articleList: { sectionId: Section.National, totalArticles: 3 }
        }
      ]
    } as IPageHandlerInput;

    const handlerRunnerMock = jest.fn();

    handlerRunnerMock.mockResolvedValueOnce(latestArticles);
    handlerRunnerMock.mockResolvedValueOnce(sportSection);
    handlerRunnerMock.mockResolvedValueOnce(nationalSection);

    const contentBlocks = await pageHandler(
      handlerRunnerMock,
      pageHandlerInput
    );
    expect(contentBlocks).toEqual(pageHandlerOutput);
  });
});