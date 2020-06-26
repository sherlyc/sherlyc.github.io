import { flatMap } from "lodash-es";
import { AccentColor } from "../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../common/__types__/ContentBlockType";
import { HandlerInput } from "../handlers/__types__/HandlerInput";
import { HandlerInputType } from "../handlers/__types__/HandlerInputType";
import { BrandModule } from "../handlers/__types__/IBrandHandlerInput";
import { IContentBlockHandlerInput } from "../handlers/__types__/IContentBlockHandlerInput";
import { Section } from "../section";
import { Strap } from "../strap";

const homepageAdPrefix = "homepage";

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

export const pageV1 = (): HandlerInput[] =>
  interpolateBillboards(
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
