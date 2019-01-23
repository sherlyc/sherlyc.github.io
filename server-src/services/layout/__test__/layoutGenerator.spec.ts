import * as articleList from '../../__test__/fixtures/standard.json';
import generate from '../layoutGenerator';
import * as homepageLayout from './fixtures/homepageLayout.json';

describe('Layout Generator', () => {
  it('should apply the homepage layout', () => {
    expect(generate(articleList)).toEqual(homepageLayout);
  });
});
