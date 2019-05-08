import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';
import { getMiniMidStrip } from '../adapters/jsonfeed';
import { handlerRunnerFunction } from './runner';
import { IImageLinkUnit } from '../../../common/__types__/IImageLinkUnit';
import { IParams } from '../__types__/IParams';
import { IMiniMidStripHandlerInput } from './__types__/IMiniMidStripHandlerInput';

export default async function(
  handlerRunner: handlerRunnerFunction,
  {  }: IMiniMidStripHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const rawArticles = await getMiniMidStrip(params);

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
