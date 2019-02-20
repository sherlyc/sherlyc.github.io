import { Section } from '../section';
import pageHandler, { IPageHandlerInput } from './page';
import handlerRunner from './runner';
import * as latestArticles from './__fixtures__/latest-articles.json';
import * as sportSection from './__fixtures__/sport-section.json';
import * as nationalSection from './__fixtures__/national-section.json';
import * as pageHandlerOutput from './__fixtures__/page-handler-output.json';

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

    (handlerRunner as jest.Mock).mockResolvedValueOnce(latestArticles);
    (handlerRunner as jest.Mock).mockResolvedValueOnce(sportSection);
    (handlerRunner as jest.Mock).mockResolvedValueOnce(nationalSection);

    const contentBlocks = await pageHandler(pageHandlerInput);
    expect(contentBlocks).toEqual(pageHandlerOutput);
  });
});
