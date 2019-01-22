import * as articleList from './fixtures/standard.json';
import applyRules from '../content-logic/contentLogic';

describe('Content Logic', () => {
  it('should sort a provided standard article list from oldest to newest', () => {
    const expectedOldestToNewest = [
      {
        id: '109810764',
        indexHeadline: 'Wanted: Tree planters for $400 a day',
        introText:
          "Is this the biggest hurdle for Government's one billion trees campaign?",
        linkUrl:
          '/business/farming/109810764/400-a-day-to-plant-trees-but-no-one-wants-the-job',
        imageSrc:
          'https://resources.stuff.co.nz/content/dam/images/1/t/f/z/u/4/image.related.StuffBigHeadline.418x220.1tdmj0.png/1547601996972.jpg',
        displayTime: '20190116T142633+1300'
      },
      {
        id: '109962196',
        indexHeadline: 'Not even Christmas is safe',
        introText:
          'Unruly travelling family hit an Auckland Caltex four times. They even took the Christmas tree.',
        linkUrl:
          '/national/109962196/cctv-shows-unruly-travelling-family-taking-christmas-tree-from-auckland-caltex',
        imageSrc:
          'https://resources.stuff.co.nz/content/dam/images/1/t/g/v/e/d/image.related.StuffBigHeadline.418x220.1tgvdg.png/1547607024623.jpg',
        displayTime: '20190116T154002+1300'
      }
    ];

    const result = applyRules(articleList);

    expect(result).toEqual(expectedOldestToNewest);
  });
});
