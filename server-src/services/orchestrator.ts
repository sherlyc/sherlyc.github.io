import { IContentBlock } from '../../common/__types__/IContentBlock';
import handlerRunner from './handlers/runner';
import { Section } from './section';

export default async (): Promise<IContentBlock[]> => {
  try {
    return await handlerRunner({
      type: 'Page',
      items: [
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
          displayNameColor: 'blue',
          linkUrl: '/' + Section.National,
          articleList: { sectionId: Section.National, totalArticles: 3 }
        },
        {
          type: 'ArticleSection',
          displayName: 'World',
          displayNameColor: 'blue',
          linkUrl: '/' + Section.World,
          articleList: { sectionId: Section.World, totalArticles: 3 }
        },
        {
          type: 'ArticleSection',
          displayName: 'Business',
          displayNameColor: 'blue',
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
          displayNameColor: 'blue',
          linkUrl: '/' + Section.Technology,
          articleList: { sectionId: Section.Technology, totalArticles: 3 }
        },
        {
          type: 'ArticleSection',
          displayName: 'Homed',
          displayNameColor: 'blue',
          linkUrl: '/' + Section.Homed,
          articleList: { sectionId: Section.Homed, totalArticles: 3 }
        },
        {
          type: 'ArticleSection',
          displayName: 'LifeStyle',
          displayNameColor: 'blue',
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
          displayNameColor: 'blue',
          linkUrl: '/' + Section.Travel,
          articleList: { sectionId: Section.Travel, totalArticles: 3 }
        },
        {
          type: 'ArticleSection',
          displayName: 'Motoring',
          displayNameColor: 'blue',
          linkUrl: '/' + Section.Motoring,
          articleList: { sectionId: Section.Motoring, totalArticles: 3 }
        },
        {
          type: 'ArticleSection',
          displayName: 'StuffNation',
          displayNameColor: 'blue',
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
          displayNameColor: 'blue',
          linkUrl: '/' + Section.WellGood,
          articleList: { sectionId: Section.WellGood, totalArticles: 3 }
        }
      ]
    });
  } catch (e) {
    return [
      { type: 'Header' },
      {
        type: 'Container',
        items: [{ type: 'ErrorBlock', message: e.message }]
      },
      { type: 'Footer' }
    ];
  }
};
