import { IParams } from "../../../__types__/IParams";
import {
  ITopStoriesV2DefconGridHandlerInput,
  TopStoriesV2DefconGridPositions
} from "../../__types__/ITopStoriesV2DefconGridHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import topStoriesV2Defcon from "./top-stories-v2-defcon-grid";
import {
  Border,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";
import { gridBlock } from "../../../adapters/grid/grid-block";

describe("Top Stories Defcon grid", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const fakeContentBlock = {} as IContentBlock;
  const input: ITopStoriesV2DefconGridHandlerInput = {
    type: HandlerInputType.TopStoriesV2DefconGrid,
    content: {
      [TopStoriesV2DefconGridPositions.Defcon]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.LeftOne]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.LeftTwo]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.LeftThree]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.LeftFour]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.RightOne]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.RightTwo]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.RightThree]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.RightFour]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.RightFive]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.RightSix]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.BannerAd]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.MidInsert]: [fakeContentBlock],
      [TopStoriesV2DefconGridPositions.LowerRight]: [fakeContentBlock]
    }
  };

  it("should return mobile grid config", async () => {
    const [grid] = await topStoriesV2Defcon(handlerRunnerMock, input, params);
    expect((grid as IGridContainer).mobile).toEqual({
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows:
        "auto auto auto auto auto auto auto auto auto auto auto auto",
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [TopStoriesV2DefconGridPositions.Defcon]: gridBlock(1, 1, 1, 2, []),
        [TopStoriesV2DefconGridPositions.BannerAd]: gridBlock(2, 1, 1, 2, []),
        [TopStoriesV2DefconGridPositions.LeftOne]: gridBlock(3, 1, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.LeftTwo]: gridBlock(3, 2, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.LeftThree]: gridBlock(4, 1, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.LeftFour]: gridBlock(4, 2, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.MidInsert]: gridBlock(5, 1, 1, 2, []),
        [TopStoriesV2DefconGridPositions.RightOne]: gridBlock(6, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.RightTwo]: gridBlock(7, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.RightThree]: gridBlock(8, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.RightFour]: gridBlock(9, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.RightFive]: gridBlock(10, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.RightSix]: gridBlock(11, 1, 1, 2, [
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
      gridTemplateRows: "auto auto auto auto auto auto auto auto auto auto",
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [TopStoriesV2DefconGridPositions.Defcon]: gridBlock(1, 1, 1, 3, []),
        [TopStoriesV2DefconGridPositions.LeftOne]: gridBlock(2, 1, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.LeftTwo]: gridBlock(2, 2, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.LeftThree]: gridBlock(3, 1, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.LeftFour]: gridBlock(3, 2, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.MidInsert]: gridBlock(4, 1, 1, 2, []),
        [TopStoriesV2DefconGridPositions.RightOne]: gridBlock(5, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.RightTwo]: gridBlock(6, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.RightThree]: gridBlock(7, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.RightFour]: gridBlock(8, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.RightFive]: gridBlock(9, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.RightSix]: gridBlock(10, 1, 1, 2, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.BannerAd]: gridBlock(2, 3, 5, 1, []),
        [TopStoriesV2DefconGridPositions.LowerRight]: gridBlock(7, 3, 4, 1, [])
      }
    });
  });

  it("should return desktop grid config", async () => {
    const [grid] = await topStoriesV2Defcon(handlerRunnerMock, input, params);
    expect((grid as IGridContainer).desktop).toEqual({
      gridTemplateColumns: "1fr 1fr 2fr 300px",
      gridTemplateRows: "auto auto auto auto auto auto auto auto",
      gridColumnGap: "20px",
      gridRowGap: "40px",
      gridBlocks: {
        [TopStoriesV2DefconGridPositions.Defcon]: gridBlock(1, 1, 1, 3, []),
        [TopStoriesV2DefconGridPositions.LeftOne]: gridBlock(2, 1, 3, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.LeftTwo]: gridBlock(2, 2, 3, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.LeftThree]: gridBlock(6, 1, 3, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.LeftFour]: gridBlock(6, 2, 3, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.RightOne]: gridBlock(2, 3, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.RightTwo]: gridBlock(3, 3, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.RightThree]: gridBlock(4, 3, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.RightFour]: gridBlock(6, 3, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.RightFive]: gridBlock(7, 3, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.RightSix]: gridBlock(8, 3, 1, 1, [
          Border.bottom
        ]),
        [TopStoriesV2DefconGridPositions.BannerAd]: gridBlock(1, 4, 4, 1, []),
        [TopStoriesV2DefconGridPositions.MidInsert]: gridBlock(5, 1, 1, 3, []),
        [TopStoriesV2DefconGridPositions.LowerRight]: gridBlock(5, 4, 4, 1, [])
      }
    });
  });
});
