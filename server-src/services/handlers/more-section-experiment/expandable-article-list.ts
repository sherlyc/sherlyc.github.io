import { handlerRunnerFunction } from "../runner";
import { IParams } from "../../__types__/IParams";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IExpandableArticleListHandlerInput } from "../__types__/IExpandableArticleListHandlerInput";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../adapters/__types__/IRawArticle";
import { chunk, flatten } from "lodash";
import { basicArticleUnit } from "../../adapters/article-converter/basic-article-unit.converter";
import { basicArticleTitleUnit } from "../../adapters/article-converter/basic-article-title.converter";

const createArticlesForPage = (
  articles: IRawArticle[],
  basicArticlesPerPage: number,
  strapName: string
) =>
  articles.reduce((final, article, index) => {
    if (index < basicArticlesPerPage) {
      return [...final, basicArticleUnit(article, strapName)];
    }
    return [...final, basicArticleTitleUnit(article, strapName)];
  }, [] as IContentBlock[]);

const formatArticleBlocks = (
  articles: IRawArticle[],
  basicArticlesPerPage: number,
  basicTitleArticlesPerPage: number,
  strapName: string
) => {
  const totalArticlesPerPage = basicArticlesPerPage + basicTitleArticlesPerPage;
  const pagedArticles = chunk(articles, totalArticlesPerPage);
  const articleBlocks = pagedArticles.map((articlesForPage) =>
    createArticlesForPage(articlesForPage, basicArticlesPerPage, strapName)
  );
  return flatten(articleBlocks);
};

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    sourceId,
    strapName,
    basicArticlesPerPage = 0,
    basicTitleArticlesPerPage = 0,
    pages
  }: IExpandableArticleListHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const totalArticles =
    (basicArticlesPerPage + basicTitleArticlesPerPage) * pages;
  const articles = await getRawArticles(sourceId, totalArticles, params);

  return formatArticleBlocks(
    articles,
    basicArticlesPerPage,
    basicTitleArticlesPerPage,
    strapName
  );
}
