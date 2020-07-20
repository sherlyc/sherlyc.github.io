import { AccentColor } from "../../../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IGridContainer } from "../../../../../common/__types__/IGridContainer";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  BrandGridPositions,
  IBrandGridHandlerInput
} from "../../__types__/IBrandGridHandlerInput";
import {
  BrandModule,
  IBrandHandlerInput
} from "../../__types__/IBrandHandlerInput";
import brandHandler from "./brand";
import { createBulletList } from "./bullet-list";

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

  describe("Network Brand Module", () => {
    const input: IBrandHandlerInput = {
      type: HandlerInputType.Brand,
      module: BrandModule.Network
    };

    it("should retrieve 10 bullet lists", async () => {
      (createBulletList as jest.Mock).mockResolvedValue([]);
      const handlerRunnerMock = jest.fn();
      handlerRunnerMock.mockResolvedValue([]);

      await brandHandler(handlerRunnerMock, input, params);

      expect(createBulletList).toHaveBeenCalledTimes(10);
      expect(createBulletList).toHaveBeenCalledWith(
        expect.anything(),
        5,
        params
      );
    });

    it("should pass 10 bullet lists to column grid handler", async () => {
      (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(1));
      (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(2));
      (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(3));
      (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(4));
      (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(5));
      (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(6));
      (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(7));
      (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(8));
      (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(9));
      (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(10));

      const handlerRunnerMock = jest.fn();
      handlerRunnerMock.mockResolvedValue({});

      await brandHandler(handlerRunnerMock, input, params);

      const [
        [firstColumnGridCall],
        [secondColumnGridCall]
      ] = handlerRunnerMock.mock.calls;
      expect(firstColumnGridCall.content).toEqual([
        [expect.objectContaining(fakeBulletList(1))],
        [expect.objectContaining(fakeBulletList(2))],
        [expect.objectContaining(fakeBulletList(3))],
        [expect.objectContaining(fakeBulletList(4))],
        [expect.objectContaining(fakeBulletList(5))]
      ]);
      expect(secondColumnGridCall.content).toEqual([
        [expect.objectContaining(fakeBulletList(6))],
        [expect.objectContaining(fakeBulletList(7))],
        [expect.objectContaining(fakeBulletList(8))],
        [expect.objectContaining(fakeBulletList(9))],
        [expect.objectContaining(fakeBulletList(10))]
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
              type: ContentBlockType.ModuleHeader,
              title: "our network's top stories",
              color: AccentColor.Black
            }
          ],
          [BrandGridPositions.FirstRow]: [fakeGridContainer],
          [BrandGridPositions.SecondRow]: [fakeGridContainer]
        }
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

  describe("Partner Brand Module", () => {
    const input: IBrandHandlerInput = {
      type: HandlerInputType.Brand,
      module: BrandModule.Partner
    };

    it("should retrieve 5 bullet lists with 5 articles", async () => {
      const articlesPerBrand = 5;
      (createBulletList as jest.Mock).mockResolvedValue([]);
      const handlerRunnerMock = jest.fn();
      handlerRunnerMock.mockResolvedValue([]);

      await brandHandler(handlerRunnerMock, input, params);

      expect(createBulletList).toHaveBeenCalledTimes(5);
      expect(createBulletList).toHaveBeenCalledWith(
        expect.anything(),
        articlesPerBrand,
        params
      );
    });

    it("should pass 5 bullet lists to column grid handler", async () => {
      (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(1));
      (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(2));
      (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(3));
      (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(4));
      (createBulletList as jest.Mock).mockResolvedValueOnce(fakeBulletList(5));

      (createBulletList as jest.Mock).mockResolvedValueOnce([]);
      const handlerRunnerMock = jest.fn();
      handlerRunnerMock.mockResolvedValue({});

      await brandHandler(handlerRunnerMock, input, params);

      const [
        [firstColumnGridCall],
        [secondColumnGridCall]
      ] = handlerRunnerMock.mock.calls;
      expect(firstColumnGridCall.content).toEqual([
        [expect.objectContaining(fakeBulletList(1))],
        [expect.objectContaining(fakeBulletList(2))],
        [expect.objectContaining(fakeBulletList(3))],
        [expect.objectContaining(fakeBulletList(4))],
        [expect.objectContaining(fakeBulletList(5))]
      ]);
      expect(secondColumnGridCall.content).toEqual([]);
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
              type: ContentBlockType.ModuleHeader,
              title: "from our partners",
              color: AccentColor.Black
            }
          ],
          [BrandGridPositions.FirstRow]: [fakeGridContainer],
          [BrandGridPositions.SecondRow]: [fakeGridContainer]
        }
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
});
