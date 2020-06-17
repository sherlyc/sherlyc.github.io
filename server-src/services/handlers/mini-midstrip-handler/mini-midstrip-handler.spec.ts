import { IColumnContainer } from "common/__types__/IColumnContainer";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { getStrapArticles } from "../../adapters/strap-list/strap-list-service";
import { IRawArticle } from "../../adapters/__types__/IRawArticle";
import { Strap } from "../../strap";
import wrappedLogger from "../../utils/logger";
import { IParams } from "../../__types__/IParams";
import { HandlerInputType } from "../__types__/HandlerInputType";
import miniMidstripHandler from "./mini-midstrip-handler";

jest.mock("../../utils/logger");
jest.mock("../../adapters/strap-list/strap-list-service");
jest.mock("../../adapters/jsonfeed/jsonfeed");

describe("MiniMidStripHandler", () => {
  const basicAdUnit = {
    type: ContentBlockType.BasicAdUnit,
    context: "MiniMidStrip"
  };
  const params: IParams = { apiRequestId: "request-id-for-testing" };

  const fakeArticlesWithIds = (ids: number[]) =>
    ids.map((id) => ({ id: `${id}` } as IRawArticle));

  beforeEach(() => {
    jest.resetModules();
  });

  describe("when source is strap", () => {
    it("should get a list of Image Links", async () => {
      (getStrapArticles as jest.Mock).mockResolvedValue(
        fakeArticlesWithIds([1, 2])
      );

      const handlerRunnerMock = jest.fn();

      const columnContainer = (await miniMidstripHandler(
        handlerRunnerMock,
        {
          type: HandlerInputType.MiniMidStrip,
          sourceId: Strap.MiniMidStrip,
          strapName: "MiniMidStrip",
          totalArticles: 2
        },
        params
      )) as IColumnContainer[];

      const imageLinkUnits = columnContainer[0].items;

      expect(imageLinkUnits.length).toBe(2);
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

    it("should throw error when failing to retrieve articles", async () => {
      const error = new Error("failed to retrieve");
      (getStrapArticles as jest.Mock).mockRejectedValue(error);

      await expect(
        miniMidstripHandler(
          jest.fn(),
          {
            type: HandlerInputType.MiniMidStrip,
            sourceId: Strap.MiniMidStrip,
            strapName: "MidStrip",
            totalArticles: 2
          },
          params
        )
      ).rejects.toEqual(error);
    });
  });

  describe("when source is a listasset", () => {
    it("should get a list of Image Links", async () => {
      (getStrapArticles as jest.Mock).mockResolvedValue(
        fakeArticlesWithIds([1, 2])
      );

      const handlerRunnerMock = jest.fn();

      const columnContainer = (await miniMidstripHandler(
        handlerRunnerMock,
        {
          type: HandlerInputType.MiniMidStrip,
          sourceId: Strap.MiniMidStrip,
          strapName: "MiniMidStrip",
          totalArticles: 2
        },
        params
      )) as IColumnContainer[];

      const imageLinkUnits = columnContainer[0].items;

      expect(imageLinkUnits.length).toBe(2);
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

    it("should log and throw error when failing to retrieve articles", async () => {
      const sourceId = Strap.MiniMidStrip;
      const error = new Error("failed to retrieve");
      (getStrapArticles as jest.Mock).mockRejectedValue(error);

      await expect(
        miniMidstripHandler(
          jest.fn(),
          {
            type: HandlerInputType.MiniMidStrip,
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
