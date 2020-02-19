import {
  INetworkBrandConfig,
  IPartnerBrandConfig,
  NetworkBrand,
  PartnerBrand
} from "../../__types__/IBrandConfig";
import { Logo } from "../../../../../common/Logo";
import { Strap } from "../../../strap";
import { BrandModule } from "../../__types__/IBrandHandlerInput";

export const networkBrandConfig: INetworkBrandConfig = {
  moduleTitle: "our network's top stories",
  articlesPerBrand: 5,
  brandListPerRow: 5,
  configs: {
    [NetworkBrand.DominionPost]: {
      logo: Logo.DominionPost,
      bulletColor: "#2583B1",
      sourceId: Strap.DominionPost
    },
    [NetworkBrand.ThePress]: {
      logo: Logo.ThePress,
      bulletColor: "#094B85",
      sourceId: Strap.ThePress
    },
    [NetworkBrand.WaikatoTimes]: {
      logo: Logo.WaikatoTimes,
      bulletColor: "black",
      sourceId: Strap.WaikatoTimes
    },
    [NetworkBrand.Auckland]: {
      logo: Logo.ThePress,
      bulletColor: "#488CCB",
      sourceId: Strap.Auckland
    },
    [NetworkBrand.SouthlandTimes]: {
      logo: Logo.SouthlandTimes,
      bulletColor: "#99495C",
      sourceId: Strap.SouthlandTimes
    },
    [NetworkBrand.TaranakiDailyNews]: {
      logo: Logo.TaranakiDailyNews,
      bulletColor: "#2583B1",
      sourceId: Strap.TaranakiDailyNews
    },
    [NetworkBrand.ManawatuStandard]: {
      logo: Logo.ManawatuStandard,
      bulletColor: "#A6CE37",
      sourceId: Strap.ManawatuStandard
    },
    [NetworkBrand.NelsonMail]: {
      logo: Logo.NelsonMail,
      bulletColor: "#094B85",
      sourceId: Strap.NelsonMail
    },
    [NetworkBrand.MarlboroughExpress]: {
      logo: Logo.MarlboroughExpress,
      bulletColor: "#E11A21",
      sourceId: Strap.MarlboroughExpress
    },
    [NetworkBrand.TimaruHerald]: {
      logo: Logo.TimaruHerald,
      bulletColor: "#231E1F",
      sourceId: Strap.TimaruHerald
    }
  }
};

export const partnerBrandConfig: IPartnerBrandConfig = {
  moduleTitle: "our partners",
  articlesPerBrand: 5,
  brandListPerRow: 4,
  configs: {
    [PartnerBrand.Newsroom]: {
      logo: Logo.Newsroom,
      bulletColor: "black",
      sourceId: Strap.Newsroom
    },
    [PartnerBrand.NowToLove]: {
      logo: Logo.NowToLove,
      bulletColor: "#172B53",
      sourceId: Strap.NowToLove
    },
    [PartnerBrand.HomesToLove]: {
      logo: Logo.HomesToLove,
      bulletColor: "#5FC770",
      sourceId: Strap.HomesToLove
    },
    [PartnerBrand.FoodToLove]: {
      logo: Logo.FoodToLove,
      bulletColor: "#F6626E",
      sourceId: Strap.FoodToLove
    },
    [PartnerBrand.BeautyHeaven]: {
      logo: Logo.BeautyHeaven,
      bulletColor: "#25BED9",
      sourceId: Strap.BeautyHeaven
    },
    [PartnerBrand.Metro]: {
      logo: Logo.Metro,
      bulletColor: "black",
      sourceId: Strap.Metro
    },
    [PartnerBrand.Noted]: {
      logo: Logo.Noted,
      bulletColor: "black",
      sourceId: Strap.Noted
    },
    [PartnerBrand.Tarana]: {
      logo: Logo.Tarana,
      bulletColor: "#D1171F",
      sourceId: Strap.Tarana
    }
  }
};

export const brandConfig = {
  [BrandModule.Network]: networkBrandConfig,
  [BrandModule.Partner]: partnerBrandConfig
};
