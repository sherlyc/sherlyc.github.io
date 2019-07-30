import { IPage } from '../../common/__types__/IPage';
import handlerRunner from './handlers/runner';
import { Section } from './section';
import { IParams } from './__types__/IParams';
import { HandlerInputType } from './handlers/__types__/HandlerInputType';
import { ListAsset } from './listAsset';
import logger from './utils/logger';
import { FeatureName } from '../../common/FeatureName';
import { Strap } from './strap';
import config from './utils/config';

const homepageStrapsConfig = config.strapConfig!.homepageStraps;

export default async (params: IParams): Promise<IPage> => {
  try {
    return {
      apiRequestId: params.apiRequestId,
      title: 'Latest breaking news NZ | Stuff.co.nz | New Zealand',
      content: await handlerRunner(
        {
          type: HandlerInputType.Page,
          items: [
            {
              type: HandlerInputType.Weather
            },
            {
              type: HandlerInputType.BreakingNews
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
              height: '50px',
              width: '100%',
              url:
                'https://assets.stuff.co.nz/interactives/sponsored/bravo/bravo-uber.html'
            },
            {
              type: HandlerInputType.TopStories,
              strapName: 'Latest',
              sourceId: Strap.TopStories,
              totalBasicArticlesUnit:
                homepageStrapsConfig[Strap.TopStories].totalArticlesWithImages
            },
            {
              type: HandlerInputType.MiniMidStrip,
              strapName: 'MiniMidStrip',
              sourceId: Strap.MiniMidStrip,
              totalArticles:
                homepageStrapsConfig[Strap.MiniMidStrip].totalArticlesWithImages
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: `Editors' Picks`,
              displayNameColor: 'darkblue',
              articleList: {
                sourceId: Strap.EditorPicks,
                strapName: `Editors' Picks`,
                totalBasicArticlesUnit:
                  homepageStrapsConfig[Strap.EditorPicks]
                    .totalArticlesWithImages,
                totalBasicArticleTitleUnit:
                  homepageStrapsConfig[Strap.EditorPicks].totalTitleArticles
              }
            },
            {
              type: HandlerInputType.MidStrip,
              strapName: 'MidStrip',
              sourceId: Strap.MidStrip,
              totalArticles:
                homepageStrapsConfig[Strap.MidStrip].totalArticlesWithImages
            },
            {
              type: HandlerInputType.Feature,
              name: FeatureName.VideoHubFeature,
              content: {
                type: HandlerInputType.ExternalContent,
                height: '215px',
                width: '100%',
                url:
                  'https://stuff-dev.accedoanz.com/shelf/5d06caa81de1c4001f81a46e'
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'National',
              displayNameColor: 'darkblue',
              linkUrl: '/' + Section.National,
              articleList: {
                sourceId: Strap.National,
                strapName: 'National',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 3
              }
            },
            {
              type: HandlerInputType.Video
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Climate Change',
              displayNameColor: 'darkblue',
              linkUrl: '/' + Section.ClimateChange,
              articleList: {
                sourceId: Strap.ClimateChange,
                strapName: 'Climate Change',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Premium',
              displayNameColor: 'premiumdark',
              linkUrl: '/' + Section.Premium,
              articleList: {
                sourceId: Strap.Premium,
                strapName: 'Premium',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'World',
              displayNameColor: 'azureblue',
              linkUrl: '/' + Section.World,
              articleList: {
                sourceId: Strap.World,
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
                sourceId: Strap.Business,
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
                sourceId: Strap.Opinion,
                strapName: 'Opinion',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 2
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Good Reads',
              displayNameColor: 'mediumslateblue',
              linkUrl: '/' + Section.GoodReads,
              articleList: {
                sourceId: Strap.GoodReads,
                strapName: 'Good Reads',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 2
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Daily Fix',
              displayNameColor: 'navyblue',
              articleList: {
                sourceId: Strap.DailyFix,
                strapName: 'Daily Fix',
                totalBasicArticlesUnit: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Technology',
              displayNameColor: 'carribeangreen',
              linkUrl: '/' + Section.Technology,
              articleList: {
                sourceId: Strap.Technology,
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
                sourceId: Strap.Homed,
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
                sourceId: Strap.LifeStyle,
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
                sourceId: Strap.WellGood,
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
                sourceId: Strap.Entertainment,
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
                sourceId: Strap.Travel,
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
                sourceId: Strap.Motoring,
                strapName: 'Motoring',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Stuff Nation',
              displayNameColor: 'woodsmoke',
              linkUrl: '/' + Section.StuffNation,
              articleList: {
                sourceId: Strap.StuffNation,
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
                sourceId: Strap.Sport,
                strapName: 'Sport',
                totalBasicArticlesUnit: 2,
                totalBasicArticleTitleUnit: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Noted',
              displayNameColor: 'darkblue',
              linkUrl: '/' + Section.Noted,
              articleList: {
                sourceId: Strap.Noted,
                strapName: 'Noted',
                totalBasicArticlesUnit: 2
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Now to Love',
              displayNameColor: 'amaranth',
              linkUrl: '/' + Section.NowToLove,
              articleList: {
                sourceId: Strap.NowToLove,
                strapName: 'Now to Love',
                totalBasicArticlesUnit: 2
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Homes to Love',
              displayNameColor: 'amaranth',
              linkUrl: '/' + Section.HomesToLove,
              articleList: {
                sourceId: Strap.HomesToLove,
                strapName: 'Homes to Love',
                totalBasicArticlesUnit: 2
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Food to Love',
              displayNameColor: 'amaranth',
              linkUrl: '/' + Section.FoodToLove,
              articleList: {
                sourceId: Strap.FoodToLove,
                strapName: 'Food to Love',
                totalBasicArticlesUnit: 2
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'BeautyHeaven',
              displayNameColor: 'amaranth',
              linkUrl: '/' + Section.BeautyHeaven,
              articleList: {
                sourceId: Strap.BeautyHeaven,
                strapName: 'BeautyHeaven',
                totalBasicArticlesUnit: 2
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Fashion Quarterly',
              displayNameColor: 'amaranth',
              linkUrl: '/' + Section.FashionQuarterly,
              articleList: {
                sourceId: Strap.FashionQuarterly,
                strapName: 'Fashion Quarterly',
                totalBasicArticlesUnit: 2
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Metro',
              displayNameColor: 'amaranth',
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
              displayNameColor: 'darkblue',
              linkUrl: '/' + Section.Newsroom,
              articleList: {
                sourceId: Strap.Newsroom,
                strapName: 'Newsroom.co.nz',
                totalBasicArticlesUnit: 3
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Tarana',
              displayNameColor: 'scarlet',
              linkUrl: '/' + Section.Tarana,
              articleList: {
                sourceId: Section.Tarana,
                strapName: 'Tarana',
                totalBasicArticlesUnit: 2
              }
            },
            {
              type: HandlerInputType.ArticleSection,
              displayName: 'Sponsored Content',
              displayNameColor: 'darkblue',
              linkUrl: '/' + Section.SponsoredContent,
              articleList: {
                sourceId: Strap.SponsoredContent,
                strapName: 'Sponsored Content',
                totalBasicArticlesUnit: 2
              }
            },
            {
              type: HandlerInputType.ExternalContent,
              height: '580px',
              width: '100%',
              url: 'https://cdn.neighbourly.co.nz/stuff/933/homepage'
            }
          ]
        },
        params
      )
    };
  } catch (e) {
    logger.error(params.apiRequestId, `Orchestrator level error - ${e}`);
    throw e;
  }
};
