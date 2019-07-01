import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { getListAsset } from '../../adapters/jsonfeed';
import { IMidStripHandlerInput } from '../__types__/IMidStripHandlerInput';
import { handlerRunnerFunction } from '../runner';
import { IImageLinkUnit } from '../../../../common/__types__/IImageLinkUnit';
import { IParams } from '../../__types__/IParams';
import { ListAsset } from '../../listAsset';
import logger from '../../utils/logger';

export default async function(
  handlerRunner: handlerRunnerFunction,
  { totalArticles, strapName }: IMidStripHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  try {
    const rawArticles = (await getListAsset(
      params,
      ListAsset.MidStrip,
      totalArticles
    )).slice(0, totalArticles);

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
  } catch (e) {
    logger.error(
      params.apiRequestId,
      `Midstrip handler error for ${strapName} - ${e}`
    );
    return [];
  }
}
