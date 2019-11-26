import { getExperimentVariant } from './experiment';
import { DeviceType } from '../../../common/DeviceType';
import { IParams } from '../__types__/IParams';
import { ExperimentName } from '../../../common/ExperimentName';

jest.mock('../utils/cache-http');

describe('Experiment service', () => {
  const params: IParams = { apiRequestId: '123123' };

  it('should return control if experiment is not in the config', async () => {
    const experimentVariant = await getExperimentVariant(
      'NotAnExperiment' as ExperimentName,
      50,
      DeviceType.mobile,
      params
    );

    expect(experimentVariant).toBe('control');
  });

  describe('Users', () => {
    it.each([[1], [50], [100], [404]])(
      'should return TopStoriesVisualExperiment variant on mobile for numbers 1 to 100 and 404 - lottery number %i',
      async (lotteryNumber: number) => {
        const experimentVariant = await getExperimentVariant(
          ExperimentName.Users,
          lotteryNumber,
          DeviceType.mobile,
          params
        );

        expect(experimentVariant).toBe('TopStoriesVisualExperiment');
      }
    );

    it('should return MoreSection variant with number 505 on mobile', async () => {
      const experimentVariant = await getExperimentVariant(
        ExperimentName.Users,
        505,
        DeviceType.mobile,
        params
      );

      expect(experimentVariant).toBe('MoreSection');
    });

    it.each([[DeviceType.desktop], [DeviceType.tablet], [DeviceType.unknown]])(
      'should return control with %s device',
      async (deviceType: DeviceType) => {
        const experimentVariant = await getExperimentVariant(
          ExperimentName.Users,
          505,
          deviceType,
          params
        );

        expect(experimentVariant).toBe('control');
      }
    );
  });

  describe('TopStoriesVisualExperiment', () => {
    test.each([[1], [34], [65], [100], [404]])(
      'should return groupOne variant for numbers 1 to 100 and 404 - lottery number %i',
      async (lotteryNumber: number) => {
        const experimentVariant = await getExperimentVariant(
          ExperimentName.TopStoriesVisualExperiment,
          lotteryNumber,
          DeviceType.mobile,
          params
        );

        expect(experimentVariant).toBe('groupOne');
      }
    );

    it.each([[DeviceType.desktop], [DeviceType.tablet], [DeviceType.unknown]])(
      'should return control with %s device',
      async (deviceType: DeviceType) => {
        const experimentVariant = await getExperimentVariant(
          ExperimentName.TopStoriesVisualExperiment,
          100,
          deviceType,
          params
        );

        expect(experimentVariant).toBe('control');
      }
    );
  });

  describe('MoreSection', () => {
    it('should return groupOne variant with number 404 for Users experiment on mobile', async () => {
      const experimentVariant = await getExperimentVariant(
        ExperimentName.MoreSection,
        404,
        DeviceType.mobile,
        params
      );

      expect(experimentVariant).toBe('groupOne');
    });

    it('should return groupTwo variant with number 505 for Users experiment on mobile', async () => {
      const experimentVariant = await getExperimentVariant(
        ExperimentName.MoreSection,
        505,
        DeviceType.mobile,
        params
      );

      expect(experimentVariant).toBe('groupTwo');
    });

    it.each([[1], [50], [100]])(
      'should return control variant for numbers 1 to 100 - lottery number %i',
      async (lotteryNumber: number) => {
        const experimentVariant = await getExperimentVariant(
          ExperimentName.MoreSection,
          lotteryNumber,
          DeviceType.mobile,
          params
        );

        expect(experimentVariant).toBe('control');
      }
    );

    it.each([[DeviceType.desktop], [DeviceType.tablet], [DeviceType.unknown]])(
      'should return control with %s device',
      async (deviceType: DeviceType) => {
        const experimentVariant = await getExperimentVariant(
          ExperimentName.MoreSection,
          505,
          deviceType,
          params
        );

        expect(experimentVariant).toBe('control');
      }
    );
  });
});
