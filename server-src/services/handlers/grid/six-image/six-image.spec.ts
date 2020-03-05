import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { Strap } from "../../../strap";
import sixImageHandler from "../six-image/six-image";
import { ISixImageHandlerInput } from "../../__types__/ISixImageHandlerInput";
import { IParams } from "../../../__types__/IParams";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import {
  ISixImageGridHandlerInput,
  SixImageGridHandlerPositions
} from "../../__types__/ISixImageGridHandlerInput";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { IBasicAdUnit } from "../../../../../common/__types__/IBasicAdUnit";

jest.mock("../../../adapters/article-retriever/article-retriever");
jest.mock("../../../utils/logger");

describe("Six image", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const strapName = "fakeStrapName";
  const basicAdUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit,
    context: strapName
  };

  const articlesWithIds = (ids: number[]) =>
    ids.map((id) => ({ id: `${id}` } as IRawArticle));

  const expectImageLinkUnitWithId = (id: number) =>
    expect.objectContaining({
      type: ContentBlockType.ImageLinkUnit,
      id: `${id}`
    });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve articles by source id and limit", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      articlesWithIds([1, 2, 3, 4, 5, 6])
    );
    const sourceId = "sourceId" as Strap;
    const input: ISixImageHandlerInput = {
      type: HandlerInputType.SixImage,
      displayName: "FakeName",
      color: "FakeColor",
      strapName,
      sourceId
    };

    await sixImageHandler(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledWith(sourceId, 6, params);
  });

  it("should provide correct inputs to grid", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      articlesWithIds([1, 2, 3, 4, 5, 6])
    );

    const input: ISixImageHandlerInput = {
      type: HandlerInputType.SixImage,
      displayName: "FakeName",
      color: "FakeColor",
      linkUrl: "linkUrl",
      strapName,
      sourceId: Strap.MidStrip
    };

    const expected: ISixImageGridHandlerInput = {
      type: HandlerInputType.SixImageGrid,
      content: {
        [SixImageGridHandlerPositions.ModuleTitle]: [
          {
            type: ContentBlockType.ModuleTitle,
            displayName: input.displayName,
            displayNameColor: input.color,
            linkUrl: input.linkUrl
          }
        ],
        [SixImageGridHandlerPositions.FirstRowLeft]: [
          expectImageLinkUnitWithId(1)
        ],
        [SixImageGridHandlerPositions.FirstRowMiddle]: [
          expectImageLinkUnitWithId(2)
        ],
        [SixImageGridHandlerPositions.FirstRowRight]: [
          expectImageLinkUnitWithId(3)
        ],
        [SixImageGridHandlerPositions.SecondRowLeft]: [
          expectImageLinkUnitWithId(4)
        ],
        [SixImageGridHandlerPositions.SecondRowMiddle]: [
          expectImageLinkUnitWithId(5)
        ],
        [SixImageGridHandlerPositions.SecondRowRight]: [
          expectImageLinkUnitWithId(6)
        ],
        [SixImageGridHandlerPositions.BigRight]: [
          {
            type: ContentBlockType.StickyContainer,
            items: [basicAdUnit]
          }
        ]
      }
    };

    await sixImageHandler(handlerRunnerMock, input, params);

    expect(handlerRunnerMock).toHaveBeenCalledWith(expected, params);
  });
});
