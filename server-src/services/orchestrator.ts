import { IPage } from '../../common/__types__/IPage';
import handlerRunner from './handlers/runner';
import { Section } from './section';
import { IParams } from './__types__/IParams';
import { ContentBlockType } from '../../common/__types__/ContentBlockType';
import { HandlerInputType } from './handlers/__types__/HandlerInputType';
import { ListAsset } from './listAsset';

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
              type: HandlerInputType.Experiment,
              name: 'Toucan',
              variants: {
                purpleHeadline: {
                  type: HandlerInputType.BreakingNews,
                  variant: 'purpleHeadline'
                },
                orangeHeadline: {
                  type: HandlerInputType.BreakingNews,
                  variant: 'orangeHeadline'
                },
                control: {
                  type: HandlerInputType.BreakingNews,
                  variant: 'control'
                }
              }
            },
            {
              type: HandlerInputType.ExternalContent,
              height: '40px',
              width: '100%',
              url:
                'https://interactives.stuff.co.nz/voyager/2019/2019-mobile.html'
            },
            {
              type: HandlerInputType.ExternalContent,
              height: '80px',
              width: '100%',
              url:
                'https://interactives.stuff.co.nz/2019/the-homicide-report/hr-uber.html'
            },
            {
              type: HandlerInputType.ArticleList,
              strapName: 'Latest',
              sourceId: ListAsset.TopStories,
              totalBasicArticlesUnit: 6
            },
            {
              type: HandlerInputType.MiniMidStrip,
              strapName: 'MiniMidStrip',
              totalArticles: 2
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: `Editors' Picks`,
              displayNameColor: 'darkblue',
              articleList: {
                sourceId: ListAsset.EditorPicks,
                strapName: `Editors' Picks`,
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 6
              }
            },
            {
              type: HandlerInputType.MidStrip,
              strapName: 'MidStrip',
              totalArticles: 6
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'National',
              displayNameColor: 'toreabay',
              linkUrl: '/' + Section.National,
              articleList: {
                sourceId: Section.National,
                strapName: 'National',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Christchurch Mosque Terrorist Attack',
              displayNameColor: 'toreabay',
              linkUrl: '/' + Section.ChristchurchShooting,
              articleList: {
                sourceId: Section.ChristchurchShooting,
                strapName: 'Christchurch Mosque Terrorist Attack',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 3
              }
            },
            {
              type: HandlerInputType.Video
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Premium',
              displayNameColor: 'toreabay',
              linkUrl: '/' + Section.Premium,
              articleList: {
                sourceId: Section.Premium,
                strapName: 'Premium',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Quick! Save The Planet',
              displayNameColor: 'toreabay',
              linkUrl: '/' + Section.QuickSaveThePlanet,
              articleList: {
                sourceId: Section.QuickSaveThePlanet,
                strapName: 'Quick! Save The Planet',
                totalBasicArticlesUnit: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'World',
              displayNameColor: 'azureblue',
              linkUrl: '/' + Section.World,
              articleList: {
                sourceId: Section.World,
                strapName: 'World',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 3
              }
            },
            {
              type: HandlerInputType.ExternalContent,
              height: '570px',
              width: '100%',
              url: 'https://cdn.neighbourly.co.nz/stuff/strap/empty'
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Business',
              displayNameColor: 'royalblue',
              linkUrl: '/' + Section.Business,
              articleList: {
                sourceId: Section.Business,
                strapName: 'Business',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Opinion',
              displayNameColor: 'dingley',
              linkUrl: '/' + Section.Opinion,
              articleList: {
                sourceId: Section.Opinion,
                strapName: 'Opinion',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 2
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Good Reads',
              displayNameColor: 'dingley',
              linkUrl: '/' + Section.GoodReads,
              articleList: {
                sourceId: Section.GoodReads,
                strapName: 'Good Reads',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 2
              }
            },

            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Technology',
              displayNameColor: 'carribeangreen',
              linkUrl: '/' + Section.Technology,
              articleList: {
                sourceId: Section.Technology,
                strapName: 'Technology',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Homed',
              displayNameColor: 'keppel',
              linkUrl: '/' + Section.Homed,
              articleList: {
                sourceId: Section.Homed,
                strapName: 'Homed',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Life Style',
              displayNameColor: 'amaranth',
              linkUrl: '/' + Section.LifeStyle,
              articleList: {
                sourceId: Section.LifeStyle,
                strapName: 'Life Style',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Well Good',
              displayNameColor: 'sunglow',
              linkUrl: '/' + Section.WellGood,
              articleList: {
                sourceId: Section.WellGood,
                strapName: 'Well Good',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Entertainment',
              displayNameColor: 'purpleheart',
              linkUrl: '/' + Section.Entertainment,
              articleList: {
                sourceId: Section.Entertainment,
                strapName: 'Entertainment',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Travel',
              displayNameColor: 'yellowsea',
              linkUrl: '/' + Section.Travel,
              articleList: {
                sourceId: Section.Travel,
                strapName: 'Travel',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Motoring',
              displayNameColor: 'pizzaz',
              linkUrl: '/' + Section.Motoring,
              articleList: {
                sourceId: Section.Motoring,
                strapName: 'Motoring',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Stuff Nation',
              displayNameColor: 'junglegreen',
              linkUrl: '/' + Section.StuffNation,
              articleList: {
                sourceId: Section.StuffNation,
                strapName: 'Stuff Nation',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Sport',
              displayNameColor: 'scarlet',
              linkUrl: '/' + Section.Sport,
              articleList: {
                sourceId: Section.Sport,
                strapName: 'Sport',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Noted',
              displayNameColor: 'scarlet',
              linkUrl: '/' + Section.Noted,
              articleList: {
                sourceId: Section.Noted,
                strapName: 'Noted',
                totalBasicArticlesUnit: 2
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Now to Love',
              displayNameColor: 'scarlet',
              linkUrl: '/' + Section.NowToLove,
              articleList: {
                sourceId: Section.NowToLove,
                strapName: 'Now to Love',
                totalBasicArticlesUnit: 2
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Homes to Love',
              displayNameColor: 'scarlet',
              linkUrl: '/' + Section.HomesToLove,
              articleList: {
                sourceId: Section.HomesToLove,
                strapName: 'Homes to Love',
                totalBasicArticlesUnit: 2
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Food to Love',
              displayNameColor: 'scarlet',
              linkUrl: '/' + Section.FoodToLove,
              articleList: {
                sourceId: Section.FoodToLove,
                strapName: 'Food to Love',
                totalBasicArticlesUnit: 2
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'BeautyHeaven',
              displayNameColor: 'scarlet',
              linkUrl: '/' + Section.BeautyHeaven,
              articleList: {
                sourceId: Section.BeautyHeaven,
                strapName: 'BeautyHeaven',
                totalBasicArticlesUnit: 2
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Fashion Quarterly',
              displayNameColor: 'scarlet',
              linkUrl: '/' + Section.FashionQuarterly,
              articleList: {
                sourceId: Section.FashionQuarterly,
                strapName: 'Fashion Quarterly',
                totalBasicArticlesUnit: 2
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Metro',
              displayNameColor: 'scarlet',
              linkUrl: '/' + Section.Metro,
              articleList: {
                sourceId: Section.Metro,
                strapName: 'Metro',
                totalBasicArticlesUnit: 2
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Newsroom.co.nz',
              displayNameColor: 'scarlet',
              linkUrl: '/' + Section.Newsroom,
              articleList: {
                sourceId: Section.Newsroom,
                strapName: 'Newsroom.co.nz',
                totalBasicArticlesUnit: 2
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Sponsored Content',
              displayNameColor: 'scarlet',
              linkUrl: '/' + Section.SponsoredContent,
              articleList: {
                sourceId: Section.SponsoredContent,
                strapName: 'Sponsored Content',
                totalBasicArticlesUnit: 2
              }
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
