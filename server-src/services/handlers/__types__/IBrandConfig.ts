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

export enum PartnerBrand {
  Bravo = "Bravo",
  Newsroom = "Newsroom",
  Tarana = "Tarana"
}

export interface IBrandListConfig {
  logo: Logo;
  logoLink: string;
  bulletColor: string;
  sourceId: Strap;
}

export interface INetworkBrandConfig {
  moduleTitle: string;
  articlesPerBrand: number;
  brandListPerRow: number;
  configs: { [key in NetworkBrand]: IBrandListConfig };
}

export interface IPartnerBrandConfig {
  moduleTitle: string;
  articlesPerBrand: number;
  brandListPerRow: number;
  configs: { [key in PartnerBrand]: IBrandListConfig };
}
