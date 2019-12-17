import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IExternalContentUnit } from "../../../../common/__types__/IExternalContentUnit";
import { FeatureName } from "../../../../common/FeatureName";
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
          content: {
            type: HandlerInputType.ExternalContent,
            url: "/abc",
            width: "200px",
            height: "100%"
          } as IExternalContentHandlerInput
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
          fallback: {
            type: HandlerInputType.ExternalContent,
            url: "/abc",
            width: "200px",
            height: "100%"
          } as IExternalContentHandlerInput
        },
        params
      );

      expect(result).toEqual(expected);
    });
  });

  describe("when provided both feature and fallback content", () => {
    it("should return the correct content blocks", async () => {
      const expected = [
        {
          type: ContentBlockType.FeatureContainer,
          name: "fake" as FeatureName,
          content: [fakeBlock],
          fallback: [fakeBlock]
        }
      ];

      const result = await featureHandler(
        handlerRunnerMock,
        {
          type: HandlerInputType.Feature,
          name: "fake" as FeatureName,
          content: {
            type: HandlerInputType.ExternalContent,
            url: "/abc",
            width: "200px",
            height: "100%"
          } as IExternalContentHandlerInput,
          fallback: {
            type: HandlerInputType.ExternalContent,
            url: "/abc",
            width: "200px",
            height: "100%"
          } as IExternalContentHandlerInput
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
});
