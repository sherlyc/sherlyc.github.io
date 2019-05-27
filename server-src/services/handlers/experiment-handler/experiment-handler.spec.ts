import { HandlerInput } from './../__types__/HandlerInput';
import experimentHandler from './experiment-handler';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { IParams } from '../../__types__/IParams';
import { IExperimentContainer } from '../../../../common/__types__/IExperimentContainer';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IBreakingNews } from '../../../../common/__types__/IBreakingNews';

describe('Experiment Handler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  it('should return Toucan content block when experiment name is Toucan', async () => {
    const handlerRunnerMock = jest.fn();
    handlerRunnerMock.mockResolvedValue([
      {
        type: ContentBlockType.BreakingNews,
        id: 'fake',
        text: 'fake',
        link: 'fake'
      } as IBreakingNews
    ]);

    const expectedResult: IExperimentContainer = {
      type: ContentBlockType.ExperimentContainer,
      name: 'Toucan',
      variants: {
        purpleBackground: {
          type: ContentBlockType.BreakingNews,
          id: 'fake',
          text: 'fake',
          link: 'fake'
        } as IBreakingNews,
        orangeBackground: {
          type: ContentBlockType.BreakingNews,
          id: 'fake',
          text: 'fake',
          link: 'fake'
        } as IBreakingNews
      }
    };

    const result = await experimentHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.Experiment,
        name: 'Toucan',
        variants: {
          purpleBackground: {
            type: HandlerInputType.BreakingNews
          },
          orangeBackground: {
            type: HandlerInputType.BreakingNews
          }
        }
      },
      params
    );

    expect(result).toEqual([expectedResult]);
  });
});
