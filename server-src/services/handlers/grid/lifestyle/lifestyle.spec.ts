import { AccentColor } from "../../../../../common/__types__/AccentColor";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { Strap } from "../../../strap";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { ILifeStyleHandlerInput } from "../../__types__/ILifeStyleHandlerInput";
import lifestyle from "./lifestyle";

jest.mock("../../../adapters/article-retriever/article-retriever");

describe("Lifestyle", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const input: ILifeStyleHandlerInput = {
    type: HandlerInputType.LifeStyle,
    sourceId: Strap.LifeStyle,
    displayName: "lifestyle",
    color: AccentColor.Charcoal,
    strapName: "lifestyle"
  };

  const articlesWithIds = (ids: number[]) =>
    ids.map(
      (id) =>
        ({
          id: `${id}`,
          sixteenByNineSrc: `${id}.png`,
          introText: `${id} intro`
        } as IRawArticle)
    );

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve 10 articles", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      articlesWithIds([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    );

    await lifestyle(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledWith(input.sourceId, 10, params);
  });

  it("should layout the expected grid with correct contents", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      articlesWithIds([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    );

    const grid = await lifestyle(handlerRunnerMock, input, params);

    const expectedGrid = [
      {
        desktop: {
          gridBlocks: {
            ModuleTitle: {
              border: [],
              columnSpan: 5,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 1
            },
            FirstRowOne: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 2
            },
            FirstRowTwo: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 2
            },
            FirstRowThree: {
              border: [],
              columnSpan: 1,
              columnStart: 3,
              rowSpan: 1,
              rowStart: 2
            },
            FirstRowFour: {
              border: [],
              columnSpan: 1,
              columnStart: 4,
              rowSpan: 1,
              rowStart: 2
            },
            FirstRowFive: {
              border: [],
              columnSpan: 1,
              columnStart: 5,
              rowSpan: 1,
              rowStart: 2
            },
            SecondRowOne: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 3
            },
            SecondRowTwo: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 3
            },
            SecondRowThree: {
              border: [],
              columnSpan: 1,
              columnStart: 3,
              rowSpan: 1,
              rowStart: 3
            },
            SecondRowFour: {
              border: [],
              columnSpan: 1,
              columnStart: 4,
              rowSpan: 1,
              rowStart: 3
            },
            SecondRowFive: {
              border: [],
              columnSpan: 1,
              columnStart: 5,
              rowSpan: 1,
              rowStart: 3
            }
          },
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          gridTemplateRows: "auto auto auto"
        },
        items: {
          ModuleTitle: [
            {
              color: "#414141",
              title: "lifestyle",
              type: "ModuleHeader"
            }
          ],

          FirstRowOne: [
            {
              analytics: {
                strapName: "lifestyle"
              },
              category: {},
              color: "#414141",
              id: "1",
              imageSrc: "1.png",
              orientation: {
                desktop: "portrait",
                mobile: "portrait",
                tablet: "portrait"
              },
              type: "HomepageArticle"
            }
          ],

          FirstRowTwo: [
            {
              analytics: {
                strapName: "lifestyle"
              },
              category: {},
              color: "#414141",
              id: "2",
              imageSrc: "2.png",
              orientation: {
                desktop: "portrait",
                mobile: "portrait",
                tablet: "portrait"
              },
              type: "HomepageArticle"
            }
          ],
          FirstRowThree: [
            {
              analytics: {
                strapName: "lifestyle"
              },
              category: {},
              color: "#414141",
              id: "3",
              imageSrc: "3.png",
              orientation: {
                desktop: "portrait",
                mobile: "portrait",
                tablet: "portrait"
              },
              type: "HomepageArticle"
            }
          ],
          FirstRowFour: [
            {
              analytics: {
                strapName: "lifestyle"
              },
              category: {},
              color: "#414141",
              id: "4",
              imageSrc: "4.png",
              orientation: {
                desktop: "portrait",
                mobile: "portrait",
                tablet: "portrait"
              },
              type: "HomepageArticle"
            }
          ],
          FirstRowFive: [
            {
              analytics: {
                strapName: "lifestyle"
              },
              category: {},
              color: "#414141",
              id: "5",
              imageSrc: "5.png",
              orientation: {
                desktop: "portrait",
                mobile: "portrait",
                tablet: "portrait"
              },
              type: "HomepageArticle"
            }
          ],
          SecondRowOne: [
            {
              analytics: {
                strapName: "lifestyle"
              },
              category: {},
              color: "#414141",
              id: "6",
              imageSrc: "6.png",
              orientation: {
                desktop: "portrait",
                mobile: "portrait",
                tablet: "portrait"
              },
              type: "HomepageArticle"
            }
          ],
          SecondRowTwo: [
            {
              analytics: {
                strapName: "lifestyle"
              },
              category: {},
              color: "#414141",
              id: "7",
              imageSrc: "7.png",
              orientation: {
                desktop: "portrait",
                mobile: "portrait",
                tablet: "portrait"
              },
              type: "HomepageArticle"
            }
          ],
          SecondRowThree: [
            {
              analytics: {
                strapName: "lifestyle"
              },
              category: {},
              color: "#414141",
              id: "8",
              imageSrc: "8.png",
              orientation: {
                desktop: "portrait",
                mobile: "portrait",
                tablet: "portrait"
              },
              type: "HomepageArticle"
            }
          ],
          SecondRowFour: [
            {
              analytics: {
                strapName: "lifestyle"
              },
              category: {},
              color: "#414141",
              id: "9",
              imageSrc: "9.png",
              orientation: {
                desktop: "portrait",
                mobile: "portrait",
                tablet: "portrait"
              },
              type: "HomepageArticle"
            }
          ],
          SecondRowFive: [
            {
              analytics: {
                strapName: "lifestyle"
              },
              category: {},
              color: "#414141",
              id: "10",
              imageSrc: "10.png",
              orientation: {
                desktop: "portrait",
                mobile: "portrait",
                tablet: "portrait"
              },
              type: "HomepageArticle"
            }
          ]
        },
        mobile: {
          gridBlocks: {
            ModuleTitle: {
              border: [],
              columnSpan: 3,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 1
            },
            FirstRowOne: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 2
            },

            FirstRowTwo: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 2
            },
            FirstRowThree: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 3
            },
            FirstRowFour: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 3
            },
            FirstRowFive: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 4
            },

            SecondRowOne: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 4
            },

            SecondRowTwo: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 5
            },
            SecondRowThree: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 5
            },
            SecondRowFour: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 6
            },
            SecondRowFive: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 6
            }
          },
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto auto auto auto auto auto"
        },
        tablet: {
          gridBlocks: {
            ModuleTitle: {
              border: [],
              columnSpan: 3,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 1
            },
            FirstRowOne: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 2
            },
            FirstRowTwo: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 2
            },
            FirstRowThree: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 3
            },
            FirstRowFour: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 3
            },
            FirstRowFive: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 4
            },

            SecondRowOne: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 4
            },
            SecondRowTwo: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 5
            },
            SecondRowThree: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 5
            },
            SecondRowFour: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 6
            },
            SecondRowFive: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 6
            }
          },
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto auto auto auto auto auto"
        },
        type: "GridContainer",
        variation: "Border"
      }
    ];
    expect(grid).toEqual(expectedGrid);
  });

  it("should get empty when retrieving articles with an error", async () => {
    (getRawArticles as jest.Mock).mockRejectedValue(
      new Error("retrieve error")
    );

    const grid = await lifestyle(handlerRunnerMock, input, params);

    expect(grid).toHaveLength(0);
  });

  it("should still layout when insufficient articles", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      articlesWithIds([1, 2, 3, 4, 5, 6, 7, 8])
    );

    const grid = await lifestyle(handlerRunnerMock, input, params);

    const expectedGrid = [
      {
        desktop: {
          gridBlocks: {
            ModuleTitle: {
              border: [],
              columnSpan: 5,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 1
            },

            FirstRowOne: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 2
            },

            FirstRowTwo: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 2
            },
            FirstRowThree: {
              border: [],
              columnSpan: 1,
              columnStart: 3,
              rowSpan: 1,
              rowStart: 2
            },
            FirstRowFour: {
              border: [],
              columnSpan: 1,
              columnStart: 4,
              rowSpan: 1,
              rowStart: 2
            },
            FirstRowFive: {
              border: [],
              columnSpan: 1,
              columnStart: 5,
              rowSpan: 1,
              rowStart: 2
            },

            SecondRowOne: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 3
            },

            SecondRowTwo: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 3
            },
            SecondRowThree: {
              border: [],
              columnSpan: 1,
              columnStart: 3,
              rowSpan: 1,
              rowStart: 3
            },
            SecondRowFour: {
              border: [],
              columnSpan: 1,
              columnStart: 4,
              rowSpan: 1,
              rowStart: 3
            },
            SecondRowFive: {
              border: [],
              columnSpan: 1,
              columnStart: 5,
              rowSpan: 1,
              rowStart: 3
            }
          },
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          gridTemplateRows: "auto auto auto"
        },
        items: {
          ModuleTitle: [
            {
              color: "#414141",
              title: "lifestyle",
              type: "ModuleHeader"
            }
          ],

          FirstRowOne: [
            {
              analytics: {
                strapName: "lifestyle"
              },
              category: {},
              color: "#414141",
              id: "1",
              imageSrc: "1.png",
              orientation: {
                desktop: "portrait",
                mobile: "portrait",
                tablet: "portrait"
              },
              type: "HomepageArticle"
            }
          ],

          FirstRowTwo: [
            {
              analytics: {
                strapName: "lifestyle"
              },
              category: {},
              color: "#414141",
              id: "2",
              imageSrc: "2.png",
              orientation: {
                desktop: "portrait",
                mobile: "portrait",
                tablet: "portrait"
              },
              type: "HomepageArticle"
            }
          ],
          FirstRowThree: [
            {
              analytics: {
                strapName: "lifestyle"
              },
              category: {},
              color: "#414141",
              id: "3",
              imageSrc: "3.png",
              orientation: {
                desktop: "portrait",
                mobile: "portrait",
                tablet: "portrait"
              },
              type: "HomepageArticle"
            }
          ],
          FirstRowFour: [
            {
              analytics: {
                strapName: "lifestyle"
              },
              category: {},
              color: "#414141",
              id: "4",
              imageSrc: "4.png",
              orientation: {
                desktop: "portrait",
                mobile: "portrait",
                tablet: "portrait"
              },
              type: "HomepageArticle"
            }
          ],
          FirstRowFive: [
            {
              analytics: {
                strapName: "lifestyle"
              },
              category: {},
              color: "#414141",
              id: "5",
              imageSrc: "5.png",
              orientation: {
                desktop: "portrait",
                mobile: "portrait",
                tablet: "portrait"
              },
              type: "HomepageArticle"
            }
          ],
          SecondRowOne: [
            {
              analytics: {
                strapName: "lifestyle"
              },
              category: {},
              color: "#414141",
              id: "6",
              imageSrc: "6.png",
              orientation: {
                desktop: "portrait",
                mobile: "portrait",
                tablet: "portrait"
              },
              type: "HomepageArticle"
            }
          ],
          SecondRowTwo: [
            {
              analytics: {
                strapName: "lifestyle"
              },
              category: {},
              color: "#414141",
              id: "7",
              imageSrc: "7.png",
              orientation: {
                desktop: "portrait",
                mobile: "portrait",
                tablet: "portrait"
              },
              type: "HomepageArticle"
            }
          ],
          SecondRowThree: [
            {
              analytics: {
                strapName: "lifestyle"
              },
              category: {},
              color: "#414141",
              id: "8",
              imageSrc: "8.png",
              orientation: {
                desktop: "portrait",
                mobile: "portrait",
                tablet: "portrait"
              },
              type: "HomepageArticle"
            }
          ],
          SecondRowFour: [],
          SecondRowFive: []
        },
        mobile: {
          gridBlocks: {
            ModuleTitle: {
              border: [],
              columnSpan: 3,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 1
            },
            FirstRowOne: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 2
            },

            FirstRowTwo: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 2
            },
            FirstRowThree: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 3
            },
            FirstRowFour: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 3
            },
            FirstRowFive: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 4
            },

            SecondRowOne: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 4
            },

            SecondRowTwo: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 5
            },
            SecondRowThree: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 5
            },
            SecondRowFour: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 6
            },
            SecondRowFive: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 6
            }
          },
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto auto auto auto auto auto"
        },
        tablet: {
          gridBlocks: {
            ModuleTitle: {
              border: [],
              columnSpan: 3,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 1
            },

            FirstRowOne: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 2
            },

            FirstRowTwo: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 2
            },
            FirstRowThree: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 3
            },
            FirstRowFour: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 3
            },
            FirstRowFive: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 4
            },

            SecondRowOne: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 4
            },
            SecondRowTwo: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 5
            },
            SecondRowThree: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 5
            },
            SecondRowFour: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 6
            },
            SecondRowFive: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 6
            }
          },
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto auto auto auto auto auto"
        },
        type: "GridContainer",
        variation: "Border"
      }
    ];
    expect(grid).toEqual(expectedGrid);
  });
});
