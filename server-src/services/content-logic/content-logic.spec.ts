import { IContentRule } from './__types__/IContentRule';
import { IRawArticle } from '../__types__/IRawArticle';
import * as articleList from './__fixtures__/standard.json';
import ruleRegistry from './rule-registry';
import applyRules from './content-logic';

jest.mock('./rule-registry', () => ({
  __esModule: true,
  default: { dummy: jest.fn((articles: IRawArticle[]) => articles.reverse()) }
}));

describe('Content Logic', () => {
  it('should apply all the rules provided a list of article', () => {
    const expectedArticleList: IRawArticle[] = articleList.reverse();
    expect(applyRules(articleList)).toEqual(expectedArticleList);
    Object.values(ruleRegistry).forEach((rule: IContentRule) => {
      expect(rule).toBeCalledTimes(1);
    });
  });
});
