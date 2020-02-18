import { Logo } from "../../../../common/Logo";
import { Strap } from "../../strap";

export enum NetworkBrand {
  DominionPost = "DominionPost",
  ThePress = "ThePress",
  WaikatoTimes = "WaikatoTimes",
  Auckland = "Auckland",
  SouthlandTimes = "SouthlandTimes",
  TaranakiDailyNews = "TaranakiDailyNews",
  ManawatuStandard = "ManawatuStandard",
  NelsonMail = "NelsonMail",
  MarlboroughExpress = "MarlboroughExpress",
  TimaruHerald = "TimaruHerald"
}

export interface IBrandConfig {
  logo: Logo;
  bulletColor: string;
  sourceId: Strap;
}

export type INetworkBrandConfig = {
  [key in NetworkBrand]: IBrandConfig;
};
