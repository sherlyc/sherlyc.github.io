import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { basicAdUnit } from "./basic-ad-unit.converter";
import { IBasicAdUnit } from "../../../../common/__types__/IBasicAdUnit";

describe("basic ad unit converter", () => {
  it("should convert", () => {
    const context = "fakeContext";

    const result = basicAdUnit(context);

    const expected: IBasicAdUnit = {
      type: ContentBlockType.BasicAdUnit,
      context
    };

    expect(result).toEqual(expected);
  });
});
