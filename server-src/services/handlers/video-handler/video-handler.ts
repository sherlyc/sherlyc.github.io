import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import config from '../../utils/config';
import { IBasicArticleSection } from '../../../../common/__types__/IBasicArticleSection';
import { isFeatureEnabled } from '../../feature';
import { FeatureName } from '../../../../common/FeatureName';

export default async function(): Promise<IBasicArticleSection[]> {
  return [
    {
      type: ContentBlockType.BasicArticleSection,
      displayName: 'Video',
      displayNameColor: 'teal',
      linkUrl: 'https://play.stuff.co.nz',
      items: [
        isFeatureEnabled(FeatureName.playStuffWidget, 0)
          ? {
              type: ContentBlockType.ExternalContentUnit,
              height: 'calc(56% + 216px)',
              width: '100%',
              url:
                'https://www.playwidget.stuff.co.nz/hshelf/5d3a9a3fa0e845001c7c998a'
            }
          : {
              type: ContentBlockType.VideoUnit,
              videoConfig: config.videoConfig
            }
      ]
    }
  ];
}
