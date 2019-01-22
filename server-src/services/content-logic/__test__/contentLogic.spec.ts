import { IContentRule } from '../../interfaces/IContentRule';
import { IRawArticle } from '../../interfaces/IRawArticle';
import * as articleList from './fixtures/standard.json';
import * as olderToNewest from './fixtures/olderToNewest.json';
import applyRules from '../content-logic/contentLogic';

const mockRule: IContentRule = jest.fn((articles: IRawArticle[]) => articles);
jest.mock('../content-logic/rulesLoader', () => ({
  __esModule: true,
  default: (): Map<string, IContentRule> => new Map([['dummy', mockRule]])
}));

describe('Content Logic', () => {
  it('should apply all the rules provided a list of article', () => {
    const expectedArticleList: IRawArticle[] = olderToNewest;
    expect(applyRules(articleList)).toEqual(expectedArticleList);
    expect((mockRule as any).mock.calls.length).toEqual(1);
  });
});
