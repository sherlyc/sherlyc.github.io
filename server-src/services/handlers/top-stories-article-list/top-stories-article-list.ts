import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IParams } from "../../__types__/IParams";
import { ITopStoriesArticleListHandlerInput } from "../__types__/ITopStoriesArticleListHandlerInput";
import { handlerRunnerFunction } from "../runner";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import { LayoutType } from "../../adapters/__types__/LayoutType";
import { layoutRetriever } from "../../adapters/layout/layout-retriever";
import logger from "../../utils/logger";
import { Strap } from "../../strap";
import { basicArticleUnit } from "../../adapters/article-converter/basic-article-unit.converter";
import { basicAdUnit } from "../../adapters/article-converter/basic-ad-unit.converter";
import { defconArticleUnit } from "../../adapters/article-converter/defcon-article-unit.converter";
import { IBasicArticleUnit } from "../../../../common/__types__/IBasicArticleUnit";
import { IDefconArticleUnit } from "../../../../common/__types__/IDefconArticleUnit";
import { grayDefconArticleUnit } from "../../adapters/article-converter/gray-defcon-article-unit.converter";
import { bigImageArticleUnit } from "../../adapters/article-converter/big-image-article.converter";
import { ExperimentName } from "../../../../common/ExperimentName";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IGrayDefconArticleUnit } from "../../../../common/__types__/IGrayDefconArticleUnit";
import { IBigImageArticleUnit } from "../../../../common/__types__/IBigImageArticleUnit";
import { parseVersion } from "../../utils/version";
import { IRawArticle } from "../../adapters/__types__/IRawArticle";
import {
  Border,
  IGridBlock
} from "../../../../common/__types__/IGridContainer";

const retrieveLayout = async (params: IParams): Promise<LayoutType> => {
  try {
    return await layoutRetriever(params);
  } catch (error) {
    logger.error(
      params.apiRequestId,
      `Top Stories Handler - retrieveLayout error - ${error.message}`
    );
    return LayoutType.DEFAULT;
  }
};

export default async function(
  handlerRunner: handlerRunnerFunction,
  { strapName }: ITopStoriesArticleListHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const feHasGridSupport =
    params.version && parseVersion(params.version) >= parseVersion("1.500");

  const layout = await retrieveLayout(params);

  let rawArticles = await getRawArticles(Strap.TopStories, 6, params);

  if (layout === LayoutType.DEFAULT) {
    rawArticles = [
      rawArticles[1],
      rawArticles[0],
      ...rawArticles.slice(2)
    ].filter(Boolean);
  }

  if (feHasGridSupport) {
    return processAsGrid(rawArticles, layout, strapName);
  } else {
    return processAsList(rawArticles, layout, strapName);
  }
}

function processAsList(
  rawArticles: IRawArticle[],
  layout: LayoutType,
  strapName: string
): IContentBlock[] {
  const mobileContent: Array<
    IBigImageArticleUnit | IGrayDefconArticleUnit
  > = rawArticles.map((article, index) =>
    index === 0 && layout === LayoutType.DEFCON
      ? grayDefconArticleUnit(article, strapName)
      : bigImageArticleUnit(article, strapName)
  );

  const desktopContent: Array<
    IBasicArticleUnit | IDefconArticleUnit
  > = rawArticles.map((article, index) =>
    index === 0 && layout === LayoutType.DEFCON
      ? defconArticleUnit(article, strapName)
      : basicArticleUnit(article, strapName)
  );

  return [
    {
      type: ContentBlockType.ExperimentContainer,
      name: ExperimentName.TopStoriesVisualExperiment,
      variants: {
        control: desktopContent.reduce(
          (final, item) => [...final, item, basicAdUnit(strapName)],
          [basicAdUnit(strapName)] as IContentBlock[]
        ),
        groupOne: mobileContent.reduce(
          (final, item) => [...final, item, basicAdUnit(strapName)],
          [basicAdUnit(strapName)] as IContentBlock[]
        )
      }
    }
  ];
}

function processAsGrid(
  rawArticles: IRawArticle[],
  layout: LayoutType,
  strapName: string
): IContentBlock[] {
  const content: Array<
    IBigImageArticleUnit | IGrayDefconArticleUnit
  > = rawArticles.map((article, index) =>
    index === 0 && layout === LayoutType.DEFCON
      ? grayDefconArticleUnit(article, strapName)
      : bigImageArticleUnit(article, strapName)
  );

  const gridContent = {
    item0: [basicAdUnit(strapName)],
    item1: [content[0]],
    item2: [basicAdUnit(strapName)],
    item3: [content[1]],
    item4: [basicAdUnit(strapName)],
    item5: [content[2]],
    item6: [basicAdUnit(strapName)],
    item7: [content[3]],
    item8: [basicAdUnit(strapName)],
    item9: [content[4]],
    item10: [basicAdUnit(strapName)],
    item11: [content[5]],
    item12: [basicAdUnit(strapName)]
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: gridContent,
      mobile: {
        gridTemplateColumns: "1fr",
        gridTemplateRows:
          "auto auto auto auto auto auto auto auto auto auto auto auto ",
        gridRowGap: "auto",
        gridColumnGap: "20px",
        gridBlocks: {
          item0: gridBlock(1, 1, 1, 1, []),
          item1: gridBlock(2, 1, 1, 1, [Border.bottom]),
          item2: gridBlock(3, 1, 1, 1, []),
          item3: gridBlock(4, 1, 1, 1, [Border.bottom]),
          item4: gridBlock(5, 1, 1, 1, []),
          item5: gridBlock(6, 1, 1, 1, [Border.bottom]),
          item6: gridBlock(7, 1, 1, 1, []),
          item7: gridBlock(8, 1, 1, 1, [Border.bottom]),
          item8: gridBlock(9, 1, 1, 1, []),
          item9: gridBlock(10, 1, 1, 1, [Border.bottom]),
          item10: gridBlock(11, 1, 1, 1, []),
          item11: gridBlock(12, 1, 1, 1, [Border.bottom]),
          item12: gridBlock(13, 1, 1, 1, [])
        }
      },
      tablet: {
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto auto auto auto auto auto auto auto auto auto",
        gridRowGap: "auto",
        gridColumnGap: "20px",
        gridBlocks: {
          item0: gridBlock(1, 1, 1, 2, []),
          item1: gridBlock(3, 1, 1, 1, [Border.bottom]),
          item2: gridBlock(2, 1, 1, 2, []),
          item3: gridBlock(3, 2, 1, 1, [Border.bottom]),
          item4: gridBlock(4, 1, 1, 2, []),
          item5: gridBlock(6, 1, 1, 1, [Border.bottom]),
          item6: gridBlock(5, 1, 1, 2, []),
          item7: gridBlock(6, 2, 1, 1, [Border.bottom]),
          item8: gridBlock(7, 1, 1, 2, []),
          item9: gridBlock(9, 1, 1, 1, [Border.bottom]),
          item10: gridBlock(8, 1, 1, 2, []),
          item11: gridBlock(9, 2, 1, 1, [Border.bottom]),
          item12: gridBlock(10, 1, 1, 2, [])
        }
      },
      desktop: {
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "auto auto auto auto auto auto auto auto auto ",
        gridRowGap: "auto",
        gridColumnGap: "20px",
        gridBlocks: {
          item0: gridBlock(1, 1, 1, 3, []),
          item1: gridBlock(4, 1, 1, 1, [Border.bottom]),
          item2: gridBlock(2, 1, 1, 3, []),
          item3: gridBlock(4, 2, 1, 1, [Border.bottom]),
          item4: gridBlock(3, 1, 1, 3, []),
          item5: gridBlock(4, 3, 1, 1, [Border.bottom]),
          item6: gridBlock(5, 1, 1, 3, []),
          item7: gridBlock(8, 1, 1, 1, [Border.bottom]),
          item8: gridBlock(6, 1, 1, 3, []),
          item9: gridBlock(8, 2, 1, 1, [Border.bottom]),
          item10: gridBlock(7, 1, 1, 3, []),
          item11: gridBlock(8, 3, 1, 1, [Border.bottom]),
          item12: gridBlock(9, 1, 1, 3, [])
        }
      }
    }
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
