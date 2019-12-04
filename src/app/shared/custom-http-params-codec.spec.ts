import { CustomHttpParamsCodec } from "./custom-http-params-codec";

describe("CustomHttpParamsCodec", () => {
  const codec = new CustomHttpParamsCodec();

  it.each`
    original               | encoded
    ${"enth=amuh;rt=nanz"} | ${"enth%3Damuh%3Brt%3Dnanz"}
    ${"@"}                 | ${"%40"}
    ${":"}                 | ${"%3A"}
    ${"$"}                 | ${"%24"}
    ${","}                 | ${"%2C"}
    ${";"}                 | ${"%3B"}
    ${"+"}                 | ${"%2B"}
    ${"="}                 | ${"%3D"}
    ${"?"}                 | ${"%3F"}
    ${"/"}                 | ${"%2F"}
  `("handles $original", ({ original, encoded }) => {
    expect(codec.encodeKey(original)).toBe(encoded);
    expect(codec.encodeValue(original)).toBe(encoded);
    expect(codec.decodeKey(encoded)).toBe(original);
    expect(codec.decodeValue(encoded)).toBe(original);
  });
});
