import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { handlerRunnerFunction } from '../runner';
import { IParams } from '../../__types__/IParams';
import { IExternalContentHandlerInput } from '../__types__/IExternalContentHandlerInput';

export default async function(
  handlerRunner: handlerRunnerFunction,
  { url, height, width, marginBottom, scrollable }: IExternalContentHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return [
    {
      type: ContentBlockType.ExternalContentUnit,
      url,
      width,
      height,
      marginBottom,
      scrollable
    }
  ];
}
