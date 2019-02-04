import * as articleList from './fixtures/standard.json';
import generate from '../layoutGenerator';
import * as homepageLayout from './fixtures/homepage.json';
import { IRawArticle } from '../../__types__/IRawArticle';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
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
    expect(layoutRegistry['homepage'] as jest.Mock).toBeCalledTimes(1);
  });
});
