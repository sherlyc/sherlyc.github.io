import { getRawArticles } from './article-retriever';
import { Section } from '../../section';
import { LayoutType } from '../__types__/LayoutType';
import { IParams } from '../../__types__/IParams';
import * as jsonFeed from '../jsonfeed';
import * as strapListService from '../strap-list-service';
import { Strap } from '../../strap';
import { IRawArticle } from '../__types__/IRawArticle';

describe('Raw article retriever', () => {
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

  it('it should swap the first and second articles on default top stories layout', async () => {
    const articleOne = { id: '1' };
    const articleTwo = { id: '2' };
    const getStrapArticles = jest.spyOn(strapListService, 'getStrapArticles');
    getStrapArticles.mockResolvedValue([
      articleOne,
      articleTwo
    ] as IRawArticle[]);

    const articles = await getRawArticles(
      Strap.TopStories,
      3,
      LayoutType.DEFAULT,
      params
    );

    expect(articles).toEqual([articleTwo, articleOne]);
  });

  it('it should not swap the first and second articles if the top stories layout is not default', async () => {
    const articleOne = { id: '1' };
    const articleTwo = { id: '2' };
    const getStrapArticles = jest.spyOn(strapListService, 'getStrapArticles');
    getStrapArticles.mockResolvedValue([
      articleOne,
      articleTwo
    ] as IRawArticle[]);

    const articles = await getRawArticles(
      Strap.TopStories,
      3,
      LayoutType.DEFCON,
      params
    );

    expect(articles).toEqual([articleOne, articleTwo]);
  });

  it('it should not swap the first and second articles if the source is not top stories', async () => {
    const articleOne = { id: '1' };
    const articleTwo = { id: '2' };
    const getStrapArticles = jest.spyOn(strapListService, 'getStrapArticles');
    getStrapArticles.mockResolvedValue([
      articleOne,
      articleTwo
    ] as IRawArticle[]);

    const articles = await getRawArticles(
      Strap.National,
      3,
      LayoutType.DEFAULT,
      params
    );

    expect(articles).toEqual([articleOne, articleTwo]);
  });
});
