import generate from '../layoutGenerator';
import * as articleList from './fixtures/standard.json';
import * as homepage from './fixtures/homepage.json';

describe('Homepage Layout', () => {
  it('should generate a homepage layout', () => {
    expect(generate(articleList)).toEqual(homepage);
  });
});
