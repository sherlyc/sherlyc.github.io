import { ContentBlockType } from "../../common/__types__/ContentBlockType";
import { IPage } from "../../common/__types__/IPage";
import { FeatureName } from "../../common/FeatureName";
import { IParams } from "./__types__/IParams";
import { HandlerInput } from "./handlers/__types__/HandlerInput";
import { HandlerInputType } from "./handlers/__types__/HandlerInputType";
import { BrandModule } from "./handlers/__types__/IBrandHandlerInput";
import { IContentBlockHandlerInput } from "./handlers/__types__/IContentBlockHandlerInput";
import handlerRunner from "./handlers/runner";
import { Section } from "./section";
import { Strap } from "./strap";
import config from "./utils/config";
import logger from "./utils/logger";
import { formatVersion, parseVersion } from "./utils/version";

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
export const newPage = (): HandlerInput[] => {
  const page: HandlerInput[] = [
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
      color: "#2AAAF5"
    },
    {
      type: HandlerInputType.Feature,
      name: FeatureName.HomepageV2,
      content: [
        {
          type: HandlerInputType.TopStoriesV2,
          strapName: `${homepageAdPrefix}TopStoriesDefaultOne`,
          color: "#2AAAF5"
        }
      ],
      fallback: []
    },
    {
      type: HandlerInputType.RelevantStories
    },
    {
      type: HandlerInputType.TitleSection,
      displayName: "play stuff",
      displayNameColor: "#000",
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
      url: "https://interactives.stuff.co.nz/live/homepage/uber/2/320-200.html",
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
      color: "#2AAAF5",
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
      type: HandlerInputType.Feature,
      name: FeatureName.HomepageV2,
      content: [
        {
          type: HandlerInputType.NewsSixV2,
          displayName: "coronavirus",
          color: "#256091",
          linkUrl: "/" + Section.Coronavirus,
          strapName: `${homepageAdPrefix}Coronavirus`,
          sourceId: Strap.Coronavirus
        }
      ]
    },
    {
      type: HandlerInputType.NewsSix,
      displayName: "coronavirus",
      color: "#256091",
      linkUrl: "/" + Section.Coronavirus,
      strapName: `${homepageAdPrefix}Coronavirus`,
      sourceId: Strap.Coronavirus
    },
    {
      type: HandlerInputType.Feature,
      name: FeatureName.HomepageV2,
      content: [
        {
          type: HandlerInputType.NewsSixV2,
          displayName: "national",
          color: "#256091",
          linkUrl: "/" + Section.National,
          strapName: `${homepageAdPrefix}National`,
          sourceId: Strap.National
        }
      ]
    },
    {
      type: HandlerInputType.NewsSix,
      displayName: "national",
      color: "#256091",
      linkUrl: "/" + Section.National,
      strapName: `${homepageAdPrefix}National`,
      sourceId: Strap.National
    },
    {
      type: HandlerInputType.ResponsiveExternalContent,
      lazyLoad: true,
      url: "https://interactives.stuff.co.nz/live/homepage/uber/3/320-200.html",
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
      color: "#256091",
      linkUrl: "/" + Section.ClimateChange,
      strapName: `${homepageAdPrefix}ClimateChange`,
      sourceId: Strap.ClimateChange
    },
    {
      type: HandlerInputType.Feature,
      name: FeatureName.HomepageV2,
      content: [
        {
          type: HandlerInputType.NewsSixV2,
          displayName: "business",
          color: "#0083d7",
          linkUrl: "/" + Section.Business,
          strapName: `${homepageAdPrefix}Business`,
          sourceId: Strap.Business
        }
      ]
    },
    {
      type: HandlerInputType.NewsSix,
      displayName: "business",
      color: "#0083d7",
      linkUrl: "/" + Section.Business,
      strapName: `${homepageAdPrefix}Business`,
      sourceId: Strap.Business
    },
    {
      type: HandlerInputType.BiggieSmalls,
      displayName: "homed",
      color: "#41ad95",
      linkUrl: "/" + Section.Homed,
      strapName: `${homepageAdPrefix}Homed`,
      sourceId: Strap.Homed
    },
    {
      type: HandlerInputType.Feature,
      name: FeatureName.HomepageV2,
      content: [
        {
          type: HandlerInputType.NewsSixV2,
          displayName: "prosper",
          color: "#0083d7",
          linkUrl: "/" + Section.Prosper,
          strapName: `${homepageAdPrefix}Prosper`,
          sourceId: Strap.Prosper
        }
      ]
    },
    {
      type: HandlerInputType.NewsSix,
      displayName: "prosper",
      color: "#0083d7",
      linkUrl: "/" + Section.Prosper,
      strapName: `${homepageAdPrefix}Prosper`,
      sourceId: Strap.Prosper
    },
    {
      type: HandlerInputType.BiggieSmalls,
      displayName: "travel",
      color: "#08afb7",
      linkUrl: "/" + Section.Travel,
      strapName: `${homepageAdPrefix}Travel`,
      sourceId: Strap.Travel
    },
    {
      type: HandlerInputType.Strips,
      displayName: "spotlight",
      color: "#000",
      linkUrl: "/" + Section.Premium,
      sourceId: Strap.Premium,
      strapName: Strap.Premium,
      articleCount: 4,
      articleFormat: ContentBlockType.FeaturedArticle
    },
    {
      type: HandlerInputType.Feature,
      name: FeatureName.HomepageV2,
      content: [
        {
          type: HandlerInputType.NewsSixV2,
          displayName: "world",
          color: "#1272b4",
          linkUrl: "/" + Section.World,
          strapName: `${homepageAdPrefix}World`,
          sourceId: Strap.World
        }
      ]
    },
    {
      type: HandlerInputType.NewsSix,
      displayName: "world",
      color: "#1272b4",
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
        url: "https://www.playwidget.stuff.co.nz/grid/5d3fcb25a0e845001caee780",
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
      color: "#d11242",
      linkUrl: "/" + Section.LifeStyle,
      strapName: `${homepageAdPrefix}LifeStyle`,
      sourceId: Strap.LifeStyle
    },
    {
      type: HandlerInputType.LargeLeadSix,
      displayName: "well & good",
      color: "#42a634",
      linkUrl: "/" + Section.WellGood,
      strapName: `${homepageAdPrefix}WellGood`,
      sourceId: Strap.WellGood
    },
    {
      type: HandlerInputType.Strips,
      displayName: "food & wine",
      color: "#129a5e",
      linkUrl: "/" + Section.FoodAndWine,
      sourceId: Strap.FoodAndWine,
      strapName: Strap.FoodAndWine,
      articleCount: 4,
      articleFormat: ContentBlockType.HalfWidthImageArticleUnit
    },
    {
      type: HandlerInputType.BiggieSmalls,
      displayName: "entertainment",
      color: "#9c1a87",
      linkUrl: "/" + Section.Entertainment,
      strapName: `${homepageAdPrefix}Entertainment`,
      sourceId: Strap.Entertainment
    },
    {
      type: HandlerInputType.BiggieSmalls,
      displayName: "bravo",
      color: "#9c1a87",
      linkUrl: "/" + Section.Bravo,
      strapName: `${homepageAdPrefix}Bravo`,
      sourceId: Strap.Bravo
    },
    {
      type: HandlerInputType.TitleSection,
      displayName: "neighbourly",
      displayNameColor: "#60A735",
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
      color: "#999",
      linkUrl: "/" + Section.Motoring,
      strapName: `${homepageAdPrefix}Motoring`,
      sourceId: Strap.Motoring
    },
    {
      type: HandlerInputType.LargeLeadSix,
      displayName: "technology",
      color: "#00824a",
      linkUrl: "/" + Section.Technology,
      strapName: `${homepageAdPrefix}Technology`,
      sourceId: Strap.Technology
    },
    {
      type: HandlerInputType.Strips,
      displayName: "nz farmer",
      color: "#f36f21",
      linkUrl: "/" + Section.NZFarmer,
      sourceId: Strap.NZFarmer,
      strapName: Strap.NZFarmer,
      articleCount: 4,
      articleFormat: ContentBlockType.HalfWidthImageArticleUnit
    },
    {
      type: HandlerInputType.Strips,
      displayName: "parenting",
      color: "#db0962",
      linkUrl: "/" + Section.Parenting,
      sourceId: Strap.Parenting,
      strapName: Strap.Parenting,
      articleCount: 4,
      articleFormat: ContentBlockType.HalfWidthImageArticleUnit
    },
    {
      type: HandlerInputType.Feature,
      name: FeatureName.HomepageV2,
      content: [
        {
          type: HandlerInputType.Column,
          content: [
            {
              type: HandlerInputType.HalfFour,
              displayName: "NZ Farmer",
              sourceId: Strap.NZFarmer,
              strapName: Strap.NZFarmer,
              color: "#f36f21",
              linkUrl: "/" + Section.NZFarmer
            },
            {
              type: HandlerInputType.HalfFour,
              displayName: "Parenting",
              sourceId: Strap.Parenting,
              strapName: Strap.Parenting,
              linkUrl: "/" + Section.Parenting,
              color: "#db0962"
            }
          ]
        }
      ]
    },
    {
      type: HandlerInputType.BiggieSmalls,
      displayName: "sport",
      color: "#d12421",
      linkUrl: "/" + Section.Sport,
      strapName: `${homepageAdPrefix}Sport`,
      sourceId: Strap.Sport
    },
    {
      type: HandlerInputType.Strips,
      displayName: "",
      color: "#f36f21",
      sourceId: Strap.SponsoredContent,
      strapName: Strap.SponsoredContent,
      articleCount: 4,
      articleFormat: ContentBlockType.HalfWidthImageArticleUnit
    },
    {
      type: HandlerInputType.Brand,
      module: BrandModule.Network
    }
  ];

  const billboard: IContentBlockHandlerInput = {
    type: HandlerInputType.ContentBlockHandler,
    contentBlocks: [
      {
        type: ContentBlockType.BasicAdUnit,
        context: `${homepageAdPrefix}Billboard`
      }
    ]
  };

  return page.reduce(
    (acc: HandlerInput[], currentHandler: HandlerInput) => {
      return [...acc, currentHandler, billboard];
    },
    [billboard]
  );
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
