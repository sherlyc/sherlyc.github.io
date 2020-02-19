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
      bulletColor: "cornflowerblue",
      sourceId: Strap.DominionPost
    },
    [NetworkBrand.ThePress]: {
      logo: Logo.ThePress,
      bulletColor: "darkblue",
      sourceId: Strap.ThePress
    },
    [NetworkBrand.WaikatoTimes]: {
      logo: Logo.WaikatoTimes,
      bulletColor: "black",
      sourceId: Strap.WaikatoTimes
    },
    [NetworkBrand.Auckland]: {
      logo: Logo.ThePress,
      bulletColor: "dodgerblue",
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

export const partnerBrandConfig: IPartnerBrandConfig = {
  moduleTitle: "our partners",
  articlesPerBrand: 5,
  brandListPerRow: 4,
  configs: {
    [PartnerBrand.Noted]: {
      logo: Logo.Noted,
      bulletColor: "black",
      sourceId: Strap.Noted
    },
    [PartnerBrand.NowToLove]: {
      logo: Logo.NowToLove,
      bulletColor: "navyblue",
      sourceId: Strap.NowToLove
    },
    [PartnerBrand.HomesToLove]: {
      logo: Logo.HomesToLove,
      bulletColor: "green",
      sourceId: Strap.HomesToLove
    },
    [PartnerBrand.FoodToLove]: {
      logo: Logo.FoodToLove,
      bulletColor: "pink",
      sourceId: Strap.FoodToLove
    },
    [PartnerBrand.BeautyHeaven]: {
      logo: Logo.BeautyHeaven,
      bulletColor: "paleturquoise",
      sourceId: Strap.BeautyHeaven
    },
    [PartnerBrand.Metro]: {
      logo: Logo.Metro,
      bulletColor: "black",
      sourceId: Strap.Metro
    },
    [PartnerBrand.Newsroom]: {
      logo: Logo.Newsroom,
      bulletColor: "black",
      sourceId: Strap.Newsroom
    },
    [PartnerBrand.Tarana]: {
      logo: Logo.Tarana,
      bulletColor: "red",
      sourceId: Strap.Tarana
    }
  }
};

export const brandConfig = {
  [BrandModule.Network]: networkBrandConfig,
  [BrandModule.Partner]: partnerBrandConfig
};
