import { FeatureName } from "../FeatureName";
import { ContentBlockType } from "./ContentBlockType";
import { IContentBlock } from "./IContentBlock";

export interface IFeatureContainer {
  type: ContentBlockType.FeatureContainer;
  name: FeatureName;
  content: IContentBlock[];
  fallback: IContentBlock[];
}
