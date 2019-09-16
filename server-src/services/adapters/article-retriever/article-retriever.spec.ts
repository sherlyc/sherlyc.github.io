import { getRawArticles } from './article-retriever';
import { Section } from '../../section';
import { LayoutType } from '../__types__/LayoutType';
import { IParams } from '../../__types__/IParams';
import * as jsonFeed from '../jsonfeed';
import * as strapListService from '../strap-list-service';
import { Strap } from '../../strap';
import { IRawArticle } from '../__types__/IRawArticle';

describe('Article retriever', () => {
  const params: IParams = { apiRequestId: '123123' };

  it('it should call getSectionArticleList when source is a section', async () => {
    const getSectionArticleList = jest.spyOn(jsonFeed, 'getSectionArticleList');
    const section = Section.Latest;
    const totalArticles = 3;

    await getRawArticles(section, totalArticles, LayoutType.DEFAULT, params);

    expect(getSectionArticleList).toHaveBeenCalledWith(
      section,
      totalArticles,
      params
    );
  });

  it('it should getStrapArticles when source is a strap', async () => {
    const getStrapArticles = jest.spyOn(strapListService, 'getStrapArticles');
    const strap = Strap.TopStories;
    const totalArticles = 3;

    await getRawArticles(strap, totalArticles, LayoutType.DEFAULT, params);

    expect(getStrapArticles).toHaveBeenCalledWith(params, strap, totalArticles);
  });
});
