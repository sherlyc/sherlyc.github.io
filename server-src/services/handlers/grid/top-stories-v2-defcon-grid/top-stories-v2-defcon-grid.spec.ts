import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  Border,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { repeat } from "lodash-es";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  ITopStoriesV2DefconGridHandlerInput,
  TopStoriesV2DefconGridPositions
} from "../../__types__/ITopStoriesV2DefconGridHandlerInput";
import topStoriesV2Defcon from "./top-stories-v2-defcon-grid";

describe("Top Stories Defcon grid", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const fakeContentBlock = {} as IContentBlock;
  const input: ITopStoriesV2DefconGridHandlerInput = {
    type: HandlerInputType.TopStoriesV2DefconGrid,
    content: {
      [TopStoriesV2DefconGridPositions.Defcon]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.TopOne]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.TopTwo]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.TopThree]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.TopFour]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.TopFive]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.BottomOne]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.BottomTwo]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.BottomThree]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.BottomFour]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.BottomFive]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.BannerAd]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.MidInsert]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.LowerRight]: [fakeContentBlock]
    }
  };

  it("should return mobile grid config", async () => {
    const [grid] = await topStoriesV2Defcon(handlerRunnerMock, input, params);
    expect((grid as IGridContainer).mobile).toEqual({
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: repeat(" auto", 12).substring(1),
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [TopStoriesV2DefconGridPositions.Defcon]: gridBlock(1, 1, 1, 2, []),
        [TopStoriesV2DefconGridPositions.BannerAd]: gridBlock(2, 1, 1, 2, []),
        [TopStoriesV2DefconGridPositions.TopOne]: gridBlock(3, 1, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.TopTwo]: gridBlock(3, 2, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.TopThree]: gridBlock(4, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.TopFour]: gridBlock(5, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.TopFive]: gridBlock(6, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.MidInsert]: gridBlock(7, 1, 1, 2, []),
        [TopStoriesV2DefconGridPositions.BottomOne]: gridBlock(8, 1, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.BottomTwo]: gridBlock(8, 2, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.BottomThree]: gridBlock(9, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.BottomFour]: gridBlock(10, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.BottomFive]: gridBlock(11, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.LowerRight]: gridBlock(12, 1, 1, 2, [])
      }
    });
  });

  it("should return tablet grid config", async () => {
    const [grid] = await topStoriesV2Defcon(handlerRunnerMock, input, params);
    expect((grid as IGridContainer).tablet).toEqual({
      gridTemplateColumns: "1fr 1fr 300px",
      gridTemplateRows: repeat(" auto", 11).substring(1),
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [TopStoriesV2DefconGridPositions.Defcon]: gridBlock(1, 1, 1, 3, []),
        [TopStoriesV2DefconGridPositions.TopOne]: gridBlock(2, 1, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.TopTwo]: gridBlock(2, 2, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.TopThree]: gridBlock(3, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.TopFour]: gridBlock(4, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.TopFive]: gridBlock(5, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.MidInsert]: gridBlock(6, 1, 1, 2, [Border.bottom]),
        [TopStoriesV2DefconGridPositions.BottomOne]: gridBlock(7, 1, 2, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.BottomTwo]: gridBlock(7, 2, 2, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.BottomThree]: gridBlock(9, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.BottomFour]: gridBlock(10, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.BottomFive]: gridBlock(11, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.BannerAd]: gridBlock(2, 3, 6, 1, []),
        [TopStoriesV2DefconGridPositions.LowerRight]: gridBlock(8, 3, 4, 1, [])
      }
    });
  });

  it("should return desktop grid config", async () => {
    const [grid] = await topStoriesV2Defcon(handlerRunnerMock, input, params);
    expect((grid as IGridContainer).desktop).toEqual({
      gridTemplateColumns: "1fr 1fr 2fr 300px",
      gridTemplateRows: repeat(" auto", 8).substring(1),
      gridColumnGap: "20px",
      gridRowGap: "40px",
      gridBlocks: {
        [TopStoriesV2DefconGridPositions.Defcon]: gridBlock(1, 1, 1, 3, []),
        [TopStoriesV2DefconGridPositions.TopOne]: gridBlock(2, 1, 3, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.TopTwo]: gridBlock(2, 2, 3, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.TopThree]: gridBlock(2, 3, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.TopFour]: gridBlock(3, 3, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.TopFive]: gridBlock(4, 3, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.BottomOne]: gridBlock(6, 1, 3, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.BottomTwo]: gridBlock(6, 2, 3, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.BottomThree]: gridBlock(6, 3, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.BottomFour]: gridBlock(7, 3, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.BottomFive]: gridBlock(8, 3, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.BannerAd]: gridBlock(1, 4, 3, 1, []),
        [TopStoriesV2DefconGridPositions.MidInsert]: gridBlock(5, 1, 1, 3, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.LowerRight]: gridBlock(4, 4, 5, 1, [])
      }
    });
  });
});
