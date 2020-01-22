import { IColumnGridHandlerInput } from "../../__types__/IColumnGridHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IParams } from "../../../__types__/IParams";
import { IGridContainer } from "../../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import columnGridHandler from "./column-grid";

const contentBlock = (id: string) => ({ id } as IContentBlock);

describe("Column Grid", () => {
  const handlerRunner = jest.fn();
  const params: IParams = { apiRequestId: "123" };

  it("should handle one column of content", async () => {
    const handlerInput: IColumnGridHandlerInput = {
      type: HandlerInputType.ColumnGrid,
      content: [[contentBlock("1")]]
    };

    const layout = {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto",
      gridBlocks: {
        content0: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        }
      }
    };

    const expected: IGridContainer = {
      type: ContentBlockType.GridContainer,
      items: {
        content0: [contentBlock("1")]
      },
      mobile: {
        ...layout,
        gridColumnGap: "0px",
        gridRowGap: "10px"
      },
      tablet: {
        ...layout,
        gridColumnGap: "15px",
        gridRowGap: "10px"
      },
      desktop: {
        ...layout,
        gridColumnGap: "15px",
        gridRowGap: "10px"
      }
    };

    const result = await columnGridHandler(handlerRunner, handlerInput, params);

    expect(result).toEqual([expected]);
  });

  it("should handle two columns of content", async () => {
    const handlerInput: IColumnGridHandlerInput = {
      type: HandlerInputType.ColumnGrid,
      content: [
        [contentBlock("1"), contentBlock("2")],
        [contentBlock("3"), contentBlock("4")]
      ]
    };

    const mobileLayout = {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto",
      gridColumnGap: "0px",
      gridRowGap: "10px",
      gridBlocks: {
        content0: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content1: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        }
      }
    };

    const tabletLayout = {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "auto",
      gridColumnGap: "15px",
      gridRowGap: "10px",
      gridBlocks: {
        content0: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content1: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        }
      }
    };

    const desktopLayout = {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "auto",
      gridColumnGap: "15px",
      gridRowGap: "10px",
      gridBlocks: {
        content0: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content1: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        }
      }
    };

    const expected: IGridContainer = {
      type: ContentBlockType.GridContainer,
      items: {
        content0: [contentBlock("1"), contentBlock("2")],
        content1: [contentBlock("3"), contentBlock("4")]
      },
      mobile: mobileLayout,
      tablet: tabletLayout,
      desktop: desktopLayout
    };

    const result = await columnGridHandler(handlerRunner, handlerInput, params);
    expect(result).toEqual([expected]);
  });

  it("should handle three columns of content", async () => {
    const handlerInput: IColumnGridHandlerInput = {
      type: HandlerInputType.ColumnGrid,
      content: [
        [contentBlock("1"), contentBlock("2")],
        [contentBlock("3"), contentBlock("4")],
        [contentBlock("5"), contentBlock("6")]
      ]
    };

    const mobileLayout = {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto auto",
      gridColumnGap: "0px",
      gridRowGap: "10px",
      gridBlocks: {
        content0: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content1: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        },
        content2: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 3,
          rowSpan: 1,
          border: []
        }
      }
    };

    const tabletLayout = {
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "auto",
      gridColumnGap: "15px",
      gridRowGap: "10px",
      gridBlocks: {
        content0: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content1: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content2: {
          columnStart: 3,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        }
      }
    };

    const desktopLayout = {
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "auto",
      gridColumnGap: "15px",
      gridRowGap: "10px",
      gridBlocks: {
        content0: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content1: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content2: {
          columnStart: 3,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        }
      }
    };

    const expected: IGridContainer = {
      type: ContentBlockType.GridContainer,
      items: {
        content0: [contentBlock("1"), contentBlock("2")],
        content1: [contentBlock("3"), contentBlock("4")],
        content2: [contentBlock("5"), contentBlock("6")]
      },
      mobile: mobileLayout,
      tablet: tabletLayout,
      desktop: desktopLayout
    };

    const result = await columnGridHandler(handlerRunner, handlerInput, params);

    expect(result).toEqual([expected]);
  });

  it("should handle four columns of content", async () => {
    const handlerInput: IColumnGridHandlerInput = {
      type: HandlerInputType.ColumnGrid,
      content: [
        [contentBlock("1"), contentBlock("2")],
        [contentBlock("3"), contentBlock("4")],
        [contentBlock("5"), contentBlock("6")],
        [contentBlock("7"), contentBlock("8")]
      ]
    };

    const mobileLayout = {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto auto auto",
      gridColumnGap: "0px",
      gridRowGap: "10px",
      gridBlocks: {
        content0: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content1: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        },
        content2: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 3,
          rowSpan: 1,
          border: []
        },
        content3: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 4,
          rowSpan: 1,
          border: []
        }
      }
    };

    const tabletLayout = {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "auto auto",
      gridColumnGap: "15px",
      gridRowGap: "10px",
      gridBlocks: {
        content0: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content1: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content2: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        },
        content3: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        }
      }
    };

    const desktopLayout = {
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      gridTemplateRows: "auto",
      gridColumnGap: "15px",
      gridRowGap: "10px",
      gridBlocks: {
        content0: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content1: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content2: {
          columnStart: 3,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content3: {
          columnStart: 4,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        }
      }
    };

    const expected: IGridContainer = {
      type: ContentBlockType.GridContainer,
      items: {
        content0: [contentBlock("1"), contentBlock("2")],
        content1: [contentBlock("3"), contentBlock("4")],
        content2: [contentBlock("5"), contentBlock("6")],
        content3: [contentBlock("7"), contentBlock("8")]
      },
      mobile: mobileLayout,
      tablet: tabletLayout,
      desktop: desktopLayout
    };

    const result = await columnGridHandler(handlerRunner, handlerInput, params);

    expect(result).toEqual([expected]);
  });

  it("should handle five columns of content", async () => {
    const handlerInput: IColumnGridHandlerInput = {
      type: HandlerInputType.ColumnGrid,
      content: [
        [contentBlock("1"), contentBlock("2")],
        [contentBlock("3"), contentBlock("4")],
        [contentBlock("5"), contentBlock("6")],
        [contentBlock("7"), contentBlock("8")],
        [contentBlock("9"), contentBlock("10")]
      ]
    };

    const mobileLayout = {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto auto auto auto",
      gridColumnGap: "0px",
      gridRowGap: "10px",
      gridBlocks: {
        content0: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content1: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        },
        content2: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 3,
          rowSpan: 1,
          border: []
        },
        content3: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 4,
          rowSpan: 1,
          border: []
        },
        content4: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 5,
          rowSpan: 1,
          border: []
        }
      }
    };

    const tabletLayout = {
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "auto auto",
      gridColumnGap: "15px",
      gridRowGap: "10px",
      gridBlocks: {
        content0: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content1: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content2: {
          columnStart: 3,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content3: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        },
        content4: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        }
      }
    };

    const desktopLayout = {
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
      gridTemplateRows: "auto",
      gridColumnGap: "15px",
      gridRowGap: "10px",
      gridBlocks: {
        content0: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content1: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content2: {
          columnStart: 3,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content3: {
          columnStart: 4,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content4: {
          columnStart: 5,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        }
      }
    };

    const expected: IGridContainer = {
      type: ContentBlockType.GridContainer,
      items: {
        content0: [contentBlock("1"), contentBlock("2")],
        content1: [contentBlock("3"), contentBlock("4")],
        content2: [contentBlock("5"), contentBlock("6")],
        content3: [contentBlock("7"), contentBlock("8")],
        content4: [contentBlock("9"), contentBlock("10")]
      },
      mobile: mobileLayout,
      tablet: tabletLayout,
      desktop: desktopLayout
    };

    const result = await columnGridHandler(handlerRunner, handlerInput, params);

    expect(result).toEqual([expected]);
  });

  it("should handle six columns of content", async () => {
    const handlerInput: IColumnGridHandlerInput = {
      type: HandlerInputType.ColumnGrid,
      content: [
        [contentBlock("1"), contentBlock("2")],
        [contentBlock("3"), contentBlock("4")],
        [contentBlock("5"), contentBlock("6")],
        [contentBlock("7"), contentBlock("8")],
        [contentBlock("9"), contentBlock("10")],
        [contentBlock("11"), contentBlock("12")]
      ]
    };

    const mobileLayout = {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto auto auto auto auto",
      gridColumnGap: "0px",
      gridRowGap: "10px",
      gridBlocks: {
        content0: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content1: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        },
        content2: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 3,
          rowSpan: 1,
          border: []
        },
        content3: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 4,
          rowSpan: 1,
          border: []
        },
        content4: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 5,
          rowSpan: 1,
          border: []
        },
        content5: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 6,
          rowSpan: 1,
          border: []
        }
      }
    };

    const tabletLayout = {
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "auto auto",
      gridColumnGap: "15px",
      gridRowGap: "10px",
      gridBlocks: {
        content0: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content1: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content2: {
          columnStart: 3,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content3: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        },
        content4: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        },
        content5: {
          columnStart: 3,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        }
      }
    };

    const desktopLayout = {
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "auto auto",
      gridColumnGap: "15px",
      gridRowGap: "10px",
      gridBlocks: {
        content0: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content1: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content2: {
          columnStart: 3,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        content3: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        },
        content4: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        },
        content5: {
          columnStart: 3,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        }
      }
    };

    const expected: IGridContainer = {
      type: ContentBlockType.GridContainer,
      items: {
        content0: [contentBlock("1"), contentBlock("2")],
        content1: [contentBlock("3"), contentBlock("4")],
        content2: [contentBlock("5"), contentBlock("6")],
        content3: [contentBlock("7"), contentBlock("8")],
        content4: [contentBlock("9"), contentBlock("10")],
        content5: [contentBlock("11"), contentBlock("12")]
      },
      mobile: mobileLayout,
      tablet: tabletLayout,
      desktop: desktopLayout
    };

    const result = await columnGridHandler(handlerRunner, handlerInput, params);

    expect(result).toEqual([expected]);
  });
});
