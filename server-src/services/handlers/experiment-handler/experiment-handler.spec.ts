import experimentHandler from './experiment-handler';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { IParams } from '../../__types__/IParams';
import { IExperimentContainer } from '../../../../common/__types__/IExperimentContainer';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IBreakingNews } from '../../../../common/__types__/IBreakingNews';

describe('Experiment Handler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  it('should return parrot content block when experiment name is parrot', async () => {
    const handlerRunnerMock = jest.fn();
    const expectedResult: IExperimentContainer = {
      type: ContentBlockType.ExperimentContainer,
      name: 'Parrot',
      variants: {
        redHeadline: {} as IBreakingNews,
        greenHeadline: {} as IBreakingNews
      }
    };

    const result = await experimentHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.Experiment,
        name: 'Parrot'
      },
      params
    );

    expect(result).toEqual([expectedResult]);
  });
});
