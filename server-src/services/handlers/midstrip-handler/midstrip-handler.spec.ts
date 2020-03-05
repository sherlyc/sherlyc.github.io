import midstripHandler from "./midstrip-handler";
import { IColumnContainer } from "common/__types__/IColumnContainer";
import { IParams } from "../../__types__/IParams";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { getStrapArticles } from "../../adapters/strap-list/strap-list-service";
import { Strap } from "../../strap";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import wrappedLogger from "../../utils/logger";
import { IRawArticle } from "../../adapters/__types__/IRawArticle";

jest.mock("../../utils/logger");
jest.mock("../../adapters/strap-list/strap-list-service");
jest.mock("../../adapters/jsonfeed/jsonfeed");

describe("MidStripHandler", () => {
  const basicAdUnit = {
    type: ContentBlockType.BasicAdUnit,
    context: "MidStrip"
  };
  const params: IParams = { apiRequestId: "request-id-for-testing" };

  const fakeArticlesWithIds = (ids: number[]) =>
    ids.map((id) => ({ id: `${id}` } as IRawArticle));

  beforeEach(() => {
    jest.resetModules();
  });

  describe("when source is strap", () => {
    it("should get a list of Image Links", async () => {
      const totalArticles = 2;

      (getStrapArticles as jest.Mock).mockResolvedValue(
        fakeArticlesWithIds([1, 2])
      );

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
            expect.objectContaining({
              type: ContentBlockType.ImageLinkUnit,
              id: "1"
            }),
            expect.objectContaining({
              type: ContentBlockType.ImageLinkUnit,
              id: "2"
            })
          ]
        },
        basicAdUnit
      ]);
    });

    it("should get a list of Image links not exceeding number of requested item", async () => {
      const totalArticles = 1;
      (getStrapArticles as jest.Mock).mockResolvedValue(
        fakeArticlesWithIds([1, 2])
      );

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
            expect.objectContaining({
              type: ContentBlockType.ImageLinkUnit,
              id: "1"
            })
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

      (getStrapArticles as jest.Mock).mockResolvedValue(
        fakeArticlesWithIds([1, 2])
      );

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
            expect.objectContaining({
              type: ContentBlockType.ImageLinkUnit,
              id: "1"
            }),
            expect.objectContaining({
              type: ContentBlockType.ImageLinkUnit,
              id: "2"
            })
          ]
        },
        basicAdUnit
      ]);
    });

    it("should get a list of Image links not exceeding number of requested item", async () => {
      const totalArticles = 1;
      (getStrapArticles as jest.Mock).mockResolvedValue(
        fakeArticlesWithIds([1, 2])
      );

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
            expect.objectContaining({
              type: ContentBlockType.ImageLinkUnit,
              id: "1"
            })
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
