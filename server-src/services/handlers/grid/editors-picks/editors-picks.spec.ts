import { AccentColor } from "../../../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { Strap } from "../../../strap";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  EditorsPicksGridPositions,
  IEditorsPicksGridHandlerInput,
} from "../../__types__/IEditorsPicksGridHandlerInput";
import { IEditorsPicksHandlerInput } from "../../__types__/IEditorsPicksHandlerInput";
import editorsPicks from "../editors-picks/editors-picks";

jest.mock("../../../adapters/article-retriever/article-retriever");

describe("Editors Picks", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const input: IEditorsPicksHandlerInput = {
    type: HandlerInputType.EditorsPicks,
    sourceId: Strap.EditorPicks,
    displayName: "editors' picks",
    color: AccentColor.Charcoal,
    strapName: "editorsPicks",
  };

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

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve 8 articles", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      articlesWithIds([1, 2, 3, 4, 5, 6, 7, 8])
    );

    await editorsPicks(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledWith(input.sourceId, 8, params);
  });

  it("should call editors picks grid with correct content", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      articlesWithIds([1, 2, 3, 4, 5, 6, 7, 8])
    );

    await editorsPicks(handlerRunnerMock, input, params);

    const expectedGridHandlerInput: IEditorsPicksGridHandlerInput = {
      type: HandlerInputType.EditorsPicksGrid,
      content: {
        [EditorsPicksGridPositions.ModuleTitle]: [
          {
            type: ContentBlockType.ModuleHeader,
            color: input.color,
            title: input.displayName,
          },
        ],
        [EditorsPicksGridPositions.FirstRowOne]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "1",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait,
            },
            introText: undefined,
            imageSrc: "1.png",
          }),
        ],
        [EditorsPicksGridPositions.FirstRowTwo]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "2",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait,
            },
            introText: undefined,
            imageSrc: "2.png",
          }),
        ],
        [EditorsPicksGridPositions.FirstRowThree]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "3",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait,
            },
            introText: undefined,
            imageSrc: "3.png",
          }),
        ],
        [EditorsPicksGridPositions.FirstRowFour]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "4",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait,
            },
            introText: undefined,
            imageSrc: "4.png",
          }),
        ],
        [EditorsPicksGridPositions.SecondRowOne]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "5",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait,
            },
            introText: undefined,
            imageSrc: "5.png",
          }),
        ],
        [EditorsPicksGridPositions.SecondRowTwo]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "6",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait,
            },
            introText: undefined,
            imageSrc: "6.png",
          }),
        ],
        [EditorsPicksGridPositions.SecondRowThree]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "7",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait,
            },
            introText: undefined,
            imageSrc: "7.png",
          }),
        ],
        [EditorsPicksGridPositions.SecondRowFour]: [
          expectContentBlock({
            type: ContentBlockType.HomepageArticle,
            id: "8",
            orientation: {
              mobile: Orientation.Portrait,
              tablet: Orientation.Portrait,
              desktop: Orientation.Portrait,
            },
            introText: undefined,
            imageSrc: "8.png",
          }),
        ],
        [EditorsPicksGridPositions.Ad]: [
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
    };

    expect(handlerRunnerMock).toHaveBeenCalledWith(
      expectedGridHandlerInput,
      params
    );
  });
});
