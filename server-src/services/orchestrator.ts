import { IContentBlock } from '../../common/__types__/IContentBlock';
import handlerRunner from './handlers/runner';
import { Section } from './section';

export default async (): Promise<IContentBlock[]> => {
  try {
    return await handlerRunner({
      type: 'Page',
      items: [
        {
          type: 'ArticleList',
          sectionId: Section.Latest,
          totalArticles: 6
        },
        {
          type: 'ArticleSection',
          displayName: 'Sport',
          displayNameColor: 'blue',
          linkUrl: '#',
          articleList: {
            sectionId: Section.Sport,
            totalArticles: 8
          }
        },
        {
          type: 'ArticleSection',
          displayName: 'National',
          displayNameColor: 'red',
          linkUrl: '#',
          articleList: {
            sectionId: Section.National,
            totalArticles: 2
          }
        }
      ]
    });
  } catch (e) {
    return [
      { type: 'Header' },
      {
        type: 'Container',
        items: [{ type: 'ErrorBlock', message: e.message }]
      },
      { type: 'Footer' }
    ];
  }
};
