import { getExperimentVariant } from './experiment';
import { DeviceType } from '../../../common/DeviceType';
import { IParams } from '../__types__/IParams';
import cacheHttp from '../utils/cache-http';
import { IExperimentsConfig } from '../__types__/IExperimentsConfig';
import { ExperimentName } from '../../../common/ExperimentName';
import { FeatureName } from '../../../common/FeatureName';

jest.mock('../utils/cache-http');

xdescribe('Experiment service', () => {
  const params: IParams = { apiRequestId: '123123' };

  test.each([['variantOne', 10], ['variantTwo', 11]])(
    'should return %s that lottery number %i is in range for',
    async (expectedVariant, lotteryNumber) => {
      const config = {
        FunnyExperiment: {
          variantOne: {
            public: { min: 1, max: 10 },
            internal: 404
          },
          variantTwo: {
            public: { min: 11, max: 20 },
            internal: 505
          }
        }
      } as IExperimentsConfig;
      (cacheHttp as jest.Mock).mockResolvedValueOnce({ data: config });

      const experimentVariant = await getExperimentVariant(
        'FunnyExperiment' as ExperimentName,
        lotteryNumber as number,
        DeviceType.unknown,
        params
      );

      expect(experimentVariant).toEqual(expectedVariant);
    }
  );

  test.each([['variantOne', 404], ['variantTwo', 505]])(
    'should return %s where the lottery number %i matches the internal number',
    async (expectedVariant, lotteryNumber) => {
      const config = {
        FunnyExperiment: {
          variantOne: {
            public: { min: 1, max: 10 },
            internal: 404
          },
          variantTwo: {
            public: { min: 11, max: 20 },
            internal: 505
          }
        }
      } as IExperimentsConfig;
      (cacheHttp as jest.Mock).mockResolvedValueOnce({ data: config });

      const experimentVariant = await getExperimentVariant(
        'FunnyExperiment' as ExperimentName,
        lotteryNumber as number,
        DeviceType.desktop,
        params
      );

      expect(experimentVariant).toEqual(expectedVariant);
    }
  );

  it('should return variant that the lottery number is in range for and is an accepted device', async () => {
    const config = {
      FunnyExperiment: {
        variantOne: {
          devices: [DeviceType.tablet],
          public: { min: 1, max: 10 },
          internal: 404
        },
        variantTwo: {
          devices: [DeviceType.mobile],
          public: { min: 1, max: 10 },
          internal: 404
        }
      }
    } as IExperimentsConfig;
    (cacheHttp as jest.Mock).mockResolvedValueOnce({ data: config });

    const experimentVariant = await getExperimentVariant(
      'FunnyExperiment' as ExperimentName,
      5,
      DeviceType.mobile,
      params
    );

    expect(experimentVariant).toEqual('variantTwo');
  });

  it('should return control if the lottery number is in not in any range and not matching any internal numbers', async () => {
    const config = {
      FunnyExperiment: {
        variantOne: {
          public: { min: 1, max: 10 },
          internal: 111
        },
        variantTwo: {
          public: { min: 11, max: 20 },
          internal: 222
        }
      }
    } as IExperimentsConfig;
    (cacheHttp as jest.Mock).mockResolvedValueOnce({ data: config });

    const experimentVariant = await getExperimentVariant(
      'FunnyExperiment' as ExperimentName,
      25,
      DeviceType.unknown,
      params
    );

    expect(experimentVariant).toEqual('control');
  });

  it('should return control when there are devices listed and the device type is not included in the variant', async () => {
    const config = {
      FunnyExperiment: {
        variantOne: {
          devices: [DeviceType.tablet],
          public: { min: 1, max: 10 },
          internal: 123
        }
      }
    } as IExperimentsConfig;
    (cacheHttp as jest.Mock).mockResolvedValueOnce({ data: config });

    const experimentVariant = await getExperimentVariant(
      'FunnyExperiment' as ExperimentName,
      10,
      DeviceType.mobile,
      params
    );

    expect(experimentVariant).toEqual('control');
  });

  it('should return control if experiment is not in the config', async () => {
    const config = {
      FunnyExperiment: {
        variantOne: { internal: 123 }
      }
    } as IExperimentsConfig;
    (cacheHttp as jest.Mock).mockResolvedValueOnce({ data: config });

    const experimentVariant = await getExperimentVariant(
      'NotFunnyExperiment' as ExperimentName,
      123,
      DeviceType.mobile,
      params
    );

    expect(experimentVariant).toEqual('control');
  });
});
