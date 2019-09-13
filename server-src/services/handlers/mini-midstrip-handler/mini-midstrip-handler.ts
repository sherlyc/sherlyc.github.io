import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { handlerRunnerFunction } from '../runner';
import { IImageLinkUnit } from '../../../../common/__types__/IImageLinkUnit';
import { IParams } from '../../__types__/IParams';
import { IMiniMidStripHandlerInput } from '../__types__/IMiniMidStripHandlerInput';
import { Strap } from '../../strap';
import { getStrapArticles } from '../../adapters/strap-list-service';

export default async function(
  handlerRunner: handlerRunnerFunction,
  { totalArticles, strapName, sourceId }: IMiniMidStripHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const rawArticles = await getStrapArticles(
    params,
    sourceId as Strap,
    totalArticles
  );
  const miniMidStripArticles = rawArticles.slice(0, totalArticles);

  return [
    {
      type: ContentBlockType.ColumnContainer,
      items: miniMidStripArticles.reduce(
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
    },
    { type: ContentBlockType.BasicAdUnit, context: strapName }
  ];
}
