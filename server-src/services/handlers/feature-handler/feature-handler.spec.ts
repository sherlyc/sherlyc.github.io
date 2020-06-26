import { FeatureName } from "../../../../common/FeatureName";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IExternalContentUnit } from "../../../../common/__types__/IExternalContentUnit";
import { IParams } from "../../__types__/IParams";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { IExternalContentHandlerInput } from "../__types__/IExternalContentHandlerInput";
import featureHandler from "./feature-handler";

describe("Feature Handler", () => {
  const params: IParams = { apiRequestId: "request-id-for-testing" };
  const handlerRunnerMock = jest.fn();
  const fakeBlock = {
    type: ContentBlockType.ExternalContentUnit,
    url: "/abc",
    width: "200px",
    height: "100%"
  } as IExternalContentUnit;

  beforeAll(() => {
    handlerRunnerMock.mockResolvedValue([fakeBlock]);
  });

  describe("when provided feature content", () => {
    it("should return the correct content blocks", async () => {
      const expected = [
        {
          type: ContentBlockType.FeatureContainer,
          name: "fake" as FeatureName,
          content: [fakeBlock],
          fallback: []
        }
      ];

      const result = await featureHandler(
        handlerRunnerMock,
        {
          type: HandlerInputType.Feature,
          name: "fake" as FeatureName,
          content: [
            {
              type: HandlerInputType.ExternalContent,
              url: "/abc",
              width: "200px",
              height: "100%"
            } as IExternalContentHandlerInput
          ]
        },
        params
      );

      expect(result).toEqual(expected);
    });
  });

  describe("when provided fallback content", () => {
    it("should return the correct content blocks", async () => {
      const expected = [
        {
          type: ContentBlockType.FeatureContainer,
          name: "fake" as FeatureName,
          content: [],
          fallback: [fakeBlock]
        }
      ];

      const result = await featureHandler(
        handlerRunnerMock,
        {
          type: HandlerInputType.Feature,
          name: "fake" as FeatureName,
          fallback: [
            {
              type: HandlerInputType.ExternalContent,
              url: "/abc",
              width: "200px",
              height: "100%"
            } as IExternalContentHandlerInput
          ]
        },
        params
      );

      expect(result).toEqual(expected);
    });
  });

  describe("when provided both feature and fallback content", () => {
    it("should return the correct content blocks", async () => {
      const handlerInput = {
        type: HandlerInputType.ExternalContent,
        url: "/abc",
        width: "200px",
        height: "100%"
      } as IExternalContentHandlerInput;

      const expected = [
        {
          type: ContentBlockType.FeatureContainer,
          name: "fake" as FeatureName,
          content: [fakeBlock, fakeBlock],
          fallback: [fakeBlock, fakeBlock]
        }
      ];

      const result = await featureHandler(
        handlerRunnerMock,
        {
          type: HandlerInputType.Feature,
          name: "fake" as FeatureName,
          content: [handlerInput, handlerInput],
          fallback: [handlerInput, handlerInput]
        },
        params
      );

      expect(result).toEqual(expected);
    });
  });

  describe("when provided neither feature or fallback content", () => {
    it("should return the correct content blocks", async () => {
      const expected = [
        {
          type: ContentBlockType.FeatureContainer,
          name: "fake" as FeatureName,
          content: [],
          fallback: []
        }
      ];

      const result = await featureHandler(
        handlerRunnerMock,
        {
          type: HandlerInputType.Feature,
          name: "fake" as FeatureName
        },
        params
      );

      expect(result).toEqual(expected);
    });
  });

  describe("error handling", () => {
    const mockContentBlock = {
      type: HandlerInputType.ExternalContent,
      url: "/abc",
      width: "200px",
      height: "100%"
    } as IExternalContentHandlerInput;
    it("should throw error if anything fails and error is not suppressed", async () => {
      const handlerRunnerError = new Error("Something went wrong");
      handlerRunnerMock.mockRejectedValue(handlerRunnerError);

      await expect(
        featureHandler(
          handlerRunnerMock,
          {
            type: HandlerInputType.Feature,
            name: "fake" as FeatureName,
            content: [mockContentBlock],
            suppressError: false
          },
          params
        )
      ).rejects.toEqual(handlerRunnerError);
    });

    it("should suppress error and return empty content block if anything fails", async () => {
      const handlerRunnerError = new Error("Something went wrong");
      handlerRunnerMock.mockRejectedValue(handlerRunnerError);

      const result = await featureHandler(
        handlerRunnerMock,
        {
          type: HandlerInputType.Feature,
          name: "fake" as FeatureName,
          content: [mockContentBlock],
          suppressError: true
        },
        params
      );

      expect(result).toEqual([]);
    });

    it("should suppress error by default", async () => {
      const handlerRunnerError = new Error("Something went wrong");
      handlerRunnerMock.mockRejectedValue(handlerRunnerError);

      const result = await featureHandler(
        handlerRunnerMock,
        {
          type: HandlerInputType.Feature,
          name: "fake" as FeatureName,
          content: [mockContentBlock]
        },
        params
      );

      expect(result).toEqual([]);
    });
  });
});
