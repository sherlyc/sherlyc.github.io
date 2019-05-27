import { IExperimentContainer } from 'common/__types__/IExperimentContainer';
import { IExperimentHandlerInput } from '../__types__/IExperimentHandlerInput';
import { handlerRunnerFunction } from '../runner';
import { IParams } from 'server-src/services/__types__/IParams';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IBreakingNews } from '../../../../common/__types__/IBreakingNews';

export default async function(
  handlerRunner: handlerRunnerFunction,
  { name }: IExperimentHandlerInput,
  params: IParams
): Promise<IExperimentContainer[]> {
  return [
    {
      type: ContentBlockType.ExperimentContainer,
      name,
      variants: {
        redHeadline: {} as IBreakingNews,
        greenHeadline: {} as IBreakingNews
      }
    }
  ];
}
