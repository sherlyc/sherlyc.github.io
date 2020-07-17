import { AccentColor } from "../../../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IGridContainer } from "../../../../../common/__types__/IGridContainer";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { PartnerBrand } from "../../__types__/IBrandConfig";
import {
  BrandGridPositions,
  IBrandGridHandlerInput
} from "../../__types__/IBrandGridHandlerInput";
import { BrandModule } from "../../__types__/IBrandHandlerInput";
import { IPartnerHandlerInput } from "../../__types__/IPartnerHandlerInput";
import { brandConfig } from "../brand/brand-config";
import Partner from "./partner";
import { createPartnerContent } from "./partner-content";

jest.mock("./partner-content");

describe("Partner", () => {
  const params = { apiRequestId: "id" };
  const handlerInput: IPartnerHandlerInput = {
    type: HandlerInputType.Partner
  };

  it("should retrieve 5 partner content block with 5 articles each", async () => {
    const handlerRunnerMock = jest.fn();
    handlerRunnerMock.mockResolvedValue([]);

    await Partner(handlerRunnerMock, handlerInput, params);

    const partnerConfig = brandConfig[BrandModule.Partner];
    expect(createPartnerContent).toHaveBeenCalledTimes(5);
    expect(createPartnerContent).toHaveBeenNthCalledWith(
      1,
      partnerConfig.configs[PartnerBrand.Bravo],
      partnerConfig.articlesPerBrand,
      params
    );
    expect(createPartnerContent).toHaveBeenNthCalledWith(
      2,
      partnerConfig.configs[PartnerBrand.Newsroom],
      partnerConfig.articlesPerBrand,
      params
    );
    expect(createPartnerContent).toHaveBeenNthCalledWith(
      3,
      partnerConfig.configs[PartnerBrand.Tarana],
      partnerConfig.articlesPerBrand,
      params
    );
    expect(createPartnerContent).toHaveBeenNthCalledWith(
      4,
      partnerConfig.configs[PartnerBrand.LocalDemocracyReporting],
      partnerConfig.articlesPerBrand,
      params
    );
    expect(createPartnerContent).toHaveBeenNthCalledWith(
      5,
      partnerConfig.configs[PartnerBrand.RNZ],
      partnerConfig.articlesPerBrand,
      params
    );
  });

  it("should pass 5 partner content blocks to column grid handler", async () => {
    const partnerContent1 = {
      type: ContentBlockType.PartnerContent,
      id: "1"
    };
    (createPartnerContent as jest.Mock).mockReturnValueOnce(partnerContent1);
    const partnerContent2 = {
      type: ContentBlockType.PartnerContent,
      id: "2"
    };
    (createPartnerContent as jest.Mock).mockReturnValueOnce(partnerContent2);
    const partnerContent3 = {
      type: ContentBlockType.PartnerContent,
      id: "3"
    };
    (createPartnerContent as jest.Mock).mockReturnValueOnce(partnerContent3);
    const partnerContent4 = {
      type: ContentBlockType.PartnerContent,
      id: "4"
    };
    (createPartnerContent as jest.Mock).mockReturnValueOnce(partnerContent4);
    const partnerContent5 = {
      type: ContentBlockType.PartnerContent,
      id: "5"
    };
    (createPartnerContent as jest.Mock).mockReturnValueOnce(partnerContent5);
    const handlerRunnerMock = jest.fn();
    handlerRunnerMock.mockResolvedValue([]);

    await Partner(handlerRunnerMock, handlerInput, params);

    const [[firstColumnGridCall]] = handlerRunnerMock.mock.calls;
    expect(firstColumnGridCall.content).toEqual([
      [expect.objectContaining(partnerContent1)],
      [expect.objectContaining(partnerContent2)],
      [expect.objectContaining(partnerContent3)],
      [expect.objectContaining(partnerContent4)],
      [expect.objectContaining(partnerContent5)]
    ]);
  });

  it("should pass the result of column grid handlers to brand grid handler", async () => {
    (createPartnerContent as jest.Mock).mockResolvedValue({});
    const handlerRunnerMock = jest.fn();
    const fakeGridContainer = {} as IGridContainer;
    handlerRunnerMock.mockResolvedValue([fakeGridContainer]);

    const expectedGridHandlerInput: IBrandGridHandlerInput = {
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
        [BrandGridPositions.SecondRow]: []
      }
    };

    await Partner(handlerRunnerMock, handlerInput, params);

    const [
      [firstColumnGridCall],
      [brandGridCall]
    ] = handlerRunnerMock.mock.calls;
    expect(brandGridCall).toEqual(expectedGridHandlerInput);
  });
});
