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

const homepageStrapsConfig = config.strapConfig!.homepageStraps;

export default async (params: IParams): Promise<IPage> => {
  try {
    return {
      apiRequestId: params.apiRequestId,
      title: "Latest breaking news NZ | Stuff.co.nz | New Zealand",
      version: process.env.SPADE_VERSION || "SNAPSHOT",
      content: await handlerRunner(
        {
          type: HandlerInputType.Page,
          items: [
            {
              type: HandlerInputType.ForceUpdate,
              forceUpdateOnVersionsBefore: "1.450"
            },
            {
              type: HandlerInputType.Feature,
              name: FeatureName.ModuleLayout,
              content: newPage()
            },
            {
              type: HandlerInputType.Feature,
              name: FeatureName.StrapLayout,
              fallback: oldPage()
            }
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
const newPage = (): HandlerInput[] => {
  const page: HandlerInput[] = [
    {
      type: HandlerInputType.BreakingNews
    },
    {
      type: HandlerInputType.Weather
    },
    {
      type: HandlerInputType.TopStories,
      strapName: `${homepageAdPrefix}TopStoriesDefaultOne`
    },
    {
      type: HandlerInputType.RelevantStories
    },
    {
      type: HandlerInputType.ArticleSection,
      displayName: "play stuff",
      displayNameColor: "black",
      linkUrl:
        "https://www.playwidget.stuff.co.nz/shelf/5d06caa81de1c4001f81a46e",
      content: {
        type: HandlerInputType.ExternalContent,
        height: "215px",
        width: "100%",
        margin: "0 -10px 20px",
        url: "https://www.playwidget.stuff.co.nz/shelf/5d06caa81de1c4001f81a46e"
      }
    },
    {
      type: HandlerInputType.ResponsiveExternalContent,
      url:
        "https://interactives.stuff.co.nz/live/homepage/uber/index-editorial-pointer.html",
      mobile: {
        height: "320px",
        width: "100%",
        margin: "0 0 20px 0"
      },
      tablet: {
        height: "200px",
        width: "100%",
        margin: "0 0 20px 0"
      },
      desktop: {
        height: "200px",
        width: "100%",
        margin: "0 0 20px 0"
      }
    },
    {
      type: HandlerInputType.SixImage,
      displayName: "",
      displayNameColor: "",
      strapName: `${homepageAdPrefix}MidStrip`,
      sourceId: Strap.MidStrip
    },
    {
      type: HandlerInputType.NewsSix,
      displayName: "national",
      displayNameColor: "darkblue",
      linkUrl: "/" + Section.National,
      strapName: `${homepageAdPrefix}National`,
      sourceId: Strap.National
    },
    {
      type: HandlerInputType.BiggieSmalls,
      displayName: "climate change",
      displayNameColor: "darkblue",
      linkUrl: "/" + Section.ClimateChange,
      strapName: `${homepageAdPrefix}ClimateChange`,
      sourceId: Strap.ClimateChange
    },
    {
      type: HandlerInputType.NewsSix,
      displayName: "business",
      displayNameColor: "royalblue",
      linkUrl: "/" + Section.Business,
      strapName: `${homepageAdPrefix}Business`,
      sourceId: Strap.Business
    },
    {
      type: HandlerInputType.BiggieSmalls,
      displayName: "homed",
      displayNameColor: "keppel",
      linkUrl: "/" + Section.Homed,
      strapName: `${homepageAdPrefix}Homed`,
      sourceId: Strap.Homed
    },
    {
      type: HandlerInputType.BiggieSmalls,
      displayName: "travel",
      displayNameColor: "yellowsea",
      linkUrl: "/" + Section.Travel,
      strapName: `${homepageAdPrefix}Travel`,
      sourceId: Strap.Travel
    },
    {
      type: HandlerInputType.Strips,
      displayName: "spotlight",
      displayNameColor: "premiumdark",
      linkUrl: "/" + Section.Premium,
      sourceId: Strap.Premium,
      strapName: Strap.Premium,
      articleCount: 4,
      articleFormat: ContentBlockType.FeaturedArticle
    },
    {
      type: HandlerInputType.NewsSix,
      displayName: "world",
      displayNameColor: "azureblue",
      linkUrl: "/" + Section.World,
      strapName: `${homepageAdPrefix}World`,
      sourceId: Strap.World
    },
    {
      type: HandlerInputType.ArticleSection,
      displayName: "one news play stuff",
      displayNameColor: "black",
      linkUrl: "https://play.stuff.co.nz/page/channel-onenews",
      content: {
        type: HandlerInputType.ExternalContent,
        height: "calc(56% + 216px)",
        width: "100%",
        margin: "0 -10px 10px",
        url:
          "https://www.playwidget.stuff.co.nz/hshelf/5d3fcb25a0e845001caee780"
      }
    },
    {
      type: HandlerInputType.Brand,
      module: BrandModule.Partner
    },
    {
      type: HandlerInputType.NewsSix,
      displayName: "kea kids",
      displayNameColor: "darkblue",
      linkUrl: "/" + Section.KeaKidsNews,
      strapName: `${homepageAdPrefix}KeaKidsNews`,
      sourceId: Strap.KeaKidsNews
    },
    {
      type: HandlerInputType.BiggieSmalls,
      displayName: "life & style",
      displayNameColor: "amaranth",
      linkUrl: "/" + Section.LifeStyle,
      strapName: `${homepageAdPrefix}LifeStyle`,
      sourceId: Strap.LifeStyle
    },
    {
      type: HandlerInputType.LargeLeadSix,
      displayName: "well & good",
      displayNameColor: "sunglow",
      linkUrl: "/" + Section.WellGood,
      strapName: `${homepageAdPrefix}WellGood`,
      sourceId: Strap.WellGood
    },
    {
      type: HandlerInputType.LargeLeadSix,
      displayName: "food & wine",
      displayNameColor: "junglegreen",
      linkUrl: "/" + Section.FoodAndWine,
      strapName: `${homepageAdPrefix}FoodAndWine`,
      sourceId: Strap.FoodAndWine
    },
    {
      type: HandlerInputType.BiggieSmalls,
      displayName: "entertainment",
      displayNameColor: "purpleheart",
      linkUrl: "/" + Section.Entertainment,
      strapName: `${homepageAdPrefix}Entertainment`,
      sourceId: Strap.Entertainment
    },
    {
      type: HandlerInputType.BiggieSmalls,
      displayName: "bravo",
      displayNameColor: "purpleheart",
      linkUrl: "/" + Section.Bravo,
      strapName: `${homepageAdPrefix}Bravo`,
      sourceId: Strap.Bravo
    },
    {
      type: HandlerInputType.BiggieSmalls,
      displayName: "motoring",
      displayNameColor: "pizzaz",
      linkUrl: "/" + Section.Motoring,
      strapName: `${homepageAdPrefix}Motoring`,
      sourceId: Strap.Motoring
    },
    {
      type: HandlerInputType.LargeLeadSix,
      displayName: "technology",
      displayNameColor: "carribeangreen",
      linkUrl: "/" + Section.Technology,
      strapName: `${homepageAdPrefix}Technology`,
      sourceId: Strap.Technology
    },
    {
      type: HandlerInputType.LargeLeadSix,
      displayName: "nz farmer",
      displayNameColor: "pizzaz",
      linkUrl: "/" + Section.NZFarmer,
      strapName: `${homepageAdPrefix}NzFarmer`,
      sourceId: Strap.NZFarmer
    },
    {
      type: HandlerInputType.LargeLeadSix,
      displayName: "parenting",
      displayNameColor: "amaranth",
      linkUrl: "/" + Section.Parenting,
      strapName: `${homepageAdPrefix}Parenting`,
      sourceId: Strap.Parenting
    },
    {
      type: HandlerInputType.BiggieSmalls,
      displayName: "sport",
      displayNameColor: "scarlet",
      linkUrl: "/" + Section.Sport,
      strapName: `${homepageAdPrefix}Sport`,
      sourceId: Strap.Sport
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

const oldPage = (): HandlerInput[] => [
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
    type: HandlerInputType.Feature,
    name: FeatureName.Recommendation,
    content: [
      {
        type: HandlerInputType.Recommendations,
        displayName: "Recommended for You",
        displayNameColor: "darkblue",
        totalBasicArticlesUnit: 2,
        totalBasicArticleTitleUnit: 3
      }
    ]
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
    displayName: "Property",
    displayNameColor: "royalblue",
    linkUrl: "/" + Section.Property,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.Property,
      strapName: "Property",
      totalBasicArticlesUnit: 2,
      totalBasicArticleTitleUnit: 3
    }
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
    displayName: "KEA Kids News",
    displayNameColor: "darkblue",
    linkUrl: "/" + Section.KeaKidsNews,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.KeaKidsNews,
      strapName: "KEA Kids News",
      totalBasicArticlesUnit: 2
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
    displayName: "Noted",
    displayNameColor: "darkblue",
    linkUrl: "/" + Section.Noted,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.Noted,
      strapName: "Noted",
      totalBasicArticlesUnit: 2
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Now to Love",
    displayNameColor: "amaranth",
    linkUrl: "/" + Section.NowToLove,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.NowToLove,
      strapName: "Now to Love",
      totalBasicArticlesUnit: 2
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Homes to Love",
    displayNameColor: "amaranth",
    linkUrl: "/" + Section.HomesToLove,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.HomesToLove,
      strapName: "Homes to Love",
      totalBasicArticlesUnit: 2
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Food to Love",
    displayNameColor: "amaranth",
    linkUrl: "/" + Section.FoodToLove,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.FoodToLove,
      strapName: "Food to Love",
      totalBasicArticlesUnit: 2
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "BeautyHeaven",
    displayNameColor: "amaranth",
    linkUrl: "/" + Section.BeautyHeaven,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.BeautyHeaven,
      strapName: "BeautyHeaven",
      totalBasicArticlesUnit: 2
    }
  },
  {
    type: HandlerInputType.ArticleSection,
    displayName: "Metro",
    displayNameColor: "amaranth",
    linkUrl: "/" + Section.Metro,
    content: {
      type: HandlerInputType.ArticleList,
      sourceId: Strap.Metro,
      strapName: "Metro",
      totalBasicArticlesUnit: 2
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
