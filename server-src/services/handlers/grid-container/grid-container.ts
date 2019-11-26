import { handlerRunnerFunction } from '../runner';
import { IParams } from '../../__types__/IParams';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { getRawArticles } from '../../adapters/article-retriever/article-retriever';
import { IBasicAdUnit } from '../../../../common/__types__/IBasicAdUnit';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IRawArticle } from '../../adapters/__types__/IRawArticle';
import { IBigImageArticleUnit } from '../../../../common/__types__/IBigImageArticleUnit';
import { IGridContainerHandlerInput } from '../__types__/IGridContainerHandlerInput';

const basicAdUnit = (context: string): IBasicAdUnit => ({
  type: ContentBlockType.BasicAdUnit,
  context
});

const bigImageArticleUnit = (
  article: IRawArticle,
  strapName: string
): IBigImageArticleUnit => ({
  type: ContentBlockType.BigImageArticleUnit,
  id: article.id,
  strapName,
  title: article.title,
  indexHeadline: article.indexHeadline,
  introText: article.introText,
  imageSrc: article.strapImageSrc,
  imageSrcSet: article.strapImageSrcSet,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

export default async function(
  handlerRunner: handlerRunnerFunction,
  { sourceId }: IGridContainerHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const strapName = 'Latest';
  const rawArticles = await getRawArticles(sourceId, 4, params);
  const articles = rawArticles.map((article) =>
    bigImageArticleUnit(article, strapName)
  );

  return [
    {
      type: ContentBlockType.GridContainer,
      content: [...articles.slice(0, 4), basicAdUnit(strapName)],
      mobile: {
        gridTemplateColumns: '1fr',
        gridGap: '20px',
        gridBlocks: [
          {
            rowStart: 1,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          {
            rowStart: 2,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          {
            rowStart: 3,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          {
            rowStart: 5,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          }
        ]
      },
      tablet: {
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: '20px',
        gridBlocks: [
          {
            rowStart: 1,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 3
          },
          {
            rowStart: 1,
            rowSpan: 1,
            columnStart: 4,
            columnSpan: 1
          },
          {
            rowStart: 2,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 2
          },
          {
            rowStart: 2,
            rowSpan: 1,
            columnStart: 3,
            columnSpan: 2
          },
          {
            rowStart: 3,
            rowSpan: 1,
            columnStart: 2,
            columnSpan: 2
          }
        ]
      },
      desktop: {
        gridTemplateColumns: '1fr 1fr 1fr 1fr 200px',
        gridGap: '20px',
        gridBlocks: [
          {
            rowStart: 1,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 3
          },
          {
            rowStart: 1,
            rowSpan: 1,
            columnStart: 4,
            columnSpan: 1
          },
          {
            rowStart: 2,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 2
          },
          {
            rowStart: 2,
            rowSpan: 1,
            columnStart: 3,
            columnSpan: 2
          },
          {
            rowStart: 1,
            rowSpan: 2,
            columnStart: 5,
            columnSpan: 1
          }
        ]
      }
    }
  ];
}
