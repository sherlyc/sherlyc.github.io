import { createBulletList } from "./bullet-list";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { IBrandHandlerInput } from "../../__types__/IBrandHandlerInput";
import brandHandler from "./brand";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import {
  BrandGridPositions,
  IBrandGridHandlerInput
} from "../../__types__/IBrandGridHandlerInput";
import { IGridContainer } from "../../../../../common/__types__/IGridContainer";

jest.mock("./bullet-list");

describe("Brand Handler", () => {
  const params: IParams = { apiRequestId: "123" };

  const fakeBulletList = (id: number) => ({
    type: ContentBlockType.BulletList,
    items: [id]
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve 10 bullet lists", async () => {
    (createBulletList as jest.Mock).mockResolvedValue([]);
    const handlerRunnerMock = jest.fn();
    handlerRunnerMock.mockResolvedValue([]);

    const input: IBrandHandlerInput = {
      type: HandlerInputType.Brand
    };
    await brandHandler(handlerRunnerMock, input, params);

    expect(createBulletList).toHaveBeenCalledTimes(10);
    expect(createBulletList).toHaveBeenCalledWith(expect.anything(), 5, params);
  });

  it("should pass first 5 articles to the first row column grid handler", async () => {
    (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(1));
    (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(2));
    (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(3));
    (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(4));
    (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(5));
    (createBulletList as jest.Mock).mockResolvedValueOnce([]);
    const handlerRunnerMock = jest.fn();
    handlerRunnerMock.mockResolvedValue({});

    const input: IBrandHandlerInput = {
      type: HandlerInputType.Brand
    };
    await brandHandler(handlerRunnerMock, input, params);

    const [[firstColumnGridCall]] = handlerRunnerMock.mock.calls;
    expect(firstColumnGridCall.content).toEqual([
      [expect.objectContaining(fakeBulletList(1))],
      [expect.objectContaining(fakeBulletList(2))],
      [expect.objectContaining(fakeBulletList(3))],
      [expect.objectContaining(fakeBulletList(4))],
      [expect.objectContaining(fakeBulletList(5))]
    ]);
  });

  it("should pass last 5 articles to the second row column grid handler", async () => {
    const handlerRunnerMock = jest.fn();
    handlerRunnerMock.mockResolvedValue({});
    (createBulletList as jest.Mock).mockResolvedValueOnce([]);
    (createBulletList as jest.Mock).mockResolvedValueOnce([]);
    (createBulletList as jest.Mock).mockResolvedValueOnce([]);
    (createBulletList as jest.Mock).mockResolvedValueOnce([]);
    (createBulletList as jest.Mock).mockResolvedValueOnce([]);
    (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(5));
    (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(6));
    (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(7));
    (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(8));
    (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(9));

    const input: IBrandHandlerInput = {
      type: HandlerInputType.Brand
    };
    await brandHandler(handlerRunnerMock, input, params);

    const [
      [firstColumnGridCall],
      [secondColumnGridCall]
    ] = handlerRunnerMock.mock.calls;
    expect(secondColumnGridCall.content).toEqual([
      [expect.objectContaining(fakeBulletList(5))],
      [expect.objectContaining(fakeBulletList(6))],
      [expect.objectContaining(fakeBulletList(7))],
      [expect.objectContaining(fakeBulletList(8))],
      [expect.objectContaining(fakeBulletList(9))]
    ]);
  });

  it("should pass the result of column grid handlers to brand grid handler", async () => {
    (createBulletList as jest.Mock).mockResolvedValue([]);
    const handlerRunnerMock = jest.fn();
    const fakeGridContainer = {} as IGridContainer;
    handlerRunnerMock.mockResolvedValue(fakeGridContainer);

    const expectedBrandGridInput: IBrandGridHandlerInput = {
      type: HandlerInputType.BrandGrid,
      content: {
        [BrandGridPositions.ModuleTitle]: [
          {
            type: ContentBlockType.ModuleTitle,
            displayName: "Our Network's Top Stories",
            displayNameColor: "black"
          }
        ],
        [BrandGridPositions.FirstRow]: [fakeGridContainer],
        [BrandGridPositions.SecondRow]: [fakeGridContainer]
      }
    };

    const input: IBrandHandlerInput = {
      type: HandlerInputType.Brand
    };
    await brandHandler(handlerRunnerMock, input, params);

    const [
      [firstCall],
      [secondCall],
      [brandGridCall]
    ] = handlerRunnerMock.mock.calls;

    expect(brandGridCall).toEqual(expectedBrandGridInput);
  });
});
