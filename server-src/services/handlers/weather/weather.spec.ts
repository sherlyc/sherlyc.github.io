import WeatherHandler from './weather';
import { IParams } from '../../__types__/IParams';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { IWeatherUnit } from 'common/__types__/IWeatherUnit';

describe('WeatherHandler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  it('should return WeatherUnit', async () => {
    const handlerRunnerMock = jest.fn();
    const weatherUnit = (await WeatherHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.Weather
      },
      params
    )) as IWeatherUnit[];

    const expectedResult: IContentBlock[] = [
      {
        type: ContentBlockType.WeatherUnit
      } as IWeatherUnit
    ];

    expect(weatherUnit).toEqual(expectedResult);
  });
});
