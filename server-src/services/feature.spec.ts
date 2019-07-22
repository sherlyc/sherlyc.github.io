import { isFeatureEnabled } from './feature';
import { FeatureName } from '../../common/FeatureName';

describe('Feature service', () => {
  it('should return false by default', () => {
    expect(isFeatureEnabled('' as FeatureName, 1)).toEqual(false);
  });

  it(`should return true for ${FeatureName.VideoHubFeature} for non-production env with correct lottery number`, () => {
    process.env.SPADE_ENV = 'development';

    expect(isFeatureEnabled(FeatureName.VideoHubFeature, 404)).toEqual(true);
  });

  it(`should return false for ${FeatureName.VideoHubFeature} for non-production env with incorrect lottery number`, () => {
    process.env.SPADE_ENV = 'development';

    expect(isFeatureEnabled(FeatureName.VideoHubFeature, 1)).toEqual(false);
  });

  it(`should return false for ${FeatureName.VideoHubFeature} for production env`, () => {
    process.env.SPADE_ENV = 'production';

    expect(isFeatureEnabled(FeatureName.VideoHubFeature, 404)).toEqual(false);
  });
});
