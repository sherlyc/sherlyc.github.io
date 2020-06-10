import { ContentBlockType } from "./ContentBlockType";
import { IBrightcoveVideo } from "./IBrightcoveVideo";

export interface IPlayStuff {
  type: ContentBlockType.PlayStuff;
  videos: IBrightcoveVideo[];
}
