import { handlerRunnerFunction } from '../runner';
import { IBasicArticleSectionHandlerInput } from '../__types__/IBasicArticleSectionHandlerInput';
import { IParams } from '../../__types__/IParams';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IExpandableArticleSectionHandlerInput } from '../__types__/IExpandableArticleSectionHandlerInput';
import { IBasicAdUnit } from '../../../../common/__types__/IBasicAdUnit';

const basicAdUnit = (context: string): IBasicAdUnit => ({
  type: ContentBlockType.BasicAdUnit,
  context
});

const injectAdUnits = (
  articles: IContentBlock[],
  strapName: string,
  adInFirstSlot: boolean
) =>
  articles.reduce(
    (final, article) => {
      return [...final, article, basicAdUnit(strapName)];
    },
    adInFirstSlot ? [basicAdUnit(strapName)] : ([] as IContentBlock[])
  );

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    displayName,
    displayNameColor,
    linkUrl,
    content
  }: IExpandableArticleSectionHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const articleBlocks = await handlerRunner(content, params);
  const {
    pages,
    strapName,
    basicArticlesPerPage = 0,
    basicTitleArticlesPerPage = 0
  } = content;
  const totalPerPage = basicArticlesPerPage + basicTitleArticlesPerPage;
  const totalArticles = totalPerPage * pages;
  const visibleItems = injectAdUnits(
    articleBlocks.slice(0, totalPerPage),
    strapName,
    true
  );
  const hiddenItems = injectAdUnits(
    articleBlocks.slice(totalPerPage, totalArticles),
    strapName,
    false
  );

  return [
    {
      type: ContentBlockType.ExpandableArticleSection,
      displayName,
      displayNameColor,
      linkUrl,
      visibleItems,
      hiddenItems
    }
  ];
}
