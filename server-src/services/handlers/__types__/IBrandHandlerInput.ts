import { HandlerInputType } from "./HandlerInputType";

export enum BrandModule {
  Partner = "Partner",
  Network = "Network"
}

export interface IBrandHandlerInput {
  type: HandlerInputType.Brand;
  module: BrandModule;
}
