import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';
import getRawArticleList from '../adapters/jsonfeed';
import { IMidStripHandlerInput } from './__types__/IMidStripHandlerInput';
import { handlerRunnerFunction } from './runner';
import { IImageLinkUnit } from '../../../common/__types__/IImageLinkUnit';

export default async function(
  handlerRunner: handlerRunnerFunction,
  { sectionId, totalArticles }: IMidStripHandlerInput
): Promise<IContentBlock[]> {
  const rawArticles = (await getRawArticleList(sectionId, totalArticles)).slice(
    0,
    totalArticles
  );

  return [
    {
      type: ContentBlockType.ColumnContainer,
      items: rawArticles.reduce(
        (final, article) => [
          ...final,
          {
            type: ContentBlockType.ImageLinkUnit,
            indexHeadline: article.indexHeadline,
            imageSrc: article.imageSrc,
            linkUrl: article.linkUrl,
            headlineFlags: article.headlineFlags
          } as IImageLinkUnit
        ],
        [] as IContentBlock[]
      )
    }
  ];
}
