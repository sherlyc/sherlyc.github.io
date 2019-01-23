import generate from '../layoutGenerator';
import * as articleList from '../../__test__/fixtures/standard.json';
import * as homepageLayout from './fixtures/homepageLayout.json';

describe('Homepage Layout', () => {
  it('should generate a homepage layout', () => {
    expect(generate(articleList)).toEqual(homepageLayout);
  });
});
