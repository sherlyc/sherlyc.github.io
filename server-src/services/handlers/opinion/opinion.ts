import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { homepageArticleContent } from "../../adapters/article-converter/homepage-article-content.converter";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import { Strap } from "../../strap";
import { IParams } from "../../__types__/IParams";
import { handlerRunnerFunction } from "../runner";
import { IOpinionHandlerInput } from "../__types__/IOpinionHandlerInput";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { strapName, displayName }: IOpinionHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const jsonFeedArticles = await getRawArticles(Strap.Opinion, 5, params);
  return [
    {
      type: ContentBlockType.Opinion,
      articles: jsonFeedArticles.map(homepageArticleContent),
      strapName,
      displayName
    }
  ];
}
