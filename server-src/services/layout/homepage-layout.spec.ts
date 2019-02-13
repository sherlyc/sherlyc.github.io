import generate from './layout-generator';
import * as articleList from './__fixtures__/standard.json';
import * as homepage from './__fixtures__/homepage-layout.json';

describe('Homepage Layout', () => {
  it('should generate a homepage layout', () => {
    expect(generate(articleList)).toEqual(homepage);
  });
});
