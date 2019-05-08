import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';
import getRawArticleList, { getMidStrip } from '../adapters/jsonfeed';
import { IMidStripHandlerInput } from './__types__/IMidStripHandlerInput';
import { handlerRunnerFunction } from './runner';
import { IImageLinkUnit } from '../../../common/__types__/IImageLinkUnit';
import { IParams } from '../__types__/IParams';

export default async function(
  handlerRunner: handlerRunnerFunction,
  { totalArticles }: IMidStripHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const rawArticles = (await getMidStrip(totalArticles, params)).slice(
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
