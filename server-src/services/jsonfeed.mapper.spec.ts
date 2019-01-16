import * as jsonfeed from './fixtures/jsonfeed.json';
import * as standard from './fixtures/standard.json';
import map from './jsonfeed.mapper';

describe('JsonFeed', () => {
  it('should map jsonfeed to standard json format', () => {
    expect(map(jsonfeed)).toEqual(standard);
  });
});
