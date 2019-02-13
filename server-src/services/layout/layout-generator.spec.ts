import * as articleList from './__fixtures__/standard.json';
import generate from './layout-generator';
import * as homepageLayout from './__fixtures__/homepage.json';
import * as homepage from './__fixtures__/homepage-layout.json';
import { IRawArticle } from '../__types__/IRawArticle';
import { IContentBlock } from '../../../common/__types__/IContentBlock';
import layoutRegistry from './layout-registry';

jest.mock('./layout-registry', () => ({
  __esModule: true,
  default: {
    homepage: jest.fn(
      (articles: IRawArticle[]): IContentBlock[] =>
        homepageLayout as IContentBlock[]
    )
  }
}));

describe('Layout Generator', () => {
  it('should apply the homepage layout', () => {
    expect(generate(articleList)).toEqual(homepage);
    expect(layoutRegistry['homepage'] as jest.Mock).toBeCalledTimes(1);
  });
});
