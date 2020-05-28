import { IPartnerHandlerInput } from "../../__types__/IPartnerHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import Partner from "./partner";
import { createPartnerContent } from "./partner-content";
import { brandConfig } from "../brand/brand-config";
import { BrandModule } from "../../__types__/IBrandHandlerInput";
import { PartnerBrand } from "../../__types__/IBrandConfig";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IGridContainer } from "../../../../../common/__types__/IGridContainer";
import {
  BrandGridPositions,
  IBrandGridHandlerInput
} from "../../__types__/IBrandGridHandlerInput";

jest.mock("./partner-content");

describe("Partner", () => {
  const params = { apiRequestId: "id" };
  const handlerInput: IPartnerHandlerInput = {
    type: HandlerInputType.Partner
  };

  it("should retrieve 2 partner content block with 5 articles each", async () => {
    const handlerRunnerMock = jest.fn();
    handlerRunnerMock.mockResolvedValue([]);

    await Partner(handlerRunnerMock, handlerInput, params);

    const partnerConfig = brandConfig[BrandModule.Partner];
    expect(createPartnerContent).toHaveBeenCalledTimes(2);
    expect(createPartnerContent).toHaveBeenNthCalledWith(
      1,
      partnerConfig.configs[PartnerBrand.Newsroom],
      partnerConfig.articlesPerBrand,
      params
    );
    expect(createPartnerContent).toHaveBeenNthCalledWith(
      2,
      partnerConfig.configs[PartnerBrand.Tarana],
      partnerConfig.articlesPerBrand,
      params
    );
  });

  it("should pass 2 partner content blocks to column grid handler", async () => {
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
    const handlerRunnerMock = jest.fn();
    handlerRunnerMock.mockResolvedValue({});

    await Partner(handlerRunnerMock, handlerInput, params);

    const [
      [firstColumnGridCall],
      [secondColumnGridCall]
    ] = handlerRunnerMock.mock.calls;
    expect(firstColumnGridCall.content).toEqual([
      [expect.objectContaining(partnerContent1)],
      [expect.objectContaining(partnerContent2)]
    ]);
    expect(secondColumnGridCall.content).toEqual([]);
  });

  it("should pass the result of column grid handlers to brand grid handler", async () => {
    (createPartnerContent as jest.Mock).mockResolvedValue({});
    const handlerRunnerMock = jest.fn();
    const fakeGridContainer = {} as IGridContainer;
    handlerRunnerMock.mockResolvedValue(fakeGridContainer);

    const expectedGridHandlerInput: IBrandGridHandlerInput = {
      type: HandlerInputType.BrandGrid,
      content: {
        [BrandGridPositions.ModuleTitle]: [
          {
            type: ContentBlockType.ModuleTitle,
            displayName: "from our partners",
            displayNameColor: "black"
          }
        ],
        [BrandGridPositions.FirstRow]: [fakeGridContainer],
        [BrandGridPositions.SecondRow]: [fakeGridContainer]
      }
    };

    await Partner(handlerRunnerMock, handlerInput, params);

    const [
      [firstColumnGridCall],
      [secondColumnGridCall],
      [brandGridCall]
    ] = handlerRunnerMock.mock.calls;
    expect(brandGridCall).toEqual(expectedGridHandlerInput);
  });
});
