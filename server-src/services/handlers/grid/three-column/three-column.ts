import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  IColumnGridHandlerInput,
} from "../../__types__/IColumnGridHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IThreeColumnHandlerInput } from "../../__types__/IThreeColumnHandlerInput";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { Strap } from "../../../strap";
import { basicArticleTitleUnit } from "../../../adapters/article-converter/basic-article-title.converter";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";

export default async function(
  handlerRunner: handlerRunnerFunction,
  {}: IThreeColumnHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const totalArticles = 8;
  const articles = await getRawArticles(
    Strap.EditorPicks,
    totalArticles,
    params
  );
  const articlesTwo = await getRawArticles(
    Strap.Business,
    totalArticles,
    params
  );
  const articlesThree = await getRawArticles(
    Strap.Opinion,
    totalArticles,
    params
  );

  const articleListOne = articles.map((article) =>
    basicArticleTitleUnit(article, "strapName")
  );

  const articleListTwo = articlesTwo.map((article) =>
    basicArticleTitleUnit(article, "strapName")
  );

  const articleListThree = articlesThree.map((article) =>
    basicArticleTitleUnit(article, "strapName")
  );

  const columnOneContent: IContentBlock[] = [
    {
      type: ContentBlockType.ModuleTitle,
      displayName: "Editor's Picks",
      displayNameColor: "pizzaz"
    },
    ...(await handlerRunner(
      {
        type: HandlerInputType.ListGrid,
        content: articleListOne
      },
      params
    ))
  ];

  const columnTwoContent: IContentBlock[] = [
    {
      type: ContentBlockType.ModuleTitle,
      displayName: "Most Popular",
      displayNameColor: "pizzaz"
    },
    ...(await handlerRunner(
      {
        type: HandlerInputType.ListGrid,
        content: articleListTwo
      },
      params
    ))
  ];

  const columnThreeContent: IContentBlock[] = [
    {
      type: ContentBlockType.ModuleTitle,
      displayName: "Latest News",
      displayNameColor: "pizzaz"
    },
    ...(await handlerRunner(
      {
        type: HandlerInputType.ListGrid,
        content: articleListThree
      },
      params
    ))
  ];

  const threeColumnGridHandlerInput: IColumnGridHandlerInput = {
    type: HandlerInputType.ColumnGrid,
    content: [columnOneContent, columnTwoContent, columnThreeContent]
  };
  return await handlerRunner(threeColumnGridHandlerInput, params);
}
