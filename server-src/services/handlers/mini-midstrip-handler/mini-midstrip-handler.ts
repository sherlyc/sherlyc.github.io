import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { getListAsset } from '../../adapters/jsonfeed';
import { handlerRunnerFunction } from '../runner';
import { IImageLinkUnit } from '../../../../common/__types__/IImageLinkUnit';
import { IParams } from '../../__types__/IParams';
import { IMiniMidStripHandlerInput } from '../__types__/IMiniMidStripHandlerInput';
import { ListAsset } from '../../listAsset';

export default async function(
  handlerRunner: handlerRunnerFunction,
  { totalArticles, strapName }: IMiniMidStripHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const rawArticles = await getListAsset(
    params,
    ListAsset.MiniMidStrip,
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
            id: article.id,
            strapName: strapName,
            indexHeadline: article.indexHeadline,
            imageSrc: article.imageSrc,
            imageSrcSet: article.imageSrcSet,
            linkUrl: article.linkUrl,
            headlineFlags: article.headlineFlags
          } as IImageLinkUnit
        ],
        [] as IContentBlock[]
      )
    }
  ];
}
