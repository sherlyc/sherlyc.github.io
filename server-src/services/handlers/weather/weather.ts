import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IParams } from "../../__types__/IParams";
import { handlerRunnerFunction } from "../runner";
import { IWeatherHandlerInput } from "../__types__/IWeatherHandlerInput";

export default async function(
  handlerRunner: handlerRunnerFunction,
  input: IWeatherHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return [
    {
      type: ContentBlockType.WeatherUnit
    }
  ];
}
