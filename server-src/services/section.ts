import { IBasicArticleSectionHandlerInput } from './handlers/basic-article-section';

export enum Section {
  Latest = '',
  Sport = 'sport',
  National = 'national'
}

export const sections: IBasicArticleSectionHandlerInput[] = [
  {
    displayName: 'Latest',
    sectionId: Section.Latest,
    displayNameColor: 'black',
    linkUrl: '/',
    totalArticles: 6,
    revert: false
  },
  {
    displayName: 'National',
    sectionId: Section.National,
    displayNameColor: 'blue',
    linkUrl: '/national',
    totalArticles: 5,
    revert: false
  },
  {
    displayName: 'Sport',
    sectionId: Section.Sport,
    displayNameColor: 'red',
    linkUrl: '/sport',
    totalArticles: 3,
    revert: true
  }
];
