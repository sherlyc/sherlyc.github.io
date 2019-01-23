import { IContentRule } from '../../../interfaces/IContentRule';
import { IRawArticle } from '../../../interfaces/IRawArticle';
import * as articleList from '../../__test__/fixtures/standard.json';
import * as olderToNewest from '../../__test__/fixtures/olderToNewest.json';
import applyRules from '../../content-logic/contentLogic';
import { IContentRuleList } from '../../../interfaces/IContentRuleList';

const mockRule: IContentRule = jest.fn((articles: IRawArticle[]) => articles);
jest.mock('../../content-logic/rulesLoader', () => ({
  __esModule: true,
  default: (): IContentRuleList => {
    return { dummy: mockRule };
  }
}));

describe('Content Logic', () => {
  it('should apply all the rules provided a list of article', () => {
    const expectedArticleList: IRawArticle[] = olderToNewest;
    expect(applyRules(articleList)).toEqual(expectedArticleList);
    expect((mockRule as jest.Mock<IContentRule>).mock.calls.length).toEqual(1);
  });
});
