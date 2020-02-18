import { IParams } from "../../../__types__/IParams";
import { createBulletList } from "./bullet-list";
import { IBrandConfig } from "../../__types__/INetworkBrandConfig";
import { Logo } from "../../../../../common/Logo";
import { Strap } from "../../../strap";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import objectContaining = jasmine.objectContaining;
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";

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

  it("should articles as bullet items in list", async () => {
    const numberOfArticles = 5;
    const config: IBrandConfig = {
      logo: Logo.DominionPost,
      bulletColor: "red",
      sourceId: Strap.DominionPost
    };
    (getRawArticles as jest.Mock).mockResolvedValue(
      fakeArticles([1, 2, 3, 4, 5])
    );

    const result = await createBulletList(config, numberOfArticles, params);

    expect(result).toEqual(
      expect.objectContaining({
        type: ContentBlockType.BulletList
      })
    );
  });
});
