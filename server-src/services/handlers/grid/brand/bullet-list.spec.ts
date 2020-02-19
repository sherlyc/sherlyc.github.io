import { IParams } from "../../../__types__/IParams";
import { createBulletList } from "./bullet-list";
import { IBrandConfig } from "../../__types__/INetworkBrandConfig";
import { Logo } from "../../../../../common/Logo";
import { Strap } from "../../../strap";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IBulletItem } from "../../../../../common/__types__/IBulletItem";

jest.mock("../../../adapters/article-retriever/article-retriever");

describe("Bullet list", () => {
  const params: IParams = { apiRequestId: "123" };
  const fakeArticles = (ids: number[]) =>
    ids.map((id) => ({ id: `${id}` } as IRawArticle));

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve number of articles from specified sourceId", async () => {
    const numberOfArticles = 5;
    const config: IBrandConfig = {
      logo: Logo.DominionPost,
      bulletColor: "red",
      sourceId: Strap.DominionPost
    };
    (getRawArticles as jest.Mock).mockResolvedValue([]);

    await createBulletList(config, numberOfArticles, params);

    expect(getRawArticles).toHaveBeenCalledWith(
      config.sourceId,
      numberOfArticles,
      params
    );
  });

  it("should insert articles as bullet items", async () => {
    const config: IBrandConfig = {
      logo: Logo.DominionPost,
      bulletColor: "red",
      sourceId: Strap.DominionPost
    };
    (getRawArticles as jest.Mock).mockResolvedValue(fakeArticles([1, 2, 3]));

    const result = await createBulletList(config, 3, params);

    const bulletItemWithIdAndColor = (id: number) =>
      expect.objectContaining({
        id: `${id}`,
        bulletColor: config.bulletColor
      } as IBulletItem);

    expect(result).toEqual(
      expect.objectContaining({
        type: ContentBlockType.BulletList,
        logo: config.logo,
        items: expect.arrayContaining([
          bulletItemWithIdAndColor(1),
          bulletItemWithIdAndColor(2),
          bulletItemWithIdAndColor(3)
        ])
      })
    );
  });

  it("should return empty bullet items if failed to retrieve articles", async () => {
    const config: IBrandConfig = {
      logo: Logo.DominionPost,
      bulletColor: "red",
      sourceId: Strap.DominionPost
    };
    (getRawArticles as jest.Mock).mockRejectedValue(new Error());

    const result = await createBulletList(config, 3, params);

    expect(result).toEqual(
      expect.objectContaining({
        type: ContentBlockType.BulletList,
        logo: config.logo,
        items: []
      })
    );
  });
});