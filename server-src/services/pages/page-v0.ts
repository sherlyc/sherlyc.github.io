import { HandlerInput } from "../handlers/__types__/HandlerInput";
import { HandlerInputType } from "../handlers/__types__/HandlerInputType";
import { Section } from "../section";
import { Strap } from "../strap";
import config from "../utils/config";

const homepageStrapsConfig = config.strapConfig!.homepageStraps;

export const pageV0 = (): HandlerInput[] => [
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
