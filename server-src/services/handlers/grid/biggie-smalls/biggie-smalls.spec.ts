import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { Strap } from "../../../strap";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { BiggieSmallsGridPositions } from "../../__types__/IBiggieSmallsGridHandlerInput";
import { IBiggieSmallsHandlerInput } from "../../__types__/IBiggieSmallsHandlerInput";
import biggieSmallsHandler, {
  ARTICLE_CAPACITY_BIGGIE_SMALLS
} from "./biggie-smalls";

jest.mock("../../../adapters/article-retriever/article-retriever");
jest.mock("../../../adapters/layout/layout-retriever");

const fakeArticlesWithIds = (ids: number[]) =>
  ids.map((id) => ({ id: `${id}` } as IRawArticle));

const expectContentBlock = (
  props: Partial<IContentBlock> & Pick<IContentBlock, "type">
) => expect.objectContaining(props);

describe("Biggie Smalls", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const sourceId = Strap.Motoring;
  const strapName = "motoring-strap";
  const displayName = "motoring";
  const color = "#000";
  const linkUrl = "http://www.stuff.co.nz";
  const biggieSmallsHandlerInput: IBiggieSmallsHandlerInput = {
    type: HandlerInputType.BiggieSmalls,
    displayName,
    color,
    strapName,
    sourceId,
    linkUrl
  };

  beforeEach(async () => {
    jest.resetAllMocks();

    (getRawArticles as jest.Mock).mockResolvedValue(
      fakeArticlesWithIds([1, 2, 3, 4, 5, 6, 7])
    );
  });

  it("should retrieve right count of articles", async () => {
    await biggieSmallsHandler(
      handlerRunnerMock,
      biggieSmallsHandlerInput,
      params
    );

    expect(getRawArticles).toHaveBeenCalledWith(
      Strap.Motoring,
      ARTICLE_CAPACITY_BIGGIE_SMALLS,
      params
    );
  });

  it("should call list grid", async () => {
    await biggieSmallsHandler(
      handlerRunnerMock,
      biggieSmallsHandlerInput,
      params
    );

    expect(handlerRunnerMock).toHaveBeenNthCalledWith(
      1,
      {
        type: HandlerInputType.ListGrid,
        content: ["3", "4", "5", "6", "7"].map((id) =>
          expectContentBlock({
            type: ContentBlockType.BasicArticleTitleUnit,
            id
          })
        )
      },
      params
    );
  });

  it("should call biggie smalls grid", async () => {
    handlerRunnerMock.mockResolvedValueOnce([
      {
        type: ContentBlockType.GridContainer
      }
    ]);

    await biggieSmallsHandler(
      handlerRunnerMock,
      biggieSmallsHandlerInput,
      params
    );

    expect(handlerRunnerMock).toHaveBeenNthCalledWith(
      2,
      {
        type: HandlerInputType.BiggieSmallsGrid,
        content: {
          [BiggieSmallsGridPositions.ModuleTitle]: [
            expectContentBlock({
              type: ContentBlockType.ModuleTitle,
              displayName,
              displayNameColor: color,
              linkUrl
            })
          ],
          [BiggieSmallsGridPositions.Highlight]: [
            expectContentBlock({
              type: ContentBlockType.ResponsiveBigImageArticle,
              id: "1"
            })
          ],
          [BiggieSmallsGridPositions.Right]: [
            expectContentBlock({
              type: ContentBlockType.BasicAdUnit,
              context: strapName
            })
          ],
          [BiggieSmallsGridPositions.FirstRow1]: [
            expectContentBlock({
              type: ContentBlockType.HalfWidthImageArticleUnit,
              id: "2"
            })
          ],
          [BiggieSmallsGridPositions.FirstRow2]: [
            expectContentBlock({
              type: ContentBlockType.GridContainer
            })
          ],
          [BiggieSmallsGridPositions.FirstRow3]: [
            expectContentBlock({
              type: ContentBlockType.BasicAdUnit,
              context: strapName
            })
          ]
        }
      },
      params
    );
  });
});
