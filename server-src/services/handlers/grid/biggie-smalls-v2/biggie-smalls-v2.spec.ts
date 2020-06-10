import { AccentColor } from "../../../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IBasicAdUnit } from "../../../../../common/__types__/IBasicAdUnit";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { Strap } from "../../../strap";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  BiggieSmallsV2GridPositions,
  IBiggieSmallsV2GridHandlerInput
} from "../../__types__/IBiggieSmallsV2GridHandlerInput";
import { IBiggieSmallsV2HandlerInput } from "../../__types__/IBiggieSmallsV2HandlerInput";
import biggieSmallsV2Handler from "./biggie-smalls-v2";

jest.mock("../../../adapters/article-retriever/article-retriever");
jest.mock("../../../adapters/layout/layout-retriever");

const fakeArticlesWithIds = (ids: number[]) =>
  ids.map(
    (id) =>
      ({
        id: `${id}`,
        sixteenByNineSrc: `${id}.16:9.jpg`,
        introText: `${id} intro`
      } as IRawArticle)
  );

const expectContentBlock = (
  props: Partial<IContentBlock> & Pick<IContentBlock, "type">
) => expect.objectContaining(props);

describe("Biggie Smalls", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const sourceId = Strap.Motoring;
  const strapName = "motoring-strap";
  const displayName = "motoring";
  const color = AccentColor.Black;
  const linkUrl = "http://www.stuff.co.nz";
  const input: IBiggieSmallsV2HandlerInput = {
    type: HandlerInputType.BiggieSmallsV2,
    displayName,
    color,
    strapName,
    sourceId,
    linkUrl
  };

  const basicAdUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit,
    context: strapName
  };

  beforeEach(async () => {
    jest.resetAllMocks();

    (getRawArticles as jest.Mock).mockResolvedValue(
      fakeArticlesWithIds([1, 2, 3, 4, 5, 6, 7])
    );
  });

  it("should retrieve right number of articles", async () => {
    await biggieSmallsV2Handler(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledWith(Strap.Motoring, 7, params);
  });

  it("should provide correct input to next handler", async () => {
    const fakeResult = {};
    handlerRunnerMock.mockResolvedValue(fakeResult);

    await biggieSmallsV2Handler(handlerRunnerMock, input, params);

    const expected: IBiggieSmallsV2GridHandlerInput = {
      type: HandlerInputType.BiggieSmallsV2Grid,
      content: {
        [BiggieSmallsV2GridPositions.ModuleTitle]: [
          expectContentBlock({
            type: ContentBlockType.ModuleTitle,
            displayName: input.displayName,
            displayNameColor: input.color,
            linkUrl: input.linkUrl
          })
        ],
        [BiggieSmallsV2GridPositions.Highlight]: [
          expectContentBlock({
            type: ContentBlockType.FeaturedArticle,
            id: "1"
          })
        ],
        [BiggieSmallsV2GridPositions.RightOne]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "2",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait
            },
            imageSrc: "2.16:9.jpg",
            introText: "2 intro"
          })
        ],
        [BiggieSmallsV2GridPositions.LeftOne]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "3",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait
            },
            imageSrc: "3.16:9.jpg",
            introText: "3 intro"
          })
        ],
        [BiggieSmallsV2GridPositions.LeftTwo]: [
          expectContentBlock({
            type: ContentBlockType.BasicAdUnit,
            context: strapName
          })
        ],
        [BiggieSmallsV2GridPositions.RightTwo]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "4",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait
            },
            imageSrc: undefined,
            introText: "4 intro"
          })
        ],
        [BiggieSmallsV2GridPositions.RightThree]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "5",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait
            },
            imageSrc: undefined,
            introText: undefined
          })
        ],
        [BiggieSmallsV2GridPositions.RightFour]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "6",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait
            },
            imageSrc: undefined,
            introText: undefined
          })
        ],
        [BiggieSmallsV2GridPositions.RightFive]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "7",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait
            },
            imageSrc: undefined,
            introText: undefined
          })
        ],
        [BiggieSmallsV2GridPositions.BannerAd]: [
          { type: ContentBlockType.StickyContainer, items: [basicAdUnit] }
        ]
      }
    };

    expect(handlerRunnerMock).toHaveBeenCalledWith(expected, params);
  });
});
