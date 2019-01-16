import * as jsonfeed from './jsonfeed.json';
import * as standardJson from './standard-json.json';
import transform from './transformer';

describe('JsonFeed', () => {
  it('should transform jsonfeed into standard json format', () => {
    expect(transform(jsonfeed)).toEqual(standardJson);
  });
});
