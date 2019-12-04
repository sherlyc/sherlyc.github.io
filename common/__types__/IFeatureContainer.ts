import { ContentBlockType } from "./ContentBlockType";
import { IContentBlock } from "./IContentBlock";
import { FeatureName } from "../FeatureName";

export interface IFeatureContainer {
  type: ContentBlockType.FeatureContainer;
  name: FeatureName;
  content: IContentBlock[];
}
