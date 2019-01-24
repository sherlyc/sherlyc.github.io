import * as articleList from '../../__test__/fixtures/standard.json';
import generate from '../layoutGenerator';
import * as homepageLayout from './fixtures/homepageLayout.json';
import { IRawArticle } from '../../../interfaces/IRawArticle';
import { IContentBlock } from '../../../interfaces/content-blocks/IContentBlock';
import layoutRegistry from '../layoutRegistry';

jest.mock('../layoutRegistry', () => ({
  __esModule: true,
  default: {
    homepage: jest.fn(
      (articles: IRawArticle[]): IContentBlock[] => homepageLayout
    )
  }
}));

describe('Layout Generator', () => {
  it('should apply the homepage layout', () => {
    expect(generate(articleList)).toEqual(homepageLayout);
    expect((layoutRegistry['homepage'] as jest.Mock).mock.calls.length).toEqual(
      1
    );
  });
});
