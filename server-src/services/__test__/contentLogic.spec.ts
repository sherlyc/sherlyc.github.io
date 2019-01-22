import { IContentRule } from '../../interfaces/IContentRule';
import { IRawArticle } from '../../interfaces/IRawArticle';
import * as articleList from './fixtures/standard.json';
import * as olderToNewest from './fixtures/olderToNewest.json';
import applyRules from '../content-logic/contentLogic';

jest.mock('../content-logic/rulesLoader', () => ({
  __esModule: true,
  default: (): Map<string, IContentRule> => {
    const rules: Map<string, IContentRule> = new Map();
    const dummyRule: IContentRule = (articles: IRawArticle[]) => articles;
    rules.set('dummy', dummyRule);
    return rules;
  }
}));

describe('Content Logic', () => {
  it('should apply all the rules provided a list of article', () => {
    const expectedArticleList: IRawArticle[] = olderToNewest;
    expect(applyRules(articleList)).toEqual(expectedArticleList);
  });
});
