import * as articleList from '../../../__test__/fixtures/standard.json';
import * as olderToNewestExpected from '../../../__test__/fixtures/olderToNewest.json';
import olderToNewest from '../olderToNewest.rule';

describe('Older to newest rule', () => {
  it('should sort a provided standard article list from older to newest', () => {
    const result = olderToNewest(Object.values(articleList));
    expect(result).toEqual(olderToNewestExpected);
  });
});
