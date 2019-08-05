import { FeatureName } from '../../common/FeatureName';
import * as moment from 'moment';

export const isFeatureEnabled = (
  feature: FeatureName,
  lotteryNumber: number
): boolean => {
  switch (feature) {
    case FeatureName.VideoHubFeature:
      return moment().isAfter(moment.utc('2019-08-06T05:00:00+12:00'));
    default:
      return false;
  }
};
