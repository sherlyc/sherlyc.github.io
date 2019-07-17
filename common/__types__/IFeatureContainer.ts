import { ContentBlockType } from './ContentBlockType';
import { IContentBlock } from './IContentBlock';
import { Features } from '../Features';

export interface IFeatureContainer {
  type: ContentBlockType.FeatureContainer;
  name: Features;
  toggle: IContentBlock[];
}
