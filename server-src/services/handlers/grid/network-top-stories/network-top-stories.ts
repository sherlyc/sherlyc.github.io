import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { NetworkTopStoriesGridPositions } from "../../__types__/INetworkTopStoriesGridHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IBulletList } from "../../../../../common/__types__/IBulletList";
import { NetworkConfig } from "./network-config";
import { Strap } from "../../../strap";
import { Logo } from "../../../../../common/Logo";
import { INetworkTopStoriesHandlerInput } from "../../__types__/INetworkTopStoriesHandlerInput";
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
      HandlerInputType.NetworkTopStories,
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
  {}: INetworkTopStoriesHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const bulletLists = await Promise.all(Object.keys(NetworkConfig).map(network => {
    const { logo, bulletColor } = NetworkConfig[network];
    return createBulletList(logo, bulletColor, params);
  }));

  const content: { [key in NetworkTopStoriesGridPositions]: IContentBlock[] } = {
    [NetworkTopStoriesGridPositions.ModuleTitle]: [{
      type: ContentBlockType.ModuleTitle,
      displayName: "Our Partners",
      displayNameColor: "navyblue"
    }],
    [NetworkTopStoriesGridPositions.FirstRow]: [
      ...await handlerRunner({
        type: HandlerInputType.ColumnGrid,
        content: [ bulletLists.slice(0, 4) ]
      }, params)
    ],
    [NetworkTopStoriesGridPositions.SecondRow]: [
      ...await handlerRunner({
        type: HandlerInputType.ColumnGrid,
        content: [ bulletLists.slice(5) ]
      }, params)
    ]
  };

  return [
    ...await handlerRunner({
      type: HandlerInputType.NetworkTopStoriesGrid,
      content
    }, params)
  ];
}
