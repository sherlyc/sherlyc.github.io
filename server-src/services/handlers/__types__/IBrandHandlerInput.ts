import { HandlerInputType } from "./HandlerInputType";

export enum BrandModule {
  Partner = "Partner",
  Network = "Network",
  PartnerV2 = "PartnerV2"
}

export interface IBrandHandlerInput {
  type: HandlerInputType.Brand;
  module: BrandModule;
}
