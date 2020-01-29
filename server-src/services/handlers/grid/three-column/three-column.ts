import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IColumnGridHandlerInput } from "../../__types__/IColumnGridHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IThreeColumnHandlerInput } from "../../__types__/IThreeColumnHandlerInput";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { Strap } from "../../../strap";
import { basicArticleTitleUnit } from "../../../adapters/article-converter/basic-article-title.converter";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { contentErrorHandler } from "../content-error-handler";

const getColumnContent = async (
  handlerRunner: handlerRunnerFunction,
  sourceId: Strap,
  strapName: string,
  totalArticles: number,
  displayName: string,
  displayNameColor: string,
  params: IParams
): Promise<IContentBlock[]> => {
  return await contentErrorHandler(
    async () => {
      const articles = await getRawArticles(sourceId, totalArticles, params);

      const articleContentBlocks = articles.map((article) =>
        basicArticleTitleUnit(article, strapName)
      );

      return [
        {
          type: ContentBlockType.ModuleTitle,
          displayName,
          displayNameColor
        },
        ...(await handlerRunner(
          {
            type: HandlerInputType.ListGrid,
            content: articleContentBlocks
          },
          params
        ))
      ];
    },
    HandlerInputType.ThreeColumn,
    sourceId,
    params
  );
};

export default async function(
  handlerRunner: handlerRunnerFunction,
  {}: IThreeColumnHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const totalArticles = 8;

  const threeColumnGridHandlerInput: IColumnGridHandlerInput = {
    type: HandlerInputType.ColumnGrid,
    content: await Promise.all([
      getColumnContent(
        handlerRunner,
        Strap.EditorPicks,
        "Editors' Picks",
        totalArticles,
        "Editors' Picks",
        "pizzaz",
        params
      ),
      getColumnContent(
        handlerRunner,
        Strap.Business,
        "Business",
        totalArticles,
        "Business",
        "pizzaz",
        params
      ),
      getColumnContent(
        handlerRunner,
        Strap.Opinion,
        "Opinion",
        totalArticles,
        "Opinion",
        "pizzaz",
        params
      )
    ])
  };

  return await handlerRunner(threeColumnGridHandlerInput, params);
}