import expandableArticleSection from './expandable-article-section';
import { IExpandableArticleSectionHandlerInput } from '../__types__/IExpandableArticleSectionHandlerInput';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { Section } from '../../section';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';

describe('Expandable article section', () => {
  const params = { apiRequestId: '123' };
  const strapName = 'Karen';

  const adUnitWithContext = {
    type: 'BasicAdUnit',
    context: strapName
  };

  const contentBlock = (id: string) =>
    ({
      type: ContentBlockType.BasicArticleUnit,
      id
    } as IContentBlock);

  it('should call handlerRunner with content', async () => {
    const handlerRunner = jest.fn();
    const handlerInput: IExpandableArticleSectionHandlerInput = {
      type: HandlerInputType.ExpandableArticleSection,
      displayName: 'Karen',
      displayNameColor: 'pink',
      linkUrl: 'karenxie.github.io',
      content: {
        type: HandlerInputType.ExpandableArticleList,
        sourceId: Section.KeaKidsNews,
        strapName,
        basicArticlesPerPage: 2,
        basicTitleArticlesPerPage: 3,
        pages: 1
      }
    };
    handlerRunner.mockResolvedValue([]);

    await expandableArticleSection(handlerRunner, handlerInput, params);

    expect(handlerRunner).toHaveBeenCalledWith(handlerInput.content, params);
  });

  it('should return expandable article section content block with no hidden content block when multiplier is 1', async () => {
    const handlerRunner = jest.fn();
    const handlerInput: IExpandableArticleSectionHandlerInput = {
      type: HandlerInputType.ExpandableArticleSection,
      displayName: 'Karen',
      displayNameColor: 'pink',
      linkUrl: 'karenxie.github.io',
      content: {
        type: HandlerInputType.ExpandableArticleList,
        sourceId: Section.KeaKidsNews,
        strapName,
        basicArticlesPerPage: 2,
        basicTitleArticlesPerPage: 3,
        pages: 1
      }
    };

    handlerRunner.mockResolvedValue([
      contentBlock('1'),
      contentBlock('2'),
      contentBlock('3'),
      contentBlock('4'),
      contentBlock('5')
    ]);

    const contentBlocks = await expandableArticleSection(
      handlerRunner,
      handlerInput,
      params
    );

    expect(contentBlocks).toEqual([
      {
        type: ContentBlockType.ExpandableArticleSection,
        displayName: 'Karen',
        displayNameColor: 'pink',
        linkUrl: 'karenxie.github.io',
        visibleItems: [
          adUnitWithContext,
          contentBlock('1'),
          adUnitWithContext,
          contentBlock('2'),
          adUnitWithContext,
          contentBlock('3'),
          adUnitWithContext,
          contentBlock('4'),
          adUnitWithContext,
          contentBlock('5'),
          adUnitWithContext
        ],
        hiddenItems: []
      }
    ]);
  });

  it('should return expandable article section content block with visible and hidden content blocks when multiplier is 2', async () => {
    const handlerRunner = jest.fn();
    const handlerInput: IExpandableArticleSectionHandlerInput = {
      type: HandlerInputType.ExpandableArticleSection,
      displayName: 'Karen',
      displayNameColor: 'pink',
      linkUrl: 'karenxie.github.io',
      content: {
        type: HandlerInputType.ExpandableArticleList,
        sourceId: Section.KeaKidsNews,
        strapName,
        basicArticlesPerPage: 2,
        basicTitleArticlesPerPage: 3,
        pages: 2
      }
    };

    handlerRunner.mockResolvedValue([
      contentBlock('1'),
      contentBlock('2'),
      contentBlock('3'),
      contentBlock('4'),
      contentBlock('5'),
      contentBlock('6'),
      contentBlock('7'),
      contentBlock('8'),
      contentBlock('9'),
      contentBlock('10')
    ]);

    const contentBlocks = await expandableArticleSection(
      handlerRunner,
      handlerInput,
      params
    );

    expect(contentBlocks).toEqual([
      {
        type: ContentBlockType.ExpandableArticleSection,
        displayName: 'Karen',
        displayNameColor: 'pink',
        linkUrl: 'karenxie.github.io',
        visibleItems: [
          adUnitWithContext,
          contentBlock('1'),
          adUnitWithContext,
          contentBlock('2'),
          adUnitWithContext,
          contentBlock('3'),
          adUnitWithContext,
          contentBlock('4'),
          adUnitWithContext,
          contentBlock('5'),
          adUnitWithContext
        ],
        hiddenItems: [
          contentBlock('6'),
          adUnitWithContext,
          contentBlock('7'),
          adUnitWithContext,
          contentBlock('8'),
          adUnitWithContext,
          contentBlock('9'),
          adUnitWithContext,
          contentBlock('10'),
          adUnitWithContext
        ]
      }
    ]);
  });

  it('should return expandable article section content block with visible and hidden content blocks when multiplier is 3', async () => {
    const handlerRunner = jest.fn();
    const handlerInput: IExpandableArticleSectionHandlerInput = {
      type: HandlerInputType.ExpandableArticleSection,
      displayName: 'Karen',
      displayNameColor: 'pink',
      linkUrl: 'karenxie.github.io',
      content: {
        type: HandlerInputType.ExpandableArticleList,
        sourceId: Section.KeaKidsNews,
        strapName,
        basicArticlesPerPage: 2,
        basicTitleArticlesPerPage: 3,
        pages: 3
      }
    };

    handlerRunner.mockResolvedValue([
      contentBlock('1'),
      contentBlock('2'),
      contentBlock('3'),
      contentBlock('4'),
      contentBlock('5'),
      contentBlock('6'),
      contentBlock('7'),
      contentBlock('8'),
      contentBlock('9'),
      contentBlock('10'),
      contentBlock('11'),
      contentBlock('12'),
      contentBlock('13'),
      contentBlock('14'),
      contentBlock('15')
    ]);

    const contentBlocks = await expandableArticleSection(
      handlerRunner,
      handlerInput,
      params
    );

    expect(contentBlocks).toEqual([
      {
        type: ContentBlockType.ExpandableArticleSection,
        displayName: 'Karen',
        displayNameColor: 'pink',
        linkUrl: 'karenxie.github.io',
        visibleItems: [
          adUnitWithContext,
          contentBlock('1'),
          adUnitWithContext,
          contentBlock('2'),
          adUnitWithContext,
          contentBlock('3'),
          adUnitWithContext,
          contentBlock('4'),
          adUnitWithContext,
          contentBlock('5'),
          adUnitWithContext
        ],
        hiddenItems: [
          contentBlock('6'),
          adUnitWithContext,
          contentBlock('7'),
          adUnitWithContext,
          contentBlock('8'),
          adUnitWithContext,
          contentBlock('9'),
          adUnitWithContext,
          contentBlock('10'),
          adUnitWithContext,
          contentBlock('11'),
          adUnitWithContext,
          contentBlock('12'),
          adUnitWithContext,
          contentBlock('13'),
          adUnitWithContext,
          contentBlock('14'),
          adUnitWithContext,
          contentBlock('15'),
          adUnitWithContext
        ]
      }
    ]);
  });

  it('should return expandable article section content block ignoring extra content blocks', async () => {
    const handlerRunner = jest.fn();
    const handlerInput: IExpandableArticleSectionHandlerInput = {
      type: HandlerInputType.ExpandableArticleSection,
      displayName: 'Karen',
      displayNameColor: 'pink',
      linkUrl: 'karenxie.github.io',
      content: {
        type: HandlerInputType.ExpandableArticleList,
        sourceId: Section.KeaKidsNews,
        strapName,
        basicArticlesPerPage: 1,
        basicTitleArticlesPerPage: 2,
        pages: 1
      }
    };

    handlerRunner.mockResolvedValue([
      contentBlock('1'),
      contentBlock('2'),
      contentBlock('3'),
      contentBlock('4'),
      contentBlock('5')
    ]);

    const contentBlocks = await expandableArticleSection(
      handlerRunner,
      handlerInput,
      params
    );

    expect(contentBlocks).toEqual([
      {
        type: ContentBlockType.ExpandableArticleSection,
        displayName: 'Karen',
        displayNameColor: 'pink',
        linkUrl: 'karenxie.github.io',
        visibleItems: [
          adUnitWithContext,
          contentBlock('1'),
          adUnitWithContext,
          contentBlock('2'),
          adUnitWithContext,
          contentBlock('3'),
          adUnitWithContext
        ],
        hiddenItems: []
      }
    ]);
  });
});
