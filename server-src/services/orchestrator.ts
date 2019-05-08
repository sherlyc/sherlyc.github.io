import { IPage } from '../../common/__types__/IPage';
import handlerRunner from './handlers/runner';
import { Section } from './section';
import { IParams } from './__types__/IParams';
import { ContentBlockType } from '../../common/__types__/ContentBlockType';
import { HandlerInputType } from './handlers/__types__/HandlerInputType';

export default async (params: IParams): Promise<IPage> => {
  try {
    return {
      apiRequestId: params.apiRequestId,
      title: 'Stuff',
      content: await handlerRunner(
        {
          type: HandlerInputType.Page,
          items: [
            {
              type: HandlerInputType.Weather
            },
            {
              type: HandlerInputType.BreakingNews,
              ignoreBreakingNews: params.ignoreBreakingNews
            },
            {
              type: HandlerInputType.ArticleList,
              sectionId: Section.Latest,
              totalArticles: 6
            },
            {
              type: HandlerInputType.MidStrip,
              totalArticles: 6
            },
            {
              type: HandlerInputType.ExternalContent,
              height: '570px',
              width: '100%',
              url: 'https://cdn.neighbourly.co.nz/stuff/strap/empty'
            },
            {
              type: HandlerInputType.MidStrip,
              totalArticles: 2
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Sport',
              displayNameColor: 'scarlet',
              linkUrl: '/' + Section.Sport,
              articleList: { sectionId: Section.Sport, totalArticles: 3 }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'National',
              displayNameColor: 'toreabay',
              linkUrl: '/' + Section.National,
              articleList: { sectionId: Section.National, totalArticles: 3 }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'World',
              displayNameColor: 'azureblue',
              linkUrl: '/' + Section.World,
              articleList: { sectionId: Section.World, totalArticles: 3 }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Business',
              displayNameColor: 'royalblue',
              linkUrl: '/' + Section.Business,
              articleList: { sectionId: Section.Business, totalArticles: 3 }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Opinion',
              displayNameColor: 'dingley',
              linkUrl: '/' + Section.Opinion,
              articleList: { sectionId: Section.Opinion, totalArticles: 3 }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Technology',
              displayNameColor: 'carribeangreen',
              linkUrl: '/' + Section.Technology,
              articleList: { sectionId: Section.Technology, totalArticles: 3 }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Homed',
              displayNameColor: 'keppel',
              linkUrl: '/' + Section.Homed,
              articleList: { sectionId: Section.Homed, totalArticles: 3 }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Life Style',
              displayNameColor: 'amaranth',
              linkUrl: '/' + Section.LifeStyle,
              articleList: { sectionId: Section.LifeStyle, totalArticles: 3 }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Entertainment',
              displayNameColor: 'purpleheart',
              linkUrl: '/' + Section.Entertainment,
              articleList: {
                sectionId: Section.Entertainment,
                totalArticles: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Travel',
              displayNameColor: 'yellowsea',
              linkUrl: '/' + Section.Travel,
              articleList: { sectionId: Section.Travel, totalArticles: 3 }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Motoring',
              displayNameColor: 'pizzaz',
              linkUrl: '/' + Section.Motoring,
              articleList: { sectionId: Section.Motoring, totalArticles: 3 }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Stuff Nation',
              displayNameColor: 'junglegreen',
              linkUrl: '/' + Section.StuffNation,
              articleList: { sectionId: Section.StuffNation, totalArticles: 3 }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Quick! Save The Planet',
              displayNameColor: 'toreabay',
              linkUrl: '/' + Section.QuickSaveThePlanet,
              articleList: {
                sectionId: Section.QuickSaveThePlanet,
                totalArticles: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Well Good',
              displayNameColor: 'sunglow',
              linkUrl: '/' + Section.WellGood,
              articleList: { sectionId: Section.WellGood, totalArticles: 3 }
            }
          ]
        },
        params
      )
    };
  } catch (e) {
    return {
      apiRequestId: params.apiRequestId,
      title: 'Stuff',
      content: [
        { type: ContentBlockType.Header },
        {
          type: ContentBlockType.Container,
          items: [{ type: ContentBlockType.ErrorBlock, message: e.message }]
        },
        { type: ContentBlockType.Footer }
      ]
    };
  }
};
