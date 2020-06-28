import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  GridContainerVariation,
  IGridConfig
} from "../../../../../common/__types__/IGridContainer";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";
import { homepageArticle } from "../../../adapters/article-converter/homepage-article.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import logger from "../../../utils/logger";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import { BrandGridPositions } from "../../__types__/IBrandGridHandlerInput";
import {
  ILifeStyleHandlerInput,
  LifeStyleGridPositions
} from "../../__types__/ILifeStyleHandlerInput";

const getOrEmpty = (array: any[], index: number) =>
  array.length > index ? [array[index]] : [];

export default async function (
  handlerRunner: handlerRunnerFunction,
  { sourceId, strapName, displayName, color, linkUrl }: ILifeStyleHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const total = 10;
  let articles: IRawArticle[] = [];
  try {
    articles = await getRawArticles(sourceId, total, params);
  } catch (error) {
    logger.error(params.apiRequestId, `Lifestyle handler error`, error);
    return [];
  }

  const homepageArticles = articles.map((article) =>
    homepageArticle(
      article as IRawArticle,
      strapName,
      color,
      {
        mobile: Orientation.Portrait,
        tablet: Orientation.Portrait,
        desktop: Orientation.Portrait
      },
      false,
      true
    )
  );

  const content: { [key: string]: IContentBlock[] } = {
    [BrandGridPositions.ModuleTitle]: [
      {
        type: ContentBlockType.ModuleHeader,
        title: displayName,
        url: linkUrl,
        color
      }
    ],
    [LifeStyleGridPositions.FirstRowOne]: getOrEmpty(homepageArticles, 0),
    [LifeStyleGridPositions.FirstRowTwo]: getOrEmpty(homepageArticles, 1),
    [LifeStyleGridPositions.FirstRowThree]: getOrEmpty(homepageArticles, 2),
    [LifeStyleGridPositions.FirstRowFour]: getOrEmpty(homepageArticles, 3),
    [LifeStyleGridPositions.FirstRowFive]: getOrEmpty(homepageArticles, 4),
    [LifeStyleGridPositions.SecondRowOne]: getOrEmpty(homepageArticles, 5),
    [LifeStyleGridPositions.SecondRowTwo]: getOrEmpty(homepageArticles, 6),
    [LifeStyleGridPositions.SecondRowThree]: getOrEmpty(homepageArticles, 7),
    [LifeStyleGridPositions.SecondRowFour]: getOrEmpty(homepageArticles, 8),
    [LifeStyleGridPositions.SecondRowFive]: getOrEmpty(homepageArticles, 9)
  };

  const mobile: IGridConfig = {
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto auto auto auto auto auto",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridBlocks: {
      [LifeStyleGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 3, []),
      [LifeStyleGridPositions.FirstRowOne]: gridBlock(2, 1, 1, 1, []),
      [LifeStyleGridPositions.FirstRowTwo]: gridBlock(2, 2, 1, 1, []),

      [LifeStyleGridPositions.FirstRowThree]: gridBlock(3, 1, 1, 1, []),
      [LifeStyleGridPositions.FirstRowFour]: gridBlock(3, 2, 1, 1, []),

      [LifeStyleGridPositions.FirstRowFive]: gridBlock(4, 1, 1, 1, []),
      [LifeStyleGridPositions.SecondRowOne]: gridBlock(4, 2, 1, 1, []),

      [LifeStyleGridPositions.SecondRowTwo]: gridBlock(5, 1, 1, 1, []),
      [LifeStyleGridPositions.SecondRowThree]: gridBlock(5, 2, 1, 1, []),

      [LifeStyleGridPositions.SecondRowFour]: gridBlock(6, 1, 1, 1, []),
      [LifeStyleGridPositions.SecondRowFive]: gridBlock(6, 2, 1, 1, [])
    }
  };

  const tablet: IGridConfig = {
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto auto auto auto auto auto",
    gridRowGap: "20px",
    gridColumnGap: "20px",
    gridBlocks: {
      [LifeStyleGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 3, []),
      [LifeStyleGridPositions.FirstRowOne]: gridBlock(2, 1, 1, 1, []),
      [LifeStyleGridPositions.FirstRowTwo]: gridBlock(2, 2, 1, 1, []),

      [LifeStyleGridPositions.FirstRowThree]: gridBlock(3, 1, 1, 1, []),
      [LifeStyleGridPositions.FirstRowFour]: gridBlock(3, 2, 1, 1, []),

      [LifeStyleGridPositions.FirstRowFive]: gridBlock(4, 1, 1, 1, []),
      [LifeStyleGridPositions.SecondRowOne]: gridBlock(4, 2, 1, 1, []),

      [LifeStyleGridPositions.SecondRowTwo]: gridBlock(5, 1, 1, 1, []),
      [LifeStyleGridPositions.SecondRowThree]: gridBlock(5, 2, 1, 1, []),

      [LifeStyleGridPositions.SecondRowFour]: gridBlock(6, 1, 1, 1, []),
      [LifeStyleGridPositions.SecondRowFive]: gridBlock(6, 2, 1, 1, [])
    }
  };

  const desktop: IGridConfig = {
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    gridTemplateRows: "auto auto auto",
    gridRowGap: "20px",
    gridColumnGap: "20px",
    gridBlocks: {
      [LifeStyleGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 5, []),
      [LifeStyleGridPositions.FirstRowOne]: gridBlock(2, 1, 1, 1, []),
      [LifeStyleGridPositions.FirstRowTwo]: gridBlock(2, 2, 1, 1, []),
      [LifeStyleGridPositions.FirstRowThree]: gridBlock(2, 3, 1, 1, []),
      [LifeStyleGridPositions.FirstRowFour]: gridBlock(2, 4, 1, 1, []),
      [LifeStyleGridPositions.FirstRowFive]: gridBlock(2, 5, 1, 1, []),

      [LifeStyleGridPositions.SecondRowOne]: gridBlock(3, 1, 1, 1, []),
      [LifeStyleGridPositions.SecondRowTwo]: gridBlock(3, 2, 1, 1, []),
      [LifeStyleGridPositions.SecondRowThree]: gridBlock(3, 3, 1, 1, []),
      [LifeStyleGridPositions.SecondRowFour]: gridBlock(3, 4, 1, 1, []),
      [LifeStyleGridPositions.SecondRowFive]: gridBlock(3, 5, 1, 1, [])
    }
  };
  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile,
      tablet,
      desktop,
      variation: GridContainerVariation.Border
    }
  ];
}
