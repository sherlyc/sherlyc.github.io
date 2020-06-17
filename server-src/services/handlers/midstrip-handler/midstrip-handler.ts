import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { ImageLayoutType } from "../../../../common/__types__/ImageLayoutType";
import { imageLinkUnit } from "../../adapters/article-converter/image-link-unit.converter";
import { getStrapArticles } from "../../adapters/strap-list/strap-list-service";
import { Strap } from "../../strap";
import wrappedLogger from "../../utils/logger";
import { IParams } from "../../__types__/IParams";
import { handlerRunnerFunction } from "../runner";
import { IMidStripHandlerInput } from "../__types__/IMidStripHandlerInput";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { totalArticles, strapName, sourceId }: IMidStripHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  try {
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
            imageLinkUnit(article, strapName, ImageLayoutType.default)
          ],
          [] as IContentBlock[]
        )
      },
      { type: ContentBlockType.BasicAdUnit, context: strapName }
    ];
  } catch (error) {
    wrappedLogger.error(
      params.apiRequestId,
      `Midstrip handler error - ${sourceId}`,
      error
    );
    throw error;
  }
}
