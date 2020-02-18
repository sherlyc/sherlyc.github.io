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
  Noted = "Noted",
  NowToLove = "NowToLove",
  HomesToLove = "HomesToLove",
  FoodToLove = "FoodToLove",
  BeautyHeaven = "BeautyHeaven",
  Metro = "Metro",
  Newsroom = "Newsroom",
  Tarana = "Tarana",
}

export interface IBrandListConfig {
  logo: Logo;
  bulletColor: string;
  sourceId: Strap;
}

export interface INetworkBrandConfig {
  articlesPerBrand: number;
  articlesPerRow: number;
  configs: { [key in NetworkBrand]: IBrandListConfig };
}

export interface IPartnerBrandConfig {
  articlesPerBrand: number;
  articlesPerRow: number;
  configs: { [key in PartnerBrand]: IBrandListConfig };
}
