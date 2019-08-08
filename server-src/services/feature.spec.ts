import { isFeatureEnabled } from './feature';

describe('Feature service', () => {
  it('should return false by default', () => {
    // @ts-ignore
    expect(isFeatureEnabled('', 1)).toEqual(false);
  });
});
