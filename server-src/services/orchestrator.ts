import { IPage } from '../../common/__types__/IPage';
import handlerRunner from './handlers/runner';
import { Section } from './section';
import { IParams } from './__types__/IParams';

export default async (params: IParams): Promise<IPage> => {
  try {
    return {
      title: 'Stuff',
      content: await handlerRunner({
        type: 'Page',
        items: [
          {
            type: 'BreakingNews',
            ignoreBreakingNews: params.ignoreBreakingNews
          },
          {
            type: 'ArticleList',
            sectionId: Section.Latest,
            totalArticles: 6
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
          },
          {
            type: 'ArticleSection',
            displayName: 'World',
            displayNameColor: 'cyan',
            linkUrl: '/' + Section.World,
            articleList: { sectionId: Section.World, totalArticles: 3 }
          },
          {
            type: 'ArticleSection',
            displayName: 'Business',
            displayNameColor: 'black',
            linkUrl: '/' + Section.Business,
            articleList: { sectionId: Section.Business, totalArticles: 3 }
          },
          {
            type: 'ArticleSection',
            displayName: 'Opinion',
            displayNameColor: 'blue',
            linkUrl: '/' + Section.Opinion,
            articleList: { sectionId: Section.Opinion, totalArticles: 3 }
          },
          {
            type: 'ArticleSection',
            displayName: 'Technology',
            displayNameColor: 'red',
            linkUrl: '/' + Section.Technology,
            articleList: { sectionId: Section.Technology, totalArticles: 3 }
          },
          {
            type: 'ArticleSection',
            displayName: 'Homed',
            displayNameColor: 'cyan',
            linkUrl: '/' + Section.Homed,
            articleList: { sectionId: Section.Homed, totalArticles: 3 }
          },
          {
            type: 'ArticleSection',
            displayName: 'Life Style',
            displayNameColor: 'black',
            linkUrl: '/' + Section.LifeStyle,
            articleList: { sectionId: Section.LifeStyle, totalArticles: 3 }
          },
          {
            type: 'ArticleSection',
            displayName: 'Entertainment',
            displayNameColor: 'blue',
            linkUrl: '/' + Section.Entertainment,
            articleList: {
              sectionId: Section.Entertainment,
              totalArticles: 3
            }
          },
          {
            type: 'ArticleSection',
            displayName: 'Travel',
            displayNameColor: 'red',
            linkUrl: '/' + Section.Travel,
            articleList: { sectionId: Section.Travel, totalArticles: 3 }
          },
          {
            type: 'ArticleSection',
            displayName: 'Motoring',
            displayNameColor: 'cyan',
            linkUrl: '/' + Section.Motoring,
            articleList: { sectionId: Section.Motoring, totalArticles: 3 }
          },
          {
            type: 'ArticleSection',
            displayName: 'Stuff Nation',
            displayNameColor: 'black',
            linkUrl: '/' + Section.StuffNation,
            articleList: { sectionId: Section.StuffNation, totalArticles: 3 }
          },
          {
            type: 'ArticleSection',
            displayName: 'Quick! Save The Planet',
            displayNameColor: 'blue',
            linkUrl: '/' + Section.QuickSaveThePlanet,
            articleList: {
              sectionId: Section.QuickSaveThePlanet,
              totalArticles: 3
            }
          },
          {
            type: 'ArticleSection',
            displayName: 'Well Good',
            displayNameColor: 'red',
            linkUrl: '/' + Section.WellGood,
            articleList: { sectionId: Section.WellGood, totalArticles: 3 }
          }
        ]
      })
    };
  } catch (e) {
    return {
      title: 'Stuff',
      content: [
        { type: 'Header' },
        {
          type: 'Container',
          items: [{ type: 'ErrorBlock', message: e.message }]
        },
        { type: 'Footer' }
      ]
    };
  }
};
