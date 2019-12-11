import { formatVersion, parseVersion } from "./version";

describe("version", () => {
  it.each([
    ["1", "10000000000"],
    ["1.1", "10000100000"],
    ["1.1.1", "10000100001"],
    ["99999.99999.99999", "999999999999999"]
  ])("should parse %s into %s", (version: string, result: string) => {
    expect(parseVersion(version)).toEqual(Number(result));
  });

  it.each([
    ["10000000000", "1"],
    ["10000100000", "1.1"],
    ["10000100001", "1.1.1"],
    ["999999999999999", "99999.99999.99999"]
  ])("should format %s into %s", (result: string, version: string) => {
    expect(formatVersion(Number(result))).toEqual(version);
  });
});
