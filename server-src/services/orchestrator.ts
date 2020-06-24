import { flatMap } from "lodash-es";
import { FeatureName } from "../../common/FeatureName";
import { AccentColor } from "../../common/__types__/AccentColor";
import { ContentBlockType } from "../../common/__types__/ContentBlockType";
import { IPage } from "../../common/__types__/IPage";
import handlerRunner from "./handlers/runner";
import { HandlerInput } from "./handlers/__types__/HandlerInput";
import { HandlerInputType } from "./handlers/__types__/HandlerInputType";
import { BrandModule } from "./handlers/__types__/IBrandHandlerInput";
import { IContentBlockHandlerInput } from "./handlers/__types__/IContentBlockHandlerInput";
import { Section } from "./section";
import { Strap } from "./strap";
import config from "./utils/config";
import logger from "./utils/logger";
import { formatVersion, parseVersion } from "./utils/version";
import { IParams } from "./__types__/IParams";

const homepageStrapsConfig = config.strapConfig!.homepageStraps;

export default async (params: IParams): Promise<IPage> => {
  const isNewFrontEnd =
    params.version && parseVersion(params.version) >= parseVersion("1.649");
  const components: HandlerInput[] = isNewFrontEnd ? newPage() : oldPage();
  const currentVersion = process.env.SPADE_VERSION || "SNAPSHOT";

  try {
    return {
      apiRequestId: params.apiRequestId,
      title: "Latest breaking news NZ | Stuff.co.nz | New Zealand",
      version: currentVersion,
      content: await handlerRunner(
        {
          type: HandlerInputType.Page,
          items: [
            {
              type: HandlerInputType.ForceUpdate,
              forceUpdateOnVersionsBefore: formatVersion(
                parseVersion(currentVersion) - parseVersion("0.100")
              )
            },
            ...components
          ]
        },
        params
      )
    };
  } catch (error) {
    logger.error(params.apiRequestId, `Orchestrator level error `, error);
    throw error;
  }
};

const homepageAdPrefix = "homepage";
const homepageV2AdPrefix = "homepagev2";
const billboard = (prefix: string): IContentBlockHandlerInput => ({
  type: HandlerInputType.ContentBlockHandler,
  contentBlocks: [
    {
      type: ContentBlockType.BasicAdUnit,
      context: `${prefix}Billboard`
    }
  ]
});

const interpolateBillboards = (handlers: HandlerInput[], ad: HandlerInput) => [
  ...flatMap(handlers, (handler) => [ad, handler]),
  ad
];

export const newPage = (): HandlerInput[] => {
  const homepageV2: HandlerInput[] = [
    {
      type: HandlerInputType.ContentBlockHandler,
      contentBlocks: [
        {
          type: ContentBlockType.Oli,
          config: {
            adUnitPath: "/6674/mob.stuff.homepage",
            size: [320, 460],
            targetingParams: {
              spade: "true",
              pos: "interstitial-portrait"
            }
          }
        }
      ]
    },
    {
      type: HandlerInputType.BreakingNews
    },
    billboard(homepageV2AdPrefix),
    {
      type: HandlerInputType.Weather
    },
    {
      type: HandlerInputType.TopStoriesV2,
      strapName: `${homepageV2AdPrefix}TopStoriesDefaultOne`,
      color: AccentColor.CuriousBlue,
      midInsertContent: {
        type: HandlerInputType.ExternalContent,
        url: "",
        width: "100%",
        height: "43px",
        margin: "0"
      },
      lowerRightContent: {
        type: HandlerInputType.LatestHeadlines,
        sourceId: Strap.LatestNews,
        totalArticles: 7,
        displayName: "latest headlines",
        strapName: `${homepageV2AdPrefix}LatestHeadlines`,
        color: AccentColor.Coral
      }
    },
    ...interpolateBillboards(
      [
        {
          type: HandlerInputType.EditorsPicks,
          displayName: "editors' picks",
          color: AccentColor.Charcoal,
          strapName: `${homepageV2AdPrefix}EditorsPicks`,
          sourceId: Strap.EditorPicks
        },
        {
          type: HandlerInputType.NewsSixV2,
          displayName: "coronavirus",
          color: AccentColor.DeepBlue,
          linkUrl: "/" + Section.Coronavirus,
          strapName: `${homepageV2AdPrefix}Coronavirus`,
          sourceId: Strap.Coronavirus
        },
        {
          type: HandlerInputType.Opinion,
          strapName: `${homepageV2AdPrefix}Perspectives`,
          displayName: "perspectives"
        },
        {
          type: HandlerInputType.NewsSixV2,
          displayName: "national",
          color: AccentColor.DeepBlue,
          linkUrl: "/" + Section.National,
          strapName: `${homepageV2AdPrefix}National`,
          sourceId: Strap.National
        },
        {
          type: HandlerInputType.NewsSixV2,
          displayName: "world",
          color: AccentColor.Denim,
          linkUrl: "/" + Section.World,
          strapName: `${homepageV2AdPrefix}World`,
          sourceId: Strap.World
        },
        {
          type: HandlerInputType.MostRead,
          displayName: "most read",
          strapName: `${homepageV2AdPrefix}MostRead`
        },
        {
          type: HandlerInputType.PlayStuff,
          total: 8
        },
        {
          type: HandlerInputType.NewsSixV2,
          displayName: "business",
          color: AccentColor.NavyBlue,
          linkUrl: "/" + Section.Business,
          strapName: `${homepageV2AdPrefix}Business`,
          sourceId: Strap.Business
        },
        {
          type: HandlerInputType.LargeLeadSixV2,
          displayName: "prosper",
          color: AccentColor.NavyBlue,
          linkUrl: "/" + Section.Prosper,
          strapName: `${homepageV2AdPrefix}Prosper`,
          sourceId: Strap.Prosper
        },
        {
          type: HandlerInputType.LargeLeadSixV2,
          displayName: "climate change",
          color: AccentColor.DeepBlue,
          linkUrl: "/" + Section.ClimateChange,
          strapName: `${homepageV2AdPrefix}ClimateChange`,
          sourceId: Strap.ClimateChange
        },
        {
          type: HandlerInputType.BiggieSmallsV2,
          displayName: "sport",
          color: AccentColor.CardinalRed,
          linkUrl: "/" + Section.Sport,
          strapName: `${homepageV2AdPrefix}Sport`,
          sourceId: Strap.Sport
        },
        {
          type: HandlerInputType.BiggieSmallsV2,
          displayName: "travel",
          color: AccentColor.Aqua,
          linkUrl: "/" + Section.Travel,
          strapName: `${homepageV2AdPrefix}Travel`,
          sourceId: Strap.Travel
        },
        {
          type: HandlerInputType.BiggieSmallsV2,
          displayName: "homed",
          color: AccentColor.Cyan,
          linkUrl: "/" + Section.Homed,
          strapName: `${homepageV2AdPrefix}Homed`,
          sourceId: Strap.Homed
        },
        {
          type: HandlerInputType.EditorsPicks,
          displayName: "life & style",
          color: AccentColor.Crimson,
          strapName: `${homepageV2AdPrefix}LifeStyle`,
          sourceId: Strap.LifeStyle
        },
        {
          type: HandlerInputType.BiggieSmallsV2,
          displayName: "entertainment",
          color: AccentColor.Violet,
          linkUrl: "/" + Section.Entertainment,
          strapName: `${homepageV2AdPrefix}Entertainment`,
          sourceId: Strap.Entertainment
        },
        {
          type: HandlerInputType.LargeLeadSixV2,
          displayName: "motoring",
          color: AccentColor.DustyGray,
          linkUrl: "/" + Section.Motoring,
          strapName: `${homepageV2AdPrefix}Motoring`,
          sourceId: Strap.Motoring
        },
        {
          type: HandlerInputType.StripsV2,
          displayName: "spotlight",
          color: AccentColor.DarkGray,
          linkUrl: "/" + Section.Premium,
          sourceId: Strap.Premium,
          strapName: Strap.Premium,
          articleCount: 4
        },
        {
          type: HandlerInputType.TitleSection,
          displayName: "one news",
          displayNameColor: "black",
          linkUrl: "https://play.stuff.co.nz/page/channel-onenews",
          content: {
            type: HandlerInputType.ResponsiveExternalContent,
            lazyLoad: true,
            url:
              "https://www.playwidget.stuff.co.nz/grid/5d3fcb25a0e845001caee780",
            mobile: {
              height: "calc(35% + 35px)",
              width: "100%",
              margin: "0 -10px 20px"
            },
            tablet: {
              height: "170px",
              width: "100%",
              margin: "0 -10px 40px"
            },
            desktop: {
              height: "170px",
              width: "100%",
              margin: "0 -10px 60px"
            }
          }
        },
        {
          type: HandlerInputType.Partner
        },
        {
          type: HandlerInputType.Strips,
          displayName: "",
          color: AccentColor.Orange,
          sourceId: Strap.SponsoredContent,
          strapName: Strap.SponsoredContent,
          articleCount: 4,
          articleFormat: ContentBlockType.HalfWidthImageArticleUnit
        },
        {
          type: HandlerInputType.Brand,
          module: BrandModule.Network
        }
      ],
      billboard(homepageV2AdPrefix)
    )
  ];
  const homepage: HandlerInput[] = interpolateBillboards(
    [
      {
        type: HandlerInputType.ContentBlockHandler,
        contentBlocks: [
          {
            type: ContentBlockType.Oli,
            config: {
              adUnitPath: "/6674/mob.stuff.homepage",
              size: [320, 460],
              targetingParams: {
                spade: "true",
                pos: "interstitial-portrait"
              }
            }
          }
        ]
      },
      {
        type: HandlerInputType.BreakingNews
      },
      {
        type: HandlerInputType.Weather
      },
      {
        type: HandlerInputType.TopStories,
        strapName: `${homepageAdPrefix}TopStoriesDefaultOne`,
        color: AccentColor.CuriousBlue
      },
      {
        type: HandlerInputType.RelevantStories
      },
      {
        type: HandlerInputType.TitleSection,
        displayName: "play stuff",
        displayNameColor: AccentColor.Black,
        linkUrl: "https://play.stuff.co.nz/",
        content: {
          type: HandlerInputType.ResponsiveExternalContent,
          lazyLoad: true,
          url:
            "https://www.playwidget.stuff.co.nz/hgrid/5d06caa81de1c4001f81a46e",
          mobile: {
            width: "100%",
            height: "calc(85% + 40px)",
            margin: "0 -10px 0"
          },
          tablet: {
            width: "100%",
            height: "calc(66% + 40px)",
            margin: "0 -10px 0"
          },
          desktop: {
            width: "100%",
            height: "66%",
            margin: "0 -10px 0"
          }
        }
      },
      {
        type: HandlerInputType.ResponsiveExternalContent,
        lazyLoad: true,
        url:
          "https://interactives.stuff.co.nz/live/homepage/uber/2/320-200.html",
        mobile: {
          height: "320px",
          width: "100%",
          margin: "0 0 20px 0"
        },
        tablet: {
          height: "200px",
          width: "100%",
          margin: "0 0 40px 0"
        },
        desktop: {
          height: "200px",
          width: "100%",
          margin: "0 0 60px 0"
        }
      },
      {
        type: HandlerInputType.SixImage,
        displayName: "",
        color: AccentColor.Gray,
        strapName: `${homepageAdPrefix}MidStrip`,
        sourceId: Strap.MidStrip
      },
      {
        type: HandlerInputType.ResponsiveExternalContent,
        lazyLoad: true,
        url:
          "https://interactives.stuff.co.nz/live/homepage/uber/corona/320-200.html",
        mobile: {
          height: "320px",
          width: "100%",
          margin: "0 0 20px 0"
        },
        tablet: {
          height: "200px",
          width: "100%",
          margin: "0 0 40px 0"
        },
        desktop: {
          height: "200px",
          width: "100%",
          margin: "0 0 60px 0"
        }
      },
      {
        type: HandlerInputType.NewsSix,
        displayName: "coronavirus",
        color: AccentColor.DeepBlue,
        linkUrl: "/" + Section.Coronavirus,
        strapName: `${homepageAdPrefix}Coronavirus`,
        sourceId: Strap.Coronavirus
      },
      {
        type: HandlerInputType.NewsSix,
        displayName: "national",
        color: AccentColor.DeepBlue,
        linkUrl: "/" + Section.National,
        strapName: `${homepageAdPrefix}National`,
        sourceId: Strap.National
      },
      {
        type: HandlerInputType.ResponsiveExternalContent,
        lazyLoad: true,
        url:
          "https://interactives.stuff.co.nz/live/homepage/uber/3/320-200.html",
        mobile: {
          height: "320px",
          width: "100%",
          margin: "0 0 20px 0"
        },
        tablet: {
          height: "200px",
          width: "100%",
          margin: "0 0 40px 0"
        },
        desktop: {
          height: "200px",
          width: "100%",
          margin: "0 0 60px 0"
        }
      },
      {
        type: HandlerInputType.BiggieSmalls,
        displayName: "climate change",
        color: AccentColor.DeepBlue,
        linkUrl: "/" + Section.ClimateChange,
        strapName: `${homepageAdPrefix}ClimateChange`,
        sourceId: Strap.ClimateChange
      },
      {
        type: HandlerInputType.NewsSix,
        displayName: "business",
        color: AccentColor.NavyBlue,
        linkUrl: "/" + Section.Business,
        strapName: `${homepageAdPrefix}Business`,
        sourceId: Strap.Business
      },
      {
        type: HandlerInputType.BiggieSmalls,
        displayName: "homed",
        color: AccentColor.Cyan,
        linkUrl: "/" + Section.Homed,
        strapName: `${homepageAdPrefix}Homed`,
        sourceId: Strap.Homed
      },
      {
        type: HandlerInputType.NewsSix,
        displayName: "prosper",
        color: AccentColor.NavyBlue,
        linkUrl: "/" + Section.Prosper,
        strapName: `${homepageAdPrefix}Prosper`,
        sourceId: Strap.Prosper
      },
      {
        type: HandlerInputType.BiggieSmalls,
        displayName: "travel",
        color: AccentColor.Aqua,
        linkUrl: "/" + Section.Travel,
        strapName: `${homepageAdPrefix}Travel`,
        sourceId: Strap.Travel
      },
      {
        type: HandlerInputType.Strips,
        displayName: "spotlight",
        color: AccentColor.Black,
        linkUrl: "/" + Section.Premium,
        sourceId: Strap.Premium,
        strapName: Strap.Premium,
        articleCount: 4,
        articleFormat: ContentBlockType.FeaturedArticle
      },
      {
        type: HandlerInputType.NewsSix,
        displayName: "world",
        color: AccentColor.Denim,
        linkUrl: "/" + Section.World,
        strapName: `${homepageAdPrefix}World`,
        sourceId: Strap.World
      },
      {
        type: HandlerInputType.TitleSection,
        displayName: "one news",
        displayNameColor: "black",
        linkUrl: "https://play.stuff.co.nz/page/channel-onenews",
        content: {
          type: HandlerInputType.ResponsiveExternalContent,
          lazyLoad: true,
          url:
            "https://www.playwidget.stuff.co.nz/grid/5d3fcb25a0e845001caee780",
          mobile: {
            height: "calc(35% + 35px)",
            width: "100%",
            margin: "0 -10px 20px"
          },
          tablet: {
            height: "170px",
            width: "100%",
            margin: "0 -10px 40px"
          },
          desktop: {
            height: "170px",
            width: "100%",
            margin: "0 -10px 60px"
          }
        }
      },
      {
        type: HandlerInputType.Brand,
        module: BrandModule.Partner
      },
      {
        type: HandlerInputType.BiggieSmalls,
        displayName: "life & style",
        color: AccentColor.Crimson,
        linkUrl: "/" + Section.LifeStyle,
        strapName: `${homepageAdPrefix}LifeStyle`,
        sourceId: Strap.LifeStyle
      },
      {
        type: HandlerInputType.LargeLeadSix,
        displayName: "well & good",
        color: AccentColor.AppleGreen,
        linkUrl: "/" + Section.WellGood,
        strapName: `${homepageAdPrefix}WellGood`,
        sourceId: Strap.WellGood
      },
      {
        type: HandlerInputType.Strips,
        displayName: "food & wine",
        color: AccentColor.Salem,
        linkUrl: "/" + Section.FoodAndWine,
        sourceId: Strap.FoodAndWine,
        strapName: Strap.FoodAndWine,
        articleCount: 4,
        articleFormat: ContentBlockType.HalfWidthImageArticleUnit
      },
      {
        type: HandlerInputType.BiggieSmalls,
        displayName: "entertainment",
        color: AccentColor.Violet,
        linkUrl: "/" + Section.Entertainment,
        strapName: `${homepageAdPrefix}Entertainment`,
        sourceId: Strap.Entertainment
      },
      {
        type: HandlerInputType.BiggieSmalls,
        displayName: "bravo",
        color: AccentColor.Violet,
        linkUrl: "/" + Section.Bravo,
        strapName: `${homepageAdPrefix}Bravo`,
        sourceId: Strap.Bravo
      },
      {
        type: HandlerInputType.TitleSection,
        displayName: "neighbourly",
        displayNameColor: AccentColor.SpringGreen,
        linkUrl: "https://www.neighbourly.co.nz/",
        content: {
          type: HandlerInputType.ResponsiveExternalContent,
          lazyLoad: true,
          url: "https://cdn.neighbourly.co.nz/stuff/933/homepage",
          mobile: {
            height: "550px",
            width: "100%",
            margin: "0 0 3px 0"
          }
        }
      },
      {
        type: HandlerInputType.BiggieSmalls,
        displayName: "motoring",
        color: AccentColor.DustyGray,
        linkUrl: "/" + Section.Motoring,
        strapName: `${homepageAdPrefix}Motoring`,
        sourceId: Strap.Motoring
      },
      {
        type: HandlerInputType.LargeLeadSix,
        displayName: "technology",
        color: AccentColor.RainforestGreen,
        linkUrl: "/" + Section.Technology,
        strapName: `${homepageAdPrefix}Technology`,
        sourceId: Strap.Technology
      },
      {
        type: HandlerInputType.Strips,
        displayName: "nz farmer",
        color: AccentColor.Orange,
        linkUrl: "/" + Section.NZFarmer,
        sourceId: Strap.NZFarmer,
        strapName: Strap.NZFarmer,
        articleCount: 4,
        articleFormat: ContentBlockType.HalfWidthImageArticleUnit
      },
      {
        type: HandlerInputType.Strips,
        displayName: "parenting",
        color: AccentColor.Ruby,
        linkUrl: "/" + Section.Parenting,
        sourceId: Strap.Parenting,
        strapName: Strap.Parenting,
        articleCount: 4,
        articleFormat: ContentBlockType.HalfWidthImageArticleUnit
      },
      {
        type: HandlerInputType.BiggieSmalls,
        displayName: "sport",
        color: AccentColor.CardinalRed,
        linkUrl: "/" + Section.Sport,
        strapName: `${homepageAdPrefix}Sport`,
        sourceId: Strap.Sport
      },
      {
        type: HandlerInputType.Strips,
        displayName: "",
        color: AccentColor.Orange,
        sourceId: Strap.SponsoredContent,
        strapName: Strap.SponsoredContent,
        articleCount: 4,
        articleFormat: ContentBlockType.HalfWidthImageArticleUnit
      },
      {
        type: HandlerInputType.Brand,
        module: BrandModule.Network
      }
    ],
    billboard(homepageAdPrefix)
  );
  return [
    {
      type: HandlerInputType.Feature,
      name: FeatureName.HomepageV2,
      content: homepageV2,
      fallback: homepage
    }
  ];
};

export const oldPage = (): HandlerInput[] => [
  {
    type: HandlerInputType.Weather
  },
  {
    type: HandlerInputType.BreakingNews
  },
  {
    type: HandlerInputType.ExternalContent,
    height: "40px",
    width: "100%",
    margin: "0 0 3px 0",
    url: "https://interactives.stuff.co.nz/voyager/2019/2019-mobile.html"
  },
  {
    type: HandlerInputType.Banner
  },
  {
    type: HandlerInputType.TopStoriesArticleList,
    strapName: "Latest"
  },
  {
    type: HandlerInputType.MiniMidStrip,
    strapName: "MiniMidStrip",
    sourceId: Strap.MiniMidStrip,
    totalArticles:
      homepageStrapsConfig[Strap.MiniMidStrip].totalArticlesWithImages
  },
  {
    type: HandlerInputType.ExternalContent,
    height: "215px",
    width: "100%",
    margin: "0 -10px 20px",
    url: "https://www.playwidget.stuff.co.nz/shelf/5d06caa81de1c4001f81a46e"
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: `Editors' Picks`,
    displayNameColor: "darkblue",
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.EditorPicks,
      strapName: `Editors' Picks`,
      totalBasicArticlesUnit:
        homepageStrapsConfig[Strap.EditorPicks].totalArticlesWithImages,
      totalBasicArticleTitleUnit:
        homepageStrapsConfig[Strap.EditorPicks].totalTitleArticles
    }
  },
  {
    type: HandlerInputType.MidStrip,
    strapName: "MidStrip",
    sourceId: Strap.MidStrip,
    totalArticles: homepageStrapsConfig[Strap.MidStrip].totalArticlesWithImages
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "National",
    displayNameColor: "darkblue",
    linkUrl: "/" + Section.National,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.National,
      strapName: "National",
      totalBasicArticlesUnit: 2,
      totalBasicArticleTitleUnit: 3
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Video",
    displayNameColor: "teal",
    linkUrl: "https://play.stuff.co.nz",
    content: {
      type: HandlerInputType.ExternalContent,
      height: "calc(56% + 216px)",
      width: "100%",
      margin: "0 -10px 10px",
      url: "https://www.playwidget.stuff.co.nz/hshelf/5d3a9a3fa0e845001c7c998a"
    }
  },
  {
    type: HandlerInputType.ExternalContent,
    height: "48px",
    width: "100%",
    margin: "0 0 20px 0",
    url:
      "https://interactives.stuff.co.nz/2019/05/save-the-planet/qstp-small-uber.html"
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Climate Change",
    displayNameColor: "darkblue",
    linkUrl: "/" + Section.ClimateChange,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.ClimateChange,
      strapName: "Climate Change",
      totalBasicArticlesUnit: 2,
      totalBasicArticleTitleUnit: 3
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Business",
    displayNameColor: "royalblue",
    linkUrl: "/" + Section.Business,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.Business,
      strapName: "Business",
      totalBasicArticlesUnit: 2,
      totalBasicArticleTitleUnit: 3
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Homed",
    displayNameColor: "keppel",
    linkUrl: "/" + Section.Homed,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.Homed,
      strapName: "Homed",
      totalBasicArticlesUnit: 2,
      totalBasicArticleTitleUnit: 3
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Travel",
    displayNameColor: "yellowsea",
    linkUrl: "/" + Section.Travel,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.Travel,
      strapName: "Travel",
      totalBasicArticlesUnit: 2,
      totalBasicArticleTitleUnit: 3
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Premium",
    displayNameColor: "premiumdark",
    linkUrl: "/" + Section.Premium,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.Premium,
      strapName: "Premium",
      totalBasicArticlesUnit: 2,
      totalBasicArticleTitleUnit: 3
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "World",
    displayNameColor: "azureblue",
    linkUrl: "/" + Section.World,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.World,
      strapName: "World",
      totalBasicArticlesUnit: 2,
      totalBasicArticleTitleUnit: 3
    }
  },
  {
    type: HandlerInputType.ExternalContent,
    height: "570px",
    width: "100%",
    margin: "0 0 20px 0",
    url: "https://www.neighbourly.co.nz/stuff/strap"
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Daily Fix",
    displayNameColor: "navyblue",
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.DailyFix,
      strapName: "Daily Fix",
      totalBasicArticlesUnit: 3
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Life & Style",
    displayNameColor: "amaranth",
    linkUrl: "/" + Section.LifeStyle,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.LifeStyle,
      strapName: "Life & Style",
      totalBasicArticlesUnit: 2,
      totalBasicArticleTitleUnit: 3
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Well & Good",
    displayNameColor: "sunglow",
    linkUrl: "/" + Section.WellGood,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.WellGood,
      strapName: "Well & Good",
      totalBasicArticlesUnit: 2,
      totalBasicArticleTitleUnit: 3
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Entertainment",
    displayNameColor: "purpleheart",
    linkUrl: "/" + Section.Entertainment,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.Entertainment,
      strapName: "Entertainment",
      totalBasicArticlesUnit: 2,
      totalBasicArticleTitleUnit: 3
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Bravo",
    displayNameColor: "purpleheart",
    linkUrl: "/" + Section.Bravo,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.Bravo,
      strapName: "Bravo",
      totalBasicArticlesUnit: 2,
      totalBasicArticleTitleUnit: 3
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Technology",
    displayNameColor: "carribeangreen",
    linkUrl: "/" + Section.Technology,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.Technology,
      strapName: "Technology",
      totalBasicArticlesUnit: 2,
      totalBasicArticleTitleUnit: 3
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Opinion",
    displayNameColor: "dingley",
    linkUrl: "/" + Section.Opinion,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.Opinion,
      strapName: "Opinion",
      totalBasicArticlesUnit: 2,
      totalBasicArticleTitleUnit: 2
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Motoring",
    displayNameColor: "pizzaz",
    linkUrl: "/" + Section.Motoring,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.Motoring,
      strapName: "Motoring",
      totalBasicArticlesUnit: 2,
      totalBasicArticleTitleUnit: 3
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Stuff Nation",
    displayNameColor: "woodsmoke",
    linkUrl: "/" + Section.StuffNation,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.StuffNation,
      strapName: "Stuff Nation",
      totalBasicArticlesUnit: 2,
      totalBasicArticleTitleUnit: 3
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Sport",
    displayNameColor: "scarlet",
    linkUrl: "/" + Section.Sport,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.Sport,
      strapName: "Sport",
      totalBasicArticlesUnit: 2,
      totalBasicArticleTitleUnit: 3
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "1 News",
    displayNameColor: "darkblue",
    linkUrl: "https://play.stuff.co.nz/page/channel-onenews",
    content: {
      type: HandlerInputType.ExternalContent,
      height: "calc(56% + 216px)",
      width: "100%",
      margin: "0 -10px 10px",
      url: "https://www.playwidget.stuff.co.nz/hshelf/5d3fcb25a0e845001caee780"
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Newsroom.co.nz",
    displayNameColor: "darkblue",
    linkUrl: "/" + Section.Newsroom,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.Newsroom,
      strapName: "Newsroom.co.nz",
      totalBasicArticlesUnit: 3
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Tarana",
    displayNameColor: "scarlet",
    linkUrl: "/" + Section.Tarana,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.Tarana,
      strapName: "Tarana",
      totalBasicArticlesUnit: 2,
      totalBasicArticleTitleUnit: 2
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Sponsored Content",
    displayNameColor: "darkblue",
    linkUrl: "/" + Section.SponsoredContent,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.SponsoredContent,
      strapName: "Sponsored Content",
      totalBasicArticlesUnit: 2
    }
  },
  {
    type: HandlerInputType.ExternalContent,
    height: "580px",
    width: "100%",
    margin: "0 0 3px 0",
    url: "https://cdn.neighbourly.co.nz/stuff/933/homepage"
  }
];
