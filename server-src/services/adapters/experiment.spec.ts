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
      'lottery numbers 1 to 100 and 404 should return TopStoriesVisualExperiment variant on mobile - number %i',
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

    it('should return MoreSection variant with lottery number 505 on mobile', async () => {
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
      'should return groupOne variant for all numbers - lottery number %i',
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

    it('should return control when device is not mobile', async () => {
      const experimentVariant = await getExperimentVariant(
        ExperimentName.TopStoriesVisualExperiment,
        100,
        DeviceType.desktop,
        params
      );
      expect(experimentVariant).toBe('control');
    });
  });

  describe('MoreSection', () => {
    it('should return groupOne variant with lottery number 404 for Users experiment on mobile', async () => {
      const experimentVariant = await getExperimentVariant(
        ExperimentName.MoreSection,
        404,
        DeviceType.mobile,
        params
      );

      expect(experimentVariant).toBe('groupOne');
    });

    it('should return groupTwo variant with lottery number 505 for Users experiment on mobile', async () => {
      const experimentVariant = await getExperimentVariant(
        ExperimentName.MoreSection,
        505,
        DeviceType.mobile,
        params
      );

      expect(experimentVariant).toBe('groupTwo');
    });

    it('should return control variant for non-mobile devices', async () => {
      const experimentVariant = await getExperimentVariant(
        ExperimentName.MoreSection,
        505,
        DeviceType.desktop,
        params
      );

      expect(experimentVariant).toBe('control');
    });
  });
});
