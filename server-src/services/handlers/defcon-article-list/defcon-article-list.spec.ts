import { IRawArticle } from '../../adapters/__types__/IRawArticle';

describe('DefconArticleList', () => {
  const basicAdUnit = {
    type: 'BasicAdUnit'
  };

  const articleNumberOne = {
    id: '1',
    indexHeadline: 'Defcon Headline',
    introText: 'Defcon Intro',
    linkUrl: '/link1',
    imageSrc: 'defcon.jpg',
    imageSrcSet: 'defcon.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleNumberTwo = {
    id: '1',
    indexHeadline: 'Headline 1',
    introText: 'Intro 1',
    linkUrl: '/link1',
    imageSrc: '1.jpg',
    imageSrcSet: '1.jpg 1w',
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleNumberThree = {
    id: '2',
    indexHeadline: 'Headline 2',
    introText: 'Intro 2',
    linkUrl: '/link2',
    imageSrc: '2.jpg',
    imageSrcSet: '2.jpg 2w',
    lastPublishedTime: 2,
    headlineFlags: []
  };

  const rawDefconArticleList: IRawArticle[] = [
    articleNumberOne,
    articleNumberTwo,
    articleNumberThree
  ];

  const articleNumberOneAsDefconArticleUnit = {
    ...articleNumberOne,
    type: 'DefconArticleUnit'
  };

  const articleNumberTwoAsBasicArticle = {
    ...articleNumberTwo,
    type: 'BasicArticleUnit'
  };

  const articleNumberThreeAsBasicArticle = {
    ...articleNumberThree,
    type: 'BasicArticleUnit'
  };

  beforeEach(() => {
    jest.resetModules();
  });

  it('should get a list of Defcon Article Unit and article units', async () => {});
});
