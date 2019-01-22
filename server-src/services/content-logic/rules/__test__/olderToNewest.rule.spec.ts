import applyRules from '../../../content-logic/contentLogic';
import * as articleList from '../../../__test__/fixtures/standard.json';
import * as olderToNewest from '../../../__test__/fixtures/olderToNewest.json';

describe('Older to newest rule', () => {
  it('should sort a provided standard article list from older to newest', () => {
    const expectedOldestToNewest = olderToNewest;
    const result = applyRules(articleList);

    expect(result).toEqual(expectedOldestToNewest);
  });
});
