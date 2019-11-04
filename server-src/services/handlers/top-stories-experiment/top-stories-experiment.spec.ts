import topStoriesExperiment from './top-stories-experiment';
import { ITopStoriesHandlerInput } from '../__types__/ITopStoriesHandlerInput';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { IParams } from '../../__types__/IParams';
import { ExperimentName } from '../../../../common/ExperimentName';

describe('Top Stories Experiment', () => {
  const params: IParams = { apiRequestId: '123123' };
  const strapName = 'Top Stories';

  it('should return experiment container with control, groupOne and groupTwo handlers', async () => {
    const handlerRunner = jest.fn();
    const handlerInput: ITopStoriesHandlerInput = {
      type: HandlerInputType.TopStoriesExperiment,
      strapName,
      totalArticles: 6
    };

    const expectedContainer = {
      type: HandlerInputType.Experiment,
      name: ExperimentName.TopStoriesVisualExperiment,
      variants: {
        control: {
          type: HandlerInputType.TopStoriesArticleList,
          strapName,
          totalArticles: handlerInput.totalArticles
        },
        groupOne: {
          type: HandlerInputType.TopStoriesArticleListGroupOne,
          strapName,
          totalArticles: handlerInput.totalArticles
        },
        groupTwo: {
          type: HandlerInputType.TopStoriesArticleListGroupTwo,
          strapName,
          totalArticles: handlerInput.totalArticles
        }
      }
    };

    await topStoriesExperiment(handlerRunner, handlerInput, params);

    expect(handlerRunner).toHaveBeenCalledWith(expectedContainer, params);
  });
});
