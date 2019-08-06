import featureHandler from './feature-handler';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { IParams } from '../../__types__/IParams';
import { IFeatureContainer } from '../../../../common/__types__/IFeatureContainer';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IExternalContentUnit } from '../../../../common/__types__/IExternalContentUnit';
import { FeatureName } from '../../../../common/FeatureName';
import { IExternalContentHandlerInput } from '../__types__/IExternalContentHandlerInput';

describe('Feature Handler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  it('should return specified content block', async () => {
    const handlerRunnerMock = jest.fn();
    const fakeBlock = {
      type: ContentBlockType.ExternalContentUnit,
      url: '/abc',
      width: '200px',
      height: '100%'
    } as IExternalContentUnit;
    handlerRunnerMock.mockResolvedValue([fakeBlock]);

    const expectedResult: IFeatureContainer = {
      type: ContentBlockType.FeatureContainer,
      name: FeatureName.Fake,
      content: [fakeBlock]
    };

    const result = await featureHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.Feature,
        name: FeatureName.Fake,
        content: {
          type: HandlerInputType.ExternalContent,
          url: '/abc',
          width: '200px',
          height: '100%'
        } as IExternalContentHandlerInput
      },
      params
    );

    expect(result).toEqual([expectedResult]);
  });
});
