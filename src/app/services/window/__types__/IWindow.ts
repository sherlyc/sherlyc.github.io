import { IDigitalData } from "../../analytics/__types__/IDigitalData";
import { IStuffLogin } from "../../authentication/__types__/IStuffLogin";
import { ShieldedSite } from "../../../content-blocks/footer/__types__/ShieldedSite";
import { NielsenAnalytics } from "../../analytics/__types__/NielsenAnalytics";
import { IDtm } from "../../dtm/__types__/IDtm";

export interface IWindow {
  digitalData: IDigitalData;
  _satellite: IDtm;
  nol_t: NielsenAnalytics;
  StuffLogin: IStuffLogin;
  ds07o6pcmkorn: ShieldedSite;
  spade: number;
}
