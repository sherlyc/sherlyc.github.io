import { AccentColor } from "../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../common/__types__/ContentBlockType";
import { HandlerInput } from "../handlers/__types__/HandlerInput";
import { HandlerInputType } from "../handlers/__types__/HandlerInputType";
import { BrandModule } from "../handlers/__types__/IBrandHandlerInput";
import { billboard, interpolateBillboards } from "../orchestrator";
import { Section } from "../section";
import { Strap } from "../strap";

const homepageV2AdPrefix = "homepagev2";

export const pageV2 = (): HandlerInput[] => [
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
