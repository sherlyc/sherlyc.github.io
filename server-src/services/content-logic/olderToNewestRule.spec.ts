import * as articleList from './__fixtures__/standard.json';
import * as olderToNewestExpected from './__fixtures__/olderToNewest.json';
import olderToNewest from './olderToNewestRule';

describe('Older to newest rule', () => {
  it('should sort a provided standard article list from older to newest', () => {
    const result = olderToNewest(Object.values(articleList));
    expect(result).toEqual(olderToNewestExpected);
  });
});
