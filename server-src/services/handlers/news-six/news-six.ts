import { handlerRunnerFunction } from "../runner";
import { IParams } from "../../__types__/IParams";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { INewsSixHandlerInput } from "../__types__/INewsSixHandlerInput";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IRawArticle } from "../../adapters/__types__/IRawArticle";
import { IBasicArticleUnit } from "../../../../common/__types__/IBasicArticleUnit";
import { IBigImageArticleUnit } from "../../../../common/__types__/IBigImageArticleUnit";
import { IBasicArticleTitleUnit } from "../../../../common/__types__/IBasicArticleTitleUnit";

const basicArticleUnit = (
  article: IRawArticle,
  strapName: string
): IBasicArticleUnit => ({
  type: ContentBlockType.BasicArticleUnit,
  id: article.id,
  strapName: strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  introText: article.introText,
  imageSrc: article.imageSrc,
  imageSrcSet: article.imageSrcSet,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

const bigImageArticleUnit = (
  article: IRawArticle,
  strapName: string
): IBigImageArticleUnit => ({
  type: ContentBlockType.BigImageArticleUnit,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  introText: article.introText,
  imageSrc: article.strapImageSrc,
  imageSrcSet: article.strapImageSrcSet,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

const basicArticleTitleUnit = (
  article: IRawArticle,
  strapName: string
): IBasicArticleTitleUnit => ({
  type: ContentBlockType.BasicArticleTitleUnit,
  id: article.id,
  strapName: strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

export enum NewsSixPositions {
  BigTopLeft = "BigTopLeft",
  SmallTopRight = "SmallTopRight",
  SmallBottomFirst = "SmallBottomFirst",
  SmallBottomSecond = "SmallBottomSecond",
  SmallBottomThird = "SmallBottomThird",
  SmallBottomFourth = "SmallBottomFourth"
}

export default async function(
  handlerRunner: handlerRunnerFunction,
  { displayName, sourceId, type, strapName }: INewsSixHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articles = await getRawArticles(sourceId, 6, params);
  const articlesLength = articles.length;
  let contentBlocks: { [key in NewsSixPositions]: IContentBlock };
  try {
    contentBlocks = {
      [NewsSixPositions.BigTopLeft]: basicArticleUnit(
        articles.shift() as IRawArticle,
        strapName
      ),
      [NewsSixPositions.SmallTopRight]: bigImageArticleUnit(
        articles.shift() as IRawArticle,
        strapName
      ),
      [NewsSixPositions.SmallBottomFirst]: basicArticleTitleUnit(
        articles.shift() as IRawArticle,
        strapName
      ),
      [NewsSixPositions.SmallBottomSecond]: basicArticleTitleUnit(
        articles.shift() as IRawArticle,
        strapName
      ),
      [NewsSixPositions.SmallBottomThird]: basicArticleTitleUnit(
        articles.shift() as IRawArticle,
        strapName
      ),
      [NewsSixPositions.SmallBottomFourth]: basicArticleTitleUnit(
        articles.shift() as IRawArticle,
        strapName
      )
    };
  } catch (e) {
    throw new Error(
      `News Six handler error: Insufficient number of articles: ${articlesLength}. Error: ${e}`
    );
  }

  return [
    {
      type: ContentBlockType.GridContainer,
      items: contentBlocks,
      mobile: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto",
        gridGap: "0px",
        gridBlocks: {
          [NewsSixPositions.BigTopLeft]: {
            rowStart: 1,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixPositions.SmallTopRight]: {
            rowStart: 2,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomFirst]: {
            rowStart: 3,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomSecond]: {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomThird]: {
            rowStart: 5,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomFourth]: {
            rowStart: 6,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          }
        }
      },
      tablet: {
        gridTemplateColumns: "1fr 1fr 1fr 1fr 300px",
        gridTemplateRows: "1fr 1fr 1fr 1fr",
        gridGap: "10px",
        gridBlocks: {
          [NewsSixPositions.BigTopLeft]: {
            rowStart: 1,
            rowSpan: 3,
            columnStart: 1,
            columnSpan: 4
          },
          [NewsSixPositions.SmallTopRight]: {
            rowStart: 1,
            rowSpan: 3,
            columnStart: 5,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomFirst]: {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomSecond]: {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 2,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomThird]: {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 3,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomFourth]: {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 4,
            columnSpan: 1
          }
        }
      },
      desktop: {
        gridTemplateColumns: "1fr 1fr 1fr 1fr 300px",
        gridTemplateRows: "1fr 1fr 1fr 1fr",
        gridGap: "20px",
        gridBlocks: {
          [NewsSixPositions.BigTopLeft]: {
            rowStart: 1,
            rowSpan: 3,
            columnStart: 1,
            columnSpan: 4
          },
          [NewsSixPositions.SmallTopRight]: {
            rowStart: 1,
            rowSpan: 3,
            columnStart: 5,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomFirst]: {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomSecond]: {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 2,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomThird]: {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 3,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomFourth]: {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 4,
            columnSpan: 1
          }
        }
      }
    }
  ];
}
