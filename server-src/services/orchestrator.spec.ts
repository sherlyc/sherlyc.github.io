import orchestrator, { newPage } from "./orchestrator";
import * as handlerRunner from "./handlers/runner";
import { IContentBlockHandlerInput } from "./handlers/__types__/IContentBlockHandlerInput";
import { HandlerInputType } from "./handlers/__types__/HandlerInputType";
import { ContentBlockType } from "../../common/__types__/ContentBlockType";

describe("Orchestrator", () => {
  it("should log and throw error when content block throws error", async () => {
    const error = new Error("content block failed");
    jest.spyOn(handlerRunner, "default").mockRejectedValue(error);
    await expect(orchestrator({ apiRequestId: "123" })).rejects.toEqual(error);
  });

  it("should inject billboard between every module", () => {
    const billboard: IContentBlockHandlerInput = {
      type: HandlerInputType.ContentBlockHandler,
      contentBlocks: [
        {
          type: ContentBlockType.BasicAdUnit,
          context: "billboard"
        }
      ]
    };

    const result = newPage();

    result.forEach((handler, index) => {
      if (index % 2 === 0) {
        expect(handler).toEqual(billboard);
      } else {
        expect(handler).not.toEqual(billboard);
      }
    });
  });
});
