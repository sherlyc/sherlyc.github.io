import { Strap } from "../../strap";
import config from "../../utils/config";
import { IStrapConfigDefinition } from "../../utils/__types__/IStrapConfigDefinition";
import { IParams } from "../../__types__/IParams";
import { getListAssetById } from "../jsonfeed/jsonfeed";
import { getStrapArticles } from "./strap-list-service";

const rawList = require("./__fixtures__/raw-article-list.json");
const rawSecondList = require("./__fixtures__/raw-second-article-list.json");

jest.mock("../jsonfeed/jsonfeed");

describe("The strap list service", () => {
  const parameters: IParams = {
    apiRequestId: "request-id-for-testing"
  };

  beforeEach(() => {
    config.strapConfig = {
      baseDedupeList: ["strapEditorPicks"],
      homepageStraps: {
        strapEditorPicks: {
          ids: ["63868237"],
          dedupeRules: {
            dedupeFromBaseList: false
          }
        },
        strapDailyFix: {
          ids: ["63868237", "63768623"],
          dedupeRules: {
            dedupeFromBaseList: false
          }
        },
        strapTopStories: {
          ids: ["63868237", "63784884"],
          dedupeRules: {
            dedupeFromBaseList: true
          }
        }
      }
    } as IStrapConfigDefinition;
  });

  it("should return strap articles when strap composed by one list", async () => {
    (getListAssetById as jest.Mock).mockResolvedValue(rawList);

    const result = await getStrapArticles(parameters, Strap.EditorPicks);
    expect(result).toMatchObject(rawList);
  });

  it("should return strap articles when strap composed by multiple lists", async () => {
    (getListAssetById as jest.Mock)
      .mockResolvedValueOnce(rawList)
      .mockResolvedValueOnce(rawSecondList);

    const result = await getStrapArticles(parameters, Strap.DailyFix);
    expect(result).toMatchObject([...rawList, ...rawSecondList]);
  });

  it("should return strap articles when strap composed by multiple lists and respect limit", async () => {
    (getListAssetById as jest.Mock)
      .mockResolvedValueOnce(rawList)
      .mockResolvedValueOnce(rawSecondList);

    const result = await getStrapArticles(parameters, Strap.DailyFix, 8);
    expect(result).toMatchObject([...rawList, ...rawSecondList].slice(0, 8));
  });

  xit("should deduplicate list from configured deduplication lists", async () => {
    (getListAssetById as jest.Mock)
      .mockResolvedValueOnce(rawList)
      .mockResolvedValueOnce(rawSecondList)
      .mockResolvedValueOnce(rawList);

    const result = await getStrapArticles(parameters, Strap.TopStories);

    expect(result).toMatchObject(rawSecondList);
  });

  it("should dedupe against baseDedupeList while respecting totalArticlesWithImages as limit", async () => {
    const limit = 2;
    config.strapConfig = {
      baseDedupeList: ["strapEditorPicks"],
      homepageStraps: {
        strapEditorPicks: {
          ids: ["60000000"],
          totalArticlesWithImages: limit,
          dedupeRules: {
            dedupeFromBaseList: false
          }
        },
        strapDailyFix: {
          ids: ["90000000"],
          totalArticlesWithImages: limit,
          dedupeRules: {
            dedupeFromBaseList: true
          }
        }
      }
    } as IStrapConfigDefinition;

    const dailyFixArticles = [{ id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];
    const editorPicksArticles = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const expectedArticles = [{ id: 3 }, { id: 4 }];

    (getListAssetById as jest.Mock)
      .mockResolvedValueOnce(dailyFixArticles)
      .mockResolvedValueOnce(editorPicksArticles);

    const result = await getStrapArticles(parameters, Strap.DailyFix, limit);

    expect(result).toMatchObject(expectedArticles);
  });

  it("should dedupe against baseDedupeList while respecting totalArticlesWithImages and totalTitleArticles as limit", async () => {
    config.strapConfig = {
      baseDedupeList: ["strapEditorPicks"],
      homepageStraps: {
        strapEditorPicks: {
          ids: ["60000000"],
          totalArticlesWithImages: 2,
          totalTitleArticles: 1,
          dedupeRules: {
            dedupeFromBaseList: false
          }
        },
        strapDailyFix: {
          ids: ["90000000"],
          totalArticlesWithImages: 2,
          totalTitleArticles: 1,
          dedupeRules: {
            dedupeFromBaseList: true
          }
        }
      }
    } as IStrapConfigDefinition;

    const dailyFixArticles = [{ id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];
    const editorPicksArticles = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const expectedArticles = [{ id: 4 }, { id: 5 }, { id: 6 }];

    (getListAssetById as jest.Mock)
      .mockResolvedValueOnce(dailyFixArticles)
      .mockResolvedValueOnce(editorPicksArticles);

    const result = await getStrapArticles(parameters, Strap.DailyFix, 3);

    expect(result).toMatchObject(expectedArticles);
  });

  xit("should dedupe against baseDedupeList and extraDedupeList", async () => {
    config.strapConfig = {
      baseDedupeList: ["strapEditorPicks"],
      homepageStraps: {
        strapEditorPicks: {
          ids: ["60000000"],
          dedupeRules: {
            dedupeFromBaseList: false
          }
        },
        strapBravo: {
          ids: ["700000000"],
          dedupeRules: {
            dedupeFromBaseList: false
          }
        },
        strapDailyFix: {
          ids: ["90000000"],
          dedupeRules: {
            dedupeFromBaseList: true,
            extraDedupeList: [
              {
                id: "700000000",
                limit: 1
              }
            ]
          }
        }
      }
    } as IStrapConfigDefinition;

    const dailyFixArticles = [{ id: 1 }, { id: 3 }, { id: 5 }, { id: 8 }];
    const editorPicksArticles = [{ id: 1 }, { id: 2 }];
    const bravoArticles = [{ id: 3 }, { id: 8 }];
    const expectedArticles = [{ id: 5 }, { id: 8 }];

    (getListAssetById as jest.Mock)
      .mockResolvedValueOnce(dailyFixArticles)
      .mockResolvedValueOnce(editorPicksArticles)
      .mockResolvedValueOnce(bravoArticles);

    const result = await getStrapArticles(parameters, Strap.DailyFix);

    expect(result).toMatchObject(expectedArticles);
  });
});
