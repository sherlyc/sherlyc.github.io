import {
  getArticleById,
  getListAssetById,
  getSectionArticleList
} from './jsonfeed';
import * as jsonfeed from './__fixtures__/jsonfeed.json';
import * as midStripData from './__fixtures__/mid-strip.json';
import { Section } from '../../section';
import { IParams } from '../../__types__/IParams';
import { IRawArticle } from '../__types__/IRawArticle';
import { JsonFeedAssetType } from '../__types__/JsonFeedAssetType';
import { IJsonFeedArticle } from '../__types__/IJsonFeedArticle';
import {
  retrieveArticle,
  retrieveListAsset,
  retrieveSectionList
} from './jsonfeed-retriever';
import { JsonFeedImageType } from '../__types__/JsonFeedImageType';

jest.mock('./jsonfeed-retriever');

describe('json feed service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  it('should provide a raw article list given a json feed section', async () => {
    (retrieveSectionList as jest.Mock).mockReturnValue(jsonfeed);

    const articles = await getSectionArticleList(Section.Latest, 2, params);

    verifyArticles(articles);
  });

  it('should provide list asset data given the json feed list id', async () => {
    (retrieveListAsset as jest.Mock).mockReturnValue(midStripData);

    const midStripArticles = await getListAssetById(params, '8438437', 2);

    verifyArticles(midStripArticles);
  });

  it('should get article and map it to raw article', async () => {
    const jsonFeedArticle: IJsonFeedArticle = {
      id: 1,
      asset_type: JsonFeedAssetType.ARTICLE,
      headline_flags: [],
      sponsored: false,
      path: '/link',
      title: 'Article Title',
      alt_headline: 'Alt headline',
      isHeadlineOverrideApplied: true,
      datetime_iso8601: '20190116T154002+1300',
      alt_intro: 'Hello',
      images: [
        {
          id: 109962229,
          position_after_paragraph: 0,
          datetime_iso8601: '20190116T154002+1300',
          datetime_display: '15:40 16/01/2019',
          creditline: 'SUPPLIED',
          source_code: '1national-newsroom',
          source_name: 'Stuff',
          caption:
            'Two children from the travelling family help themselves to the Christmas tree at Caltex Albany.',
          variants: [
            {
              id: 109962229,
              layout: JsonFeedImageType.SMALL_THUMBNAIL,
              src:
                'https://resources.stuff.co.nz/content/dam/images/1/t/g/v/e/d/image.related.StuffThumbnail.90x60.1tgvdg.png/1547607024623.jpg',
              media_type: 'Photo',
              width: 90,
              height: 60,
              urls: {
                '90x60':
                  'https://resources.stuff.co.nz/content/dam/images/1/t/g/v/e/d/image.related.StuffThumbnail.90x60.1tgvdg.png/1547607024623.jpg',
                '180x120':
                  'https://resources.stuff.co.nz/content/dam/images/1/t/g/v/e/d/image.related.StuffThumbnail.180x120.1tgvdg.png/1547607024623.jpg'
              },
              image_type_id: 'StuffThumbnail'
            }
          ]
        }
      ]
    };
    (retrieveArticle as jest.Mock).mockReturnValue(jsonFeedArticle);

    const article = await getArticleById(params, 1234);
    verifyArticles([article]);
  });
});

function verifyArticles(articles: IRawArticle[]) {
  articles.forEach((article) => {
    expect(article.id).toBeTruthy();
    expect(article.indexHeadline).toBeTruthy();
    expect(article.introText).toBeTruthy();
    expect(article.linkUrl).toBeTruthy();
    expect(article.imageSrc).toBeTruthy();
    expect(article.imageSrcSet).toBeTruthy();
    expect(article.lastPublishedTime).toBeTruthy();
    expect(article.headlineFlags).toBeTruthy();
  });
}
