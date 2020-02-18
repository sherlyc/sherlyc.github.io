import { Logo } from "../../../../common/Logo";

export interface IPartnerNetworkConfig {
  [sourceId: string]: {
    logo: Logo;
    bulletColor: string;
  };
}
