import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IBasicArticleListHandlerInput } from "../__types__/IBasicArticleListHandlerInput";
import { handlerRunnerFunction } from "../runner";
import { IParams } from "../../__types__/IParams";
import { LayoutType } from "../../adapters/__types__/LayoutType";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import wrappedLogger from "../../utils/logger";
import { basicArticleTitleUnit } from "../../adapters/article-converter/basic-article-title.converter";
import { basicArticleUnit } from "../../adapters/article-converter/basic-article-unit.converter";
import { basicAdUnit } from "../../adapters/article-converter/basic-ad-unit.converter";
import { parseVersion } from "../../utils/version";
import { IBasicArticleUnit } from "../../../../common/__types__/IBasicArticleUnit";
import { IBasicArticleTitleUnit } from "../../../../common/__types__/IBasicArticleTitleUnit";
import {
  Border,
  IGridBlock,
  IGridBlocks,
  IGridConfig,
  IGridContainer
} from "../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    sourceId,
    totalBasicArticlesUnit = 0,
    totalBasicArticleTitleUnit = 0,
    strapName,
    layout = LayoutType.DEFAULT
  }: IBasicArticleListHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const feHasGridSupport =
    params.version && parseVersion(params.version) >= parseVersion("1.500");

  try {
    const totalArticles = totalBasicArticlesUnit + totalBasicArticleTitleUnit;
    const rawArticles = await getRawArticles(sourceId, totalArticles, params);

    const content: Array<
      IBasicArticleUnit | IBasicArticleTitleUnit
    > = rawArticles.map((article, index) =>
      index < totalBasicArticlesUnit
        ? basicArticleUnit(article, strapName)
        : basicArticleTitleUnit(article, strapName)
    );

    if (feHasGridSupport) {
      return processAsGrid(content, strapName);
    } else {
      return processAsList(content, strapName);
    }
  } catch (error) {
    wrappedLogger.error(
      params.apiRequestId,
      `Basic article list handler error - ${sourceId} - ${error}`
    );
    throw error;
  }
}

function processAsList(
  content: Array<IBasicArticleUnit | IBasicArticleTitleUnit>,
  strapName: string
) {
  return content.reduce(
    (final, item) => [...final, item, basicAdUnit(strapName)],
    [basicAdUnit(strapName)] as IContentBlock[]
  );
}

function processAsGrid(
  content: Array<IBasicArticleUnit | IBasicArticleTitleUnit>,
  strapName: string
) {
  const totalLines = Array.from(new Array(content.length + 1));

  const gridContent = content.reduce(
    (final, item, index) => ({
      ...final,
      [`content${index}`]: [basicAdUnit(strapName), item]
    }),
    { [`content${content.length}`]: [basicAdUnit(strapName)] } as {
      [key: string]: IContentBlock[];
    }
  );

  const gridBlocks: IGridBlocks = content.reduce(
    (final, item, index) => ({
      ...final,
      [`content${index}`]: gridBlock(index + 1, 1, 1, 1, [Border.bottom])
    }),
    {
      [`content${content.length}`]: gridBlock(content.length + 1, 1, 1, 1, [])
    } as IGridBlocks
  );

  const mobile: IGridConfig = {
    gridTemplateColumns: "1fr",
    gridTemplateRows: totalLines.map(() => "auto").join(" "),
    gridColumnGap: "0px",
    gridRowGap: "20px",
    gridBlocks
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: gridContent,
      mobile,
      tablet: mobile,
      desktop: mobile
    } as IGridContainer
  ];
}

const gridBlock = (
  rowStart: number,
  columnStart: number,
  rowSpan: number,
  columnSpan: number,
  border: Border[]
): IGridBlock => ({
  rowStart,
  rowSpan,
  columnStart,
  columnSpan,
  border
});
