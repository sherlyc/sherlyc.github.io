import { Section } from "../../section";
import { Strap } from "../../strap";
import { IParams } from "../../__types__/IParams";
import * as jsonFeed from "../jsonfeed/jsonfeed";
import * as strapListService from "../strap-list/strap-list-service";
import { getRawArticles } from "./article-retriever";

jest.setTimeout(10000);

describe("Article retriever", () => {
  const params: IParams = { apiRequestId: "123123" };

  it("it should call getSectionArticleList when source is a section", async () => {
    const getSectionArticleList = jest.spyOn(jsonFeed, "getSectionArticleList");
    const section = Section.Latest;
    const totalArticles = 3;

    await getRawArticles(section, totalArticles, params);

    expect(getSectionArticleList).toHaveBeenCalledWith(
      section,
      totalArticles,
      params
    );
  });

  it("it should getStrapArticles when source is a strap", async () => {
    const getStrapArticles = jest.spyOn(strapListService, "getStrapArticles");
    const strap = Strap.TopStories;
    const totalArticles = 3;

    await getRawArticles(strap, totalArticles, params);

    expect(getStrapArticles).toHaveBeenCalledWith(params, strap, totalArticles);
  });
});
