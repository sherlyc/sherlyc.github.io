import { ContentBlockType } from "./ContentBlockType";

export interface IOliSlotConfig {
  adUnitPath: string;
  size: googletag.GeneralSize;
  targetingParams: { [key: string]: string };
  elementId: string;
}

export interface IOli {
  type: ContentBlockType.Oli;
  config: Omit<IOliSlotConfig, "elementId">;
}
