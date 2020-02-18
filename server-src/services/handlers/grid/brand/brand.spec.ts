import { createBulletList } from "./bullet-list";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { IBrandHandlerInput } from "../../__types__/IBrandHandlerInput";
import brandHandler from "./brand";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import {
  BrandGridPositions,
  IBrandGridHandlerInput
} from "../../__types__/IBrandGridHandlerInput";
import { IGridContainer } from "../../../../../common/__types__/IGridContainer";
import { IBulletList } from "../../../../../common/__types__/IBulletList";
import { bulletList } from "../../../adapters/article-converter/bullet-list.converter";
import { first } from "rxjs/operators";

jest.mock("./bullet-list");

describe("Brand Handler", () => {
  const params: IParams = { apiRequestId: "123" };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve 10 list of articles", async () => {
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

  it("should pass 5 articles to each column grid handler", async () => {
    const fakeBulletList = (id: number) => {
      return {
        type: ContentBlockType.BulletList,
        items: [id]
      };
    };
    (createBulletList as jest.Mock).mockResolvedValue(fakeBulletList);
    const handlerRunnerMock = jest.fn();
    handlerRunnerMock.mockResolvedValue({});

    const input: IBrandHandlerInput = {
      type: HandlerInputType.Brand
    };
    await brandHandler(handlerRunnerMock, input, params);

    const [
      [firstColumnGridCall],
      [secondColumnGridCall]
    ] = handlerRunnerMock.mock.calls;
    console.log(firstColumnGridCall.content[1]);
    // expect(firstColumnGridCall.content).toEqual([fakeBulletList[0]]);
    // expect(firstColumnGridCall.content).toEqual([
    //   [expect.objectContaining(fakeBulletList[0])],
    //   [expect.objectContaining(fakeBulletList[1])],
    //   [expect.objectContaining(fakeBulletList[2])],
    //   [expect.objectContaining(fakeBulletList[3])],
    //   [expect.objectContaining(fakeBulletList[4])]
    // ]);
    // expect(secondColumnGridCall.content).toEqual([
    //   [expect.objectContaining(fakeBulletList[5])],
    //   [expect.objectContaining(fakeBulletList[6])],
    //   [expect.objectContaining(fakeBulletList[7])],
    //   [expect.objectContaining(fakeBulletList[8])],
    //   [expect.objectContaining(fakeBulletList[9])]
    // ]);
  });

  // it("should pass the result of column grid handlers to brand grid handler", async () => {
  //   (getRawArticles as jest.Mock).mockResolvedValue(
  //     fakeArticles([1, 2, 3, 4, 5])
  //   );
  //   const handlerRunnerMock = jest.fn();
  //   const fakeGridContainer = {} as IGridContainer;
  //   handlerRunnerMock.mockResolvedValue(fakeGridContainer);
  //
  //   const expectedBrandGridInput: IBrandGridHandlerInput = {
  //     type: HandlerInputType.BrandGrid,
  //     content: {
  //       [BrandGridPositions.ModuleTitle]: [
  //         {
  //           type: ContentBlockType.ModuleTitle,
  //           displayName: "Our Network's Top Stories",
  //           displayNameColor: "black"
  //         }
  //       ],
  //       [BrandGridPositions.FirstRow]: [fakeGridContainer],
  //       [BrandGridPositions.SecondRow]: [fakeGridContainer]
  //     }
  //   };
  //
  //   const input: IBrandHandlerInput = {
  //     type: HandlerInputType.Brand
  //   };
  //   await brandHandler(handlerRunnerMock, input, params);
  //
  //   const [
  //     [firstCall],
  //     [secondCall],
  //     [brandGridCall]
  //   ] = handlerRunnerMock.mock.calls;
  //
  //   expect(brandGridCall).toEqual(expectedBrandGridInput);
  // });
});
