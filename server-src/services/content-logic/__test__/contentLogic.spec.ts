import { IContentRule } from '../../../interfaces/IContentRule';
import { IRawArticle } from '../../../interfaces/IRawArticle';
import * as articleList from '../../__test__/fixtures/standard.json';
import applyRules from '../../content-logic/contentLogic';
import { IContentRuleRegistry } from '../../../interfaces/IContentRuleRegistry';

const mockRule: IContentRule = jest.fn((articles: IRawArticle[]) =>
  articles.reverse()
);
jest.mock('../../content-logic/rulesLoader', () => ({
  __esModule: true,
  default: (): IContentRuleRegistry => {
    return { dummy: mockRule };
  }
}));

describe('Content Logic', () => {
  it('should apply all the rules provided a list of article', () => {
    const expectedArticleList: IRawArticle[] = articleList.reverse();
    expect(applyRules(articleList)).toEqual(expectedArticleList);
    expect((mockRule as jest.Mock<IContentRule>).mock.calls.length).toEqual(1);
  });
});
