import { ClassNameService } from "./class-name.service";

describe("ClassNameService", () => {
  test.each([
    ["camelCaseText", "camel-case-text"],
    ["camelKCaseText", "camel-kcase-text"],
    ["homepageTopStoriesDefaultOne", "homepage-top-stories-default-one"],
    ["newHomepageTopStoriesDefaultOne", "new-homepage-top-stories-default-one"]
  ])("should add dash between camel casing: %s -> %s", (input, expected) => {
    expect(ClassNameService.generateClassName(input)).toEqual(expected);
  });

  test.each([
    [`Editors' Picks`, "editors-picks"],
    [`Editor's Picks`, "editors-picks"],
    [`Life & Style`, "life-style"],
    [`newsroom.co.nz`, "newsroomconz"],
    [`news. 123`, "news-123"],
    ["homepage Top Stories Default One", "homepage-top-stories-default-one"]
  ])(
    "should handle text with special characters: %s -> %s",
    (input, expected) => {
      expect(ClassNameService.generateClassName(input)).toEqual(expected);
    }
  );

  test.each([
    [`Top   Picks`, "top-picks"],
    [`top    picks`, "top-picks"],
    [`Now to Love`, "now-to-love"]
  ])("should add dash to text with spacing: %s -> %s", (input, expected) => {
    expect(ClassNameService.generateClassName(input)).toEqual(expected);
  });
});
