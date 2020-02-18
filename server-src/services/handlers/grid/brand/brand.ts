import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { BrandGridPositions } from "../../__types__/IBrandGridHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IBulletList } from "../../../../../common/__types__/IBulletList";
import { BrandConfig } from "./brand-config";
import { Strap } from "../../../strap";
import { Logo } from "../../../../../common/Logo";
import { IBrandHandlerInput } from "../../__types__/IBrandHandlerInput";
import { bulletItem } from "../../../adapters/article-converter/bullet-item.converter";
import { contentErrorHandler } from "../content-error-handler";

const createBulletList = async (logo: Logo, bulletColor: string, params: IParams): Promise<IBulletList> => {
  const sourceId = Strap.EditorPicks;
  const totalArticles = 5;
  const articles = await getRawArticles(sourceId, totalArticles, params);

  const bulletItems = articles.map(article => (
    contentErrorHandler(
      () =>
        bulletItem(article, sourceId, bulletColor
        ),
      HandlerInputType.Brand,
      sourceId,
      params
    )
  ));

  return {
    type: ContentBlockType.BulletList,
    logo,
    items: bulletItems,
  };
};

export default async function(
  handlerRunner: handlerRunnerFunction,
  {}: IBrandHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const bulletLists = await Promise.all(Object.keys(BrandConfig).map(network => {
    const { logo, bulletColor } = BrandConfig[network];
    return createBulletList(logo, bulletColor, params);
  }));

  const content: { [key in BrandGridPositions]: IContentBlock[] } = {
    [BrandGridPositions.ModuleTitle]: [{
      type: ContentBlockType.ModuleTitle,
      displayName: "Our Partners",
      displayNameColor: "navyblue"
    }],
    [BrandGridPositions.FirstRow]: [
      ...await handlerRunner({
        type: HandlerInputType.ColumnGrid,
        content: [ bulletLists.slice(0, 4) ]
      }, params)
    ],
    [BrandGridPositions.SecondRow]: [
      ...await handlerRunner({
        type: HandlerInputType.ColumnGrid,
        content: [ bulletLists.slice(5) ]
      }, params)
    ]
  };

  return [
    ...await handlerRunner({
      type: HandlerInputType.BrandGrid,
      content
    }, params)
  ];
}
