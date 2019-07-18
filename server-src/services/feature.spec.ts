import { isFeatureEnabled } from './feature';
import { FeatureName } from '../../common/FeatureName';

describe('Feature service', () => {
  it('should return false by default', () => {
    expect(isFeatureEnabled('' as FeatureName, 1)).toEqual(false);
  });
});
