import { ContentBlockType } from "./ContentBlockType";
import { IContentBlock } from "./IContentBlock";

export interface IExperimentContainer {
  type: ContentBlockType.ExperimentContainer;
  name: string;
  variants: {
    control: IContentBlock[];
    [key: string]: IContentBlock[];
  };
}
