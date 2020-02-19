import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  IRelevantStoriesGridHandlerInput,
  RelevantStoriesGridPositions
} from "../../__types__/IRelevantStoriesGridHandlerInput";
import {
  Border,
  IGridConfig
} from "../../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: IRelevantStoriesGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const mobile: IGridConfig = {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto auto auto auto auto auto auto",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridBlocks: {
      [RelevantStoriesGridPositions.FirstColumnTitle]: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 1,
        rowSpan: 1,
        border: []
      },
      [RelevantStoriesGridPositions.FirstColumnContent]: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 2,
        rowSpan: 1,
        border: []
      },
      [RelevantStoriesGridPositions.SecondColumnTitle]: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 3,
        rowSpan: 1,
        border: []
      },
      [RelevantStoriesGridPositions.SecondColumnContent]: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 4,
        rowSpan: 1,
        border: []
      },
      [RelevantStoriesGridPositions.ThirdColumnTitle]: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 5,
        rowSpan: 1,
        border: []
      },
      [RelevantStoriesGridPositions.ThirdColumnContent]: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 6,
        rowSpan: 1,
        border: []
      },
      [RelevantStoriesGridPositions.Right]: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 7,
        rowSpan: 1,
        border: []
      }
    }
  };

  const tablet: IGridConfig = {
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "auto auto auto",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridBlocks: {
      [RelevantStoriesGridPositions.FirstColumnTitle]: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 1,
        rowSpan: 1,
        border: []
      },
      [RelevantStoriesGridPositions.FirstColumnContent]: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 2,
        rowSpan: 1,
        border: [Border.right]
      },
      [RelevantStoriesGridPositions.SecondColumnTitle]: {
        columnStart: 2,
        columnSpan: 1,
        rowStart: 1,
        rowSpan: 1,
        border: []
      },
      [RelevantStoriesGridPositions.SecondColumnContent]: {
        columnStart: 2,
        columnSpan: 1,
        rowStart: 2,
        rowSpan: 1,
        border: [Border.right]
      },
      [RelevantStoriesGridPositions.ThirdColumnTitle]: {
        columnStart: 3,
        columnSpan: 1,
        rowStart: 1,
        rowSpan: 1,
        border: []
      },
      [RelevantStoriesGridPositions.ThirdColumnContent]: {
        columnStart: 3,
        columnSpan: 1,
        rowStart: 2,
        rowSpan: 1,
        border: [Border.right]
      },
      [RelevantStoriesGridPositions.Right]: {
        columnStart: 1,
        columnSpan: 3,
        rowStart: 3,
        rowSpan: 1,
        border: [Border.right]
      }
    }
  };

  const desktop: IGridConfig = {
    gridTemplateColumns: "1fr 1fr 1fr 300px",
    gridTemplateRows: "auto auto",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridBlocks: {
      [RelevantStoriesGridPositions.FirstColumnTitle]: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 1,
        rowSpan: 1,
        border: []
      },
      [RelevantStoriesGridPositions.FirstColumnContent]: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 2,
        rowSpan: 1,
        border: [Border.right]
      },
      [RelevantStoriesGridPositions.SecondColumnTitle]: {
        columnStart: 2,
        columnSpan: 1,
        rowStart: 1,
        rowSpan: 1,
        border: []
      },
      [RelevantStoriesGridPositions.SecondColumnContent]: {
        columnStart: 2,
        columnSpan: 1,
        rowStart: 2,
        rowSpan: 1,
        border: [Border.right]
      },
      [RelevantStoriesGridPositions.ThirdColumnTitle]: {
        columnStart: 3,
        columnSpan: 1,
        rowStart: 1,
        rowSpan: 1,
        border: []
      },
      [RelevantStoriesGridPositions.ThirdColumnContent]: {
        columnStart: 3,
        columnSpan: 1,
        rowStart: 2,
        rowSpan: 1,
        border: [Border.right]
      },
      [RelevantStoriesGridPositions.Right]: {
        columnStart: 4,
        columnSpan: 1,
        rowStart: 1,
        rowSpan: 2,
        border: [Border.right]
      }
    }
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile,
      tablet,
      desktop
    }
  ];
}
