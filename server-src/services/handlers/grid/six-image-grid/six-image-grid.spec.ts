import {
  ISixImageGridHandlerInput,
  SixImageGridHandlerPositions
} from "../../__types__/ISixImageGridHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import {
  BigImageArticleUnitLayout,
  IBigImageArticleUnit
} from "../../../../../common/__types__/IBigImageArticleUnit";
import { IBasicAdUnit } from "../../../../../common/__types__/IBasicAdUnit";
import { IGridContainer } from "../../../../../common/__types__/IGridContainer";
import { IModuleTitle } from "../../../../../common/__types__/IModuleTitle";
import { IParams } from "../../../__types__/IParams";
import sixImageGridHandler from "./six-image-grid";

describe("Six Image Grid", () => {
  const handlerRunner = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const strapName = "fakeStrapName";
  const bigImageArticle: IBigImageArticleUnit = {
    type: ContentBlockType.BigImageArticleUnit,
    id: "1",
    strapName,
    indexHeadline: "Headline 1",
    title: "Title One",
    introText: "Intro 1",
    linkUrl: "/link1",
    imageSrc: "strap1.jpg",
    imageSrcSet: "strap1.jpg 1w",
    lastPublishedTime: 1,
    headlineFlags: [],
    layout: BigImageArticleUnitLayout.module
  };
  const basicAdUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit,
    context: strapName
  };
  const moduleTitle: IModuleTitle = {
    type: ContentBlockType.ModuleTitle,
    displayName: "displayName",
    displayNameColor: "displayNameColor"
  };

  it("should create grid container with content passed in", async () => {
    const handlerInput: ISixImageGridHandlerInput = {
      type: HandlerInputType.SixImageGrid,
      content: {
        [SixImageGridHandlerPositions.ModuleTitle]: [moduleTitle],
        [SixImageGridHandlerPositions.FirstRowLeft]: [bigImageArticle],
        [SixImageGridHandlerPositions.FirstRowMiddle]: [bigImageArticle],
        [SixImageGridHandlerPositions.FirstRowRight]: [bigImageArticle],
        [SixImageGridHandlerPositions.SecondRowLeft]: [bigImageArticle],
        [SixImageGridHandlerPositions.SecondRowMiddle]: [bigImageArticle],
        [SixImageGridHandlerPositions.SecondRowRight]: [bigImageArticle],
        [SixImageGridHandlerPositions.BigRight]: [basicAdUnit]
      }
    };

    const desktop = {
      [SixImageGridHandlerPositions.ModuleTitle]: {
        columnStart: 1,
        columnSpan: 4,
        rowStart: 1,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.FirstRowLeft]: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 2,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.FirstRowMiddle]: {
        columnStart: 2,
        columnSpan: 1,
        rowStart: 2,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.FirstRowRight]: {
        columnStart: 3,
        columnSpan: 1,
        rowStart: 2,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.SecondRowLeft]: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 3,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.SecondRowMiddle]: {
        columnStart: 2,
        columnSpan: 1,
        rowStart: 3,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.SecondRowRight]: {
        columnStart: 3,
        columnSpan: 1,
        rowStart: 3,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.BigRight]: {
        columnStart: 4,
        columnSpan: 1,
        rowStart: 2,
        rowSpan: 2,
        border: []
      }
    };

    const tablet = {
      [SixImageGridHandlerPositions.ModuleTitle]: {
        columnStart: 1,
        columnSpan: 3,
        rowStart: 1,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.FirstRowLeft]: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 2,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.FirstRowMiddle]: {
        columnStart: 2,
        columnSpan: 1,
        rowStart: 2,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.FirstRowRight]: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 3,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.SecondRowLeft]: {
        columnStart: 2,
        columnSpan: 1,
        rowStart: 3,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.SecondRowMiddle]: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 4,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.SecondRowRight]: {
        columnStart: 2,
        columnSpan: 1,
        rowStart: 4,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.BigRight]: {
        columnStart: 3,
        columnSpan: 1,
        rowStart: 2,
        rowSpan: 3,
        border: []
      }
    };

    const mobile = {
      [SixImageGridHandlerPositions.ModuleTitle]: {
        columnStart: 1,
        columnSpan: 2,
        rowStart: 1,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.FirstRowLeft]: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 2,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.FirstRowMiddle]: {
        columnStart: 2,
        columnSpan: 1,
        rowStart: 2,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.FirstRowRight]: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 3,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.SecondRowLeft]: {
        columnStart: 2,
        columnSpan: 1,
        rowStart: 3,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.SecondRowMiddle]: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 4,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.SecondRowRight]: {
        columnStart: 2,
        columnSpan: 1,
        rowStart: 4,
        rowSpan: 1,
        border: []
      },
      [SixImageGridHandlerPositions.BigRight]: {
        columnStart: 1,
        columnSpan: 2,
        rowStart: 5,
        rowSpan: 1,
        border: []
      }
    };

    const expectedContainer: IGridContainer = {
      type: ContentBlockType.GridContainer,
      items: {
        ModuleTitle: [moduleTitle],
        FirstRowLeft: [bigImageArticle],
        FirstRowMiddle: [bigImageArticle],
        FirstRowRight: [bigImageArticle],
        SecondRowLeft: [bigImageArticle],
        SecondRowMiddle: [bigImageArticle],
        SecondRowRight: [bigImageArticle],
        BigRight: [basicAdUnit]
      },
      desktop: {
        gridTemplateColumns: "1fr 1fr 1fr 300px",
        gridTemplateRows: "auto auto auto",
        gridColumnGap: "20px",
        gridRowGap: "40px",
        gridBlocks: desktop
      },
      tablet: {
        gridTemplateColumns: "1fr 1fr 300px",
        gridTemplateRows: "auto auto auto auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: tablet
      },
      mobile: {
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto auto auto auto auto",
        gridColumnGap: "10px",
        gridRowGap: "10px",
        gridBlocks: mobile
      }
    };

    const result = await sixImageGridHandler(
      handlerRunner,
      handlerInput,
      params
    );

    expect(result).toEqual([expectedContainer]);
  });
});
