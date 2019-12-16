import { formatVersion, parseVersion, validateVersion } from "./version";

describe("version", () => {
  it.each([
    ["SNAPSHOT", "0"],
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

  it.each([
    ["1", "true"],
    ["asdf", "false"]
  ])("should validate %s as %s", (version: string, result: string) => {
    console.log(version, validateVersion(version), result, Boolean(result));
    expect(String(validateVersion(version))).toEqual(result);
  });
});
