import { IParams } from "../../../__types__/IParams";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { ILargeLeadSixV2HandlerInput } from "../../__types__/ILargeLeadSixV2HandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { AccentColor } from "../../../../../common/__types__/AccentColor";
import { Strap } from "../../../strap";
import largeLeadSixV2 from "./large-lead-six-v2";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import {
  IGridConfig,
  IGridContainer,
} from "../../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IListGridHandlerInput } from "../../__types__/IListGridHandlerInput";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";
import { LargeLeadSixGridPositions } from "../../__types__/ILargeLeadSixGridHandlerInput";

jest.mock("../../../adapters/article-retriever/article-retriever");

const articlesWithIds = (ids: number[]) =>
  ids.map(
    (id) =>
      ({
        id: `${id}`,
        sixteenByNineSrc: `${id}.png`,
        introText: `${id} intro`,
      } as IRawArticle)
  );

const expectContentBlock = (
  props: Partial<IContentBlock> & Pick<IContentBlock, "type">
) => expect.objectContaining(props);

describe("Large Lead Six V2", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const input: ILargeLeadSixV2HandlerInput = {
    type: HandlerInputType.LargeLeadSixV2,
    displayName: "climate change",
    color: AccentColor.AppleGreen,
    linkUrl: "/games",
    strapName: "strapName",
    sourceId: Strap.ClimateChange,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve articles", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue([]);

    await largeLeadSixV2(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledWith(input.sourceId, 6, params);
  });

  it("should create content blocks and pass them to large lead six grid", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      articlesWithIds([1, 2, 3, 4, 5, 6])
    );
    const listGridResult: IGridContainer = {
      type: ContentBlockType.GridContainer,
      items: {},
      mobile: {} as IGridConfig,
      tablet: {} as IGridConfig,
      desktop: {} as IGridConfig,
    };
    handlerRunnerMock.mockResolvedValueOnce([listGridResult]);

    await largeLeadSixV2(handlerRunnerMock, input, params);

    const [
      [listGridHandlerInput, listGridHandlerParams],
      [largeLeadSixGridHandlerInput, largeLeadSixGridParams],
    ] = handlerRunnerMock.mock.calls;

    expect(listGridHandlerInput).toEqual({
      type: HandlerInputType.ListGrid,
      content: [
        expectContentBlock({
          type: ContentBlockType.HomepageArticle,
          id: "2",
          orientation: {
            mobile: Orientation.Portrait,
            tablet: Orientation.Portrait,
            desktop: Orientation.Portrait,
          },
          introText: "2 intro",
          imageSrc: undefined,
        }),
        expectContentBlock({
          type: ContentBlockType.HomepageArticle,
          id: "3",
          orientation: {
            mobile: Orientation.Portrait,
            tablet: Orientation.Portrait,
            desktop: Orientation.Portrait,
          },
          introText: "3 intro",
          imageSrc: undefined,
        }),
        expectContentBlock({
          type: ContentBlockType.HomepageArticle,
          id: "4",
          orientation: {
            mobile: Orientation.Portrait,
            tablet: Orientation.Portrait,
            desktop: Orientation.Portrait,
          },
          introText: undefined,
          imageSrc: undefined,
        }),
        expectContentBlock({
          type: ContentBlockType.HomepageArticle,
          id: "5",
          orientation: {
            mobile: Orientation.Portrait,
            tablet: Orientation.Portrait,
            desktop: Orientation.Portrait,
          },
          introText: undefined,
          imageSrc: undefined,
        }),
        expectContentBlock({
          type: ContentBlockType.HomepageArticle,
          id: "6",
          orientation: {
            mobile: Orientation.Portrait,
            tablet: Orientation.Portrait,
            desktop: Orientation.Portrait,
          },
          introText: undefined,
          imageSrc: undefined,
        }),
      ],
    } as IListGridHandlerInput);
    expect(listGridHandlerParams).toEqual(params);

    expect(largeLeadSixGridHandlerInput).toEqual({
      type: HandlerInputType.LargeLeadSixGrid,
      content: {
        [LargeLeadSixGridPositions.ModuleTitle]: [
          {
            type: ContentBlockType.ModuleHeader,
            title: input.displayName,
            url: input.linkUrl,
            color: input.color,
          },
        ],
        [LargeLeadSixGridPositions.Left]: [
          expect.objectContaining({
            type: ContentBlockType.HomepageArticle,
            id: "1",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait,
            },
            introText: "1 intro",
            imageSrc: "1.png",
          }),
        ],
        [LargeLeadSixGridPositions.Middle]: [listGridResult],
        [LargeLeadSixGridPositions.Right]: [
          {
            type: ContentBlockType.StickyContainer,
            items: [
              {
                type: ContentBlockType.BasicAdUnit,
                context: input.strapName,
              },
            ],
          },
        ],
      },
    });
    expect(largeLeadSixGridParams).toEqual(params);
  });
});
