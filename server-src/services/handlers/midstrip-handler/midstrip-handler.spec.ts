import midstripHandler from "./midstrip-handler";
import { IColumnContainer } from "common/__types__/IColumnContainer";
import { IParams } from "../../__types__/IParams";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { getStrapArticles } from "../../adapters/strap-list/strap-list-service";
import { Strap } from "../../strap";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import wrappedLogger from "../../utils/logger";
import { IRawArticle } from "../../adapters/__types__/IRawArticle";
import { ImageLayoutType } from "../../../../common/__types__/ImageLayoutType";

jest.mock("../../utils/logger");
jest.mock("../../adapters/strap-list/strap-list-service");
jest.mock("../../adapters/jsonfeed/jsonfeed");

describe("MidStripHandler", () => {
  const basicAdUnit = {
    type: ContentBlockType.BasicAdUnit,
    context: "MidStrip"
  };
  const params: IParams = { apiRequestId: "request-id-for-testing" };
  const rawMidStrip: any[] = [
    {
      id: "1",
      indexHeadline: "Headline 1",
      title: "Title 1",
      introText: "Intro 1",
      linkUrl: "/link1",
      defconSrc: "defcon1.jpg",
      imageSrc: "1.jpg",
      imageSrcSet: "1.jpg 1w",
      strapImageSrc: "1.jpg",
      strapImageSrcSet: "1.jpg 1w",
      sixteenByNineSrc: "sixteenByNine1.jpg",
      lastPublishedTime: 1,
      headlineFlags: []
    },
    {
      id: "2",
      indexHeadline: "Headline 2",
      introText: "Intro 2",
      title: "Title 2",
      linkUrl: "/link2",
      defconSrc: "defcon2.jpg",
      imageSrc: "2.jpg",
      imageSrcSet: "2.jpg 2w",
      strapImageSrc: "2.jpg",
      strapImageSrcSet: "2.jpg 2w",
      sixteenByNineSrc: "sixteenByNine2.jpg",
      lastPublishedTime: 2,
      headlineFlags: []
    }
  ];
  beforeEach(() => {
    jest.resetModules();
  });

  describe("when source is strap", () => {
    it("should get a list of Image Links", async () => {
      const totalArticles = 2;

      (getStrapArticles as jest.Mock).mockResolvedValue(rawMidStrip);

      const handlerRunnerMock = jest.fn();

      const columnContainer = (await midstripHandler(
        handlerRunnerMock,
        {
          type: HandlerInputType.MidStrip,
          sourceId: Strap.MidStrip,
          strapName: "MidStrip",
          totalArticles
        },
        params
      )) as IColumnContainer[];

      const imageLinkUnits = columnContainer[0].items;

      expect(imageLinkUnits.length).toBe(totalArticles);
      expect(columnContainer).toEqual([
        {
          type: "ColumnContainer",
          items: [
            {
              headlineFlags: [],
              id: "1",
              strapName: "MidStrip",
              imageSrc: "1.jpg",
              imageSrcSet: "1.jpg 1w",
              indexHeadline: "Headline 1",
              title: "Title 1",
              linkUrl: "/link1",
              type: ContentBlockType.ImageLinkUnit,
              layout: ImageLayoutType.default
            },
            {
              headlineFlags: [],
              id: "2",
              strapName: "MidStrip",
              imageSrc: "2.jpg",
              imageSrcSet: "2.jpg 2w",
              indexHeadline: "Headline 2",
              title: "Title 2",
              linkUrl: "/link2",
              type: ContentBlockType.ImageLinkUnit,
              layout: ImageLayoutType.default
            }
          ]
        },
        basicAdUnit
      ]);
    });

    it("should get a list of Image links not exceeding number of requested item", async () => {
      const totalArticles = 1;
      (getStrapArticles as jest.Mock).mockResolvedValue(rawMidStrip);

      const handlerRunnerMock = jest.fn();

      const columnContainer = (await midstripHandler(
        handlerRunnerMock,
        {
          type: HandlerInputType.MidStrip,
          sourceId: Strap.MidStrip,
          strapName: "MidStrip",
          totalArticles
        },
        params
      )) as IColumnContainer[];

      const imageLinkUnits = columnContainer[0].items;

      expect(imageLinkUnits.length).toBe(totalArticles);
      expect(columnContainer).toEqual([
        {
          type: "ColumnContainer",
          items: [
            {
              headlineFlags: [],
              id: "1",
              strapName: "MidStrip",
              imageSrc: "1.jpg",
              imageSrcSet: "1.jpg 1w",
              indexHeadline: "Headline 1",
              title: "Title 1",
              linkUrl: "/link1",
              type: ContentBlockType.ImageLinkUnit,
              layout: ImageLayoutType.default
            }
          ]
        },
        basicAdUnit
      ]);
    });

    it("should throw error when failing to retrieve articles", async () => {
      const error = new Error("failed to retrieve");
      (getStrapArticles as jest.Mock).mockRejectedValue(error);

      await expect(
        midstripHandler(
          jest.fn(),
          {
            type: HandlerInputType.MidStrip,
            sourceId: Strap.MidStrip,
            strapName: "MidStrip",
            totalArticles: 2
          },
          params
        )
      ).rejects.toEqual(error);
    });
  });

  describe("when source is listasset", () => {
    it("should get a list of Image Links", async () => {
      const totalArticles = 2;

      (getStrapArticles as jest.Mock).mockResolvedValue(rawMidStrip);

      const handlerRunnerMock = jest.fn();

      const columnContainer = (await midstripHandler(
        handlerRunnerMock,
        {
          type: HandlerInputType.MidStrip,
          sourceId: Strap.MidStrip,
          strapName: "MidStrip",
          totalArticles
        },
        params
      )) as IColumnContainer[];

      const imageLinkUnits = columnContainer[0].items;

      expect(imageLinkUnits.length).toBe(totalArticles);
      expect(columnContainer).toEqual([
        {
          type: "ColumnContainer",
          items: [
            {
              headlineFlags: [],
              id: "1",
              strapName: "MidStrip",
              imageSrc: "1.jpg",
              imageSrcSet: "1.jpg 1w",
              indexHeadline: "Headline 1",
              title: "Title 1",
              linkUrl: "/link1",
              type: ContentBlockType.ImageLinkUnit,
              layout: ImageLayoutType.default
            },
            {
              headlineFlags: [],
              id: "2",
              strapName: "MidStrip",
              imageSrc: "2.jpg",
              imageSrcSet: "2.jpg 2w",
              indexHeadline: "Headline 2",
              title: "Title 2",
              linkUrl: "/link2",
              type: ContentBlockType.ImageLinkUnit,
              layout: ImageLayoutType.default
            }
          ]
        },
        basicAdUnit
      ]);
    });

    it("should get a list of Image links not exceeding number of requested item", async () => {
      const totalArticles = 1;
      (getStrapArticles as jest.Mock).mockResolvedValue(rawMidStrip);

      const handlerRunnerMock = jest.fn();

      const columnContainer = (await midstripHandler(
        handlerRunnerMock,
        {
          type: HandlerInputType.MidStrip,
          sourceId: Strap.MidStrip,
          strapName: "MidStrip",
          totalArticles
        },
        params
      )) as IColumnContainer[];

      const imageLinkUnits = columnContainer[0].items;

      expect(imageLinkUnits.length).toBe(totalArticles);
      expect(columnContainer).toEqual([
        {
          type: "ColumnContainer",
          items: [
            {
              headlineFlags: [],
              id: "1",
              strapName: "MidStrip",
              imageSrc: "1.jpg",
              imageSrcSet: "1.jpg 1w",
              indexHeadline: "Headline 1",
              title: "Title 1",
              linkUrl: "/link1",
              type: ContentBlockType.ImageLinkUnit,
              layout: ImageLayoutType.default
            }
          ]
        },
        basicAdUnit
      ]);
    });

    it("should throw error when failing to retrieve articles", async () => {
      const sourceId = Strap.MidStrip;
      const error = new Error("failed to retrieve");
      (getStrapArticles as jest.Mock).mockRejectedValue(error);

      await expect(
        midstripHandler(
          jest.fn(),
          {
            type: HandlerInputType.MidStrip,
            sourceId,
            strapName: "MidStrip",
            totalArticles: 2
          },
          params
        )
      ).rejects.toEqual(error);
      expect(wrappedLogger.error).toHaveBeenCalledWith(
        params.apiRequestId,
        expect.stringContaining(sourceId),
        error
      );
    });
  });
});
