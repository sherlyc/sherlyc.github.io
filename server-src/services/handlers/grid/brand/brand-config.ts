import {
  INetworkBrandConfig,
  NetworkBrand
} from "../../__types__/INetworkBrandConfig";
import { Logo } from "../../../../../common/Logo";
import { Strap } from "../../../strap";

export const brandConfig: INetworkBrandConfig = {
  articlesPerBrand: 5,
  configs: {
    [NetworkBrand.DominionPost]: {
      logo: Logo.DominionPost,
      bulletColor: "lightblue",
      sourceId: Strap.DominionPost
    },
    [NetworkBrand.ThePress]: {
      logo: Logo.ThePress,
      bulletColor: "blue",
      sourceId: Strap.ThePress
    },
    [NetworkBrand.WaikatoTimes]: {
      logo: Logo.WaikatoTimes,
      bulletColor: "black",
      sourceId: Strap.WaikatoTimes
    },
    [NetworkBrand.Auckland]: {
      logo: Logo.ThePress,
      bulletColor: "blue",
      sourceId: Strap.Auckland
    },
    [NetworkBrand.SouthlandTimes]: {
      logo: Logo.SouthlandTimes,
      bulletColor: "red",
      sourceId: Strap.SouthlandTimes
    },
    [NetworkBrand.TaranakiDailyNews]: {
      logo: Logo.TaranakiDailyNews,
      bulletColor: "blue",
      sourceId: Strap.TaranakiDailyNews
    },
    [NetworkBrand.ManawatuStandard]: {
      logo: Logo.ManawatuStandard,
      bulletColor: "green",
      sourceId: Strap.ManawatuStandard
    },
    [NetworkBrand.NelsonMail]: {
      logo: Logo.NelsonMail,
      bulletColor: "blue",
      sourceId: Strap.NelsonMail
    },
    [NetworkBrand.MarlboroughExpress]: {
      logo: Logo.MarlboroughExpress,
      bulletColor: "blue",
      sourceId: Strap.MarlboroughExpress
    },
    [NetworkBrand.TimaruHerald]: {
      logo: Logo.TimaruHerald,
      bulletColor: "black",
      sourceId: Strap.TimaruHerald
    }
  }
};
