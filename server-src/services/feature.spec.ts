import { isFeatureEnabled } from './feature';
import { FeatureNames } from '../../common/FeatureNames';

describe('Feature service', () => {
  it('should return false by default', () => {
    expect(isFeatureEnabled('' as FeatureNames, 1)).toEqual(false);
  });
});
