import { IContentRule } from '../../../interfaces/IContentRule';
import { IRawArticle } from '../../../interfaces/IRawArticle';
import * as articleList from './fixtures/standard.json';
import ruleRegistry from '../ruleRegistry';
import applyRules from '../../content-logic/contentLogic';

jest.mock('../../content-logic/ruleRegistry', () => ({
  __esModule: true,
  default: { dummy: jest.fn((articles: IRawArticle[]) => articles.reverse()) }
}));

describe('Content Logic', () => {
  it('should apply all the rules provided a list of article', () => {
    const expectedArticleList: IRawArticle[] = articleList.reverse();
    expect(applyRules(articleList)).toEqual(expectedArticleList);
    Object.values(ruleRegistry).forEach((rule: IContentRule) => {
      expect(rule as jest.Mock<IContentRule>).toBeCalledTimes(1);
    });
  });
});
