import { isFeatureEnabled } from './feature';
import { FeatureName } from '../../common/FeatureName';

const _Date = Date;

function fakeDate(defaultDate: string | number) {
  // @ts-ignore
  global.Date = (arg: any) => new _Date(arg || defaultDate);
  global.Date.UTC = _Date.UTC;
}

function randomLottery() {
  return Math.floor(Math.random() * 10);
}

describe('Feature service', () => {
  afterAll(() => {
    global.Date = _Date;
  });

  it(`should return false for ${FeatureName.VideoHubFeature} when now is earlier than 5am NZT Tuesday 6th`, () => {
    fakeDate('2019-08-06T04:00:00+12:00');
    expect(
      isFeatureEnabled(FeatureName.VideoHubFeature, randomLottery())
    ).toEqual(false);
  });

  it(`should return true for ${FeatureName.VideoHubFeature} when now is later than 5am NZT Tuesday 6th`, () => {
    fakeDate('2019-08-06T05:01:00+12:00');
    expect(
      isFeatureEnabled(FeatureName.VideoHubFeature, randomLottery())
    ).toEqual(true);
  });
});
