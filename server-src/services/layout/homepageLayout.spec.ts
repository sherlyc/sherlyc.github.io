import generate from './layoutGenerator';
import * as articleList from './__fixtures__/standard.json';
import * as homepage from './__fixtures__/homepage.json';

describe('Homepage Layout', () => {
  it('should generate a homepage layout', () => {
    expect(generate(articleList)).toEqual(homepage);
  });
});
