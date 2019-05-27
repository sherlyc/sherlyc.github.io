import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import config from '../../utils/config';
import { IBasicArticleSection } from '../../../../common/__types__/IBasicArticleSection';

export default async function(): Promise<IBasicArticleSection[]> {
  return [
    {
      type: ContentBlockType.BasicArticleSection,
      displayName: 'Video',
      displayNameColor: 'teal',
      linkUrl: '/video',
      items: [
        {
          type: ContentBlockType.VideoUnit,
          videoConfig: config.videoConfig
        }
      ]
    }
  ];
}
