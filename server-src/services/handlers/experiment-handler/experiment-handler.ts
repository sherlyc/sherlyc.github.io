import { IExperimentContainer } from 'common/__types__/IExperimentContainer';
import { IExperimentHandlerInput } from '../__types__/IExperimentHandlerInput';
import { handlerRunnerFunction } from '../runner';
import { IParams } from 'server-src/services/__types__/IParams';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IBreakingNews } from '../../../../common/__types__/IBreakingNews';
import { HandlerInputType } from '../__types__/HandlerInputType';

export default async function(
  handlerRunner: handlerRunnerFunction,
  { name }: IExperimentHandlerInput,
  params: IParams
): Promise<IExperimentContainer[]> {
  const breakingNews = (await handlerRunner(
    {
      type: HandlerInputType.BreakingNews
    },
    params
  ))[0];

  return [
    {
      type: ContentBlockType.ExperimentContainer,
      name,
      variants: {
        redHeadline: breakingNews,
        greenHeadline: breakingNews
      }
    }
  ];
}
