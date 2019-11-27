import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IMidStripHandlerInput } from '../__types__/IMidStripHandlerInput';
import { handlerRunnerFunction } from '../runner';
import { IImageLinkUnit } from '../../../../common/__types__/IImageLinkUnit';
import { IParams } from '../../__types__/IParams';
import { Strap } from '../../strap';
import { getStrapArticles } from '../../adapters/strap-list/strap-list-service';

export default async function(
  handlerRunner: handlerRunnerFunction,
  { totalArticles, strapName, sourceId }: IMidStripHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const rawArticles = await getStrapArticles(
    params,
    sourceId as Strap,
    totalArticles
  );

  const midStripArticles = rawArticles.slice(0, totalArticles);

  return [
    {
      type: ContentBlockType.ColumnContainer,
      items: midStripArticles.reduce(
        (final, article) => [
          ...final,
          {
            type: ContentBlockType.ImageLinkUnit,
            id: article.id,
            strapName: strapName,
            indexHeadline: article.indexHeadline,
            title: article.title,
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
