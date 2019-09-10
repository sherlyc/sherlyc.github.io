import { isFeatureEnabled } from './feature';
import { retrieveConfig } from './adapters/switches-config-retriever';
import { DeviceType } from '../../common/DeviceType';
import { IFeaturesConfig } from './__types__/IFeaturesConfig';
import { IParams } from './__types__/IParams';
import config from './utils/config';

jest.mock('./adapters/switches-config-retriever');

describe('Feature service', () => {
  const params: IParams = { apiRequestId: '123123' };

  it('should call config retriever with features config url', async () => {
    (retrieveConfig as jest.Mock).mockReturnValue({});

    await isFeatureEnabled('featureName', 50, DeviceType.mobile, params);

    expect(retrieveConfig).toHaveBeenCalledWith(
      config.featuresConfigUrl,
      params
    );
  });

  it('should return false if config is empty', async () => {
    (retrieveConfig as jest.Mock).mockReturnValue({});

    const result = await isFeatureEnabled(
      'featureName',
      50,
      DeviceType.mobile,
      params
    );

    expect(result).toBe(false);
  });

  test.each([[10, 'featureOne'], [11, 'featureTwo'], [123, 'featureOne']])(
    'should return true when lottery number %i is in public or internal for %s',
    async (lotteryNumber, featureName) => {
      const config: IFeaturesConfig = {
        featureOne: {
          public: {
            min: 1,
            max: 10
          },
          internal: 123
        },
        featureTwo: {
          public: {
            min: 11,
            max: 20
          },
          internal: 123
        }
      };
      (retrieveConfig as jest.Mock).mockReturnValue(config);

      const result = await isFeatureEnabled(
        featureName as string,
        lotteryNumber as number,
        DeviceType.unknown,
        params
      );

      expect(result).toBe(true);
    }
  );

  it('should return true if lottery number is in public or internal and has an accepted device', async () => {
    const config: IFeaturesConfig = {
      featureOne: {
        devices: [DeviceType.mobile],
        public: {
          min: 1,
          max: 10
        },
        internal: 123
      }
    };
    (retrieveConfig as jest.Mock).mockReturnValue(config);

    const result = await isFeatureEnabled(
      'featureOne',
      5,
      DeviceType.mobile,
      params
    );

    expect(result).toBe(true);
  });

  it('should return false if lottery number is in public or internal but is not an accepted device', async () => {
    const config: IFeaturesConfig = {
      featureOne: {
        devices: [DeviceType.mobile],
        public: {
          min: 1,
          max: 10
        },
        internal: 123
      }
    };
    (retrieveConfig as jest.Mock).mockReturnValue(config);

    const result = await isFeatureEnabled(
      'featureOne',
      5,
      DeviceType.tablet,
      params
    );

    expect(result).toBe(false);
  });

  it('should return false when lottery number is not in public or internal for feature', async () => {
    const config: IFeaturesConfig = {
      featureOne: {
        public: {
          min: 1,
          max: 10
        },
        internal: 123
      }
    };
    (retrieveConfig as jest.Mock).mockReturnValue(config);

    const result = await isFeatureEnabled(
      'featureOne',
      50,
      DeviceType.unknown,
      params
    );

    expect(result).toBe(false);
  });

  it('should return false when feature does not exist in config', async () => {
    const config: IFeaturesConfig = {
      featureOne: {
        public: {
          min: 1,
          max: 10
        },
        internal: 123
      }
    };
    (retrieveConfig as jest.Mock).mockReturnValue(config);

    const result = await isFeatureEnabled(
      'someOtherFeature',
      10,
      DeviceType.unknown,
      params
    );

    expect(result).toBe(false);
  });
});
