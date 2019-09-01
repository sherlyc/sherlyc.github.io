import { getExperimentVariant } from './experiment';
import { Experiments } from '../../common/Experiments';
import { DeviceType } from '../../common/DeviceType';

describe('Experiment service', () => {
  it('should return control when lottery number is not 404 for Users', () => {
    const variant = 'control';
    const experimentName = Experiments.Users;
    const lotteryNumber = 1;
    expect(
      getExperimentVariant(experimentName, lotteryNumber, DeviceType.unknown)
    ).toEqual(variant);
  });

  it('should return TopStoriesVisualExperiment when lottery number is 404 for Users', () => {
    const experimentName = Experiments.Users;
    const lotteryNumber = 404;
    expect(
      getExperimentVariant(experimentName, lotteryNumber, DeviceType.unknown)
    ).toEqual(Experiments.TopStoriesVisualExperiment);
  });

  it('should return groupOne when lottery number is 404 and device is mobile for TopStoriesVisualExperiment', () => {
    const experimentVariant = getExperimentVariant(
      'TopStoriesVisualExperiment',
      404,
      DeviceType.mobile
    );

    expect(experimentVariant).toEqual('groupOne');
  });

  it('should return control when lottery number is 404 and device is not mobile for TopStoriesVisualExperiment', () => {
    const experimentVariant = getExperimentVariant(
      'TopStoriesVisualExperiment',
      404,
      DeviceType.unknown
    );

    expect(experimentVariant).toEqual('control');
  });

  it('should return groupTwo when lottery number is 505 and device is mobile for TopStoriesVisualExperiment', () => {
    const experimentVariant = getExperimentVariant(
      'TopStoriesVisualExperiment',
      505,
      DeviceType.mobile
    );

    expect(experimentVariant).toEqual('groupTwo');
  });

  it('should return control when lottery number is 505 and device is not mobile for TopStoriesVisualExperiment', () => {
    const experimentVariant = getExperimentVariant(
      'TopStoriesVisualExperiment',
      505,
      DeviceType.tablet
    );

    expect(experimentVariant).toEqual('control');
  });

  it('should return groupOne when lottery number is -1 and device is mobile for TopStoriesVisualExperiment', () => {
    const experimentVariant = getExperimentVariant(
      'TopStoriesVisualExperiment',
      -1,
      DeviceType.mobile
    );

    expect(experimentVariant).toEqual('groupOne');
  });

  it('should return control when lottery number is not 404 or 505 for TopStoriesVisualExperiment', () => {
    const experimentVariant = getExperimentVariant(
      'TopStoriesVisualExperiment',
      1,
      DeviceType.mobile
    );

    expect(experimentVariant).toEqual('control');
  });

  it('should return control for other experiments', () => {
    const variant = 'control';
    const experimentName = 'Random experiment';
    const lotteryNumber = 1;
    expect(
      getExperimentVariant(experimentName, lotteryNumber, DeviceType.unknown)
    ).toEqual(variant);
  });
});
