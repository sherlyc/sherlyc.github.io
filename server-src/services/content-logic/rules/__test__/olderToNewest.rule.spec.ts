import applyRules from '../content-logic/contentLogic';
import * as articleList from './fixtures/standard.json';
import * as olderToNewest from './fixtures/olderToNewest.json';

describe('Older to newest rule', () => {
  it('should sort a provided standard article list from older to newest', () => {
    const expectedOldestToNewest = olderToNewest;
    const result = applyRules(articleList);

    expect(result).toEqual(expectedOldestToNewest);
  });
});
